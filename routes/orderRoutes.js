const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireGLRPoints = require("../middlewares/requireGLRPoints");
const requireStudent = require("../middlewares/requireStudent");
const keys = require("../config/keys");
const { request } = require("graphql-request");
const { GraphQLClient } = require("graphql-request");
const winston = require("winston");
const Order = mongoose.model("orders");
const Student = mongoose.model("students");

const Cabinet = mongoose.model("Cabinet");

const logger = winston.createLogger({
  level: keys.glrLogLevel,
  format: winston.format.json(),
  defaultMeta: { service: "orderRoutes" },
  transports: [new winston.transports.Console()]
});

//TODO: Where I am using findOne we should really
// be searching for an active order not just assuming there is only one

module.exports = app => {
  // for a given student retrieve their orderitems if any exist. I am assuming there could be a lot and starting to add
  //pagination
  app.get("/api/orders/:centreId/:userId", async (req, res) => {
    //this is for retrieving a users line items
    //logger.debug("received request", req.params);
    logger.debug("received Request");
    let centre = req.params.centreId;
    let userId = req.params.userId;
    const order = await Order.findOne({ _learningCentreId: centre });
    let myLines = filterByStudent(order.lineItems, userId);
    res.send(myLines);
  });

  app.get("/api/orders/:centreId", async (req, res) => {
    logger.debug("Received request here ", req.params);
    //get all the open orders for the school
    let centre = req.params.centreId;
    const orders = await Order.findOne({ _learningCentreId: centre });
    if (orders.length > 1 || orders.length === 0) {
      throw "too many or zero orders  found";
    }

    //now search the array to find the lineitems that belong to the the student only
    //let myItems = filterByStudent(orders[0].lineItems, req.params.studentId);
    res.send(orders);
  });

  //:TODO This should be an admin function for the school to see all orders - will need more middlewares etc
  app.get("/api/orders", async (req, res) => {
    console.log("yup");
    const orders = await Order.find({ _learningCentreId: req.centreId });
    res.send(orders);
  });

  //TODO: rework the webhook below to trap webhooks sent by shopify
  /*
    app.post("/api/surveys/webhooks", (req, res) => {
        console.log(req);
        const p = new Path("/api/surveys/:surveyId/:choice");

        _.chain(req.body)
            .map(({ email, url }) => {
                const match = p.test(new URL(url).pathname);
                if (match) {
                    return { email, surveyId: match.surveyId, choice: match.choice };
                }
            })
            .compact()
            .uniqBy("email", "surveyId")
            .each(({ surveyId, email, choice }) => {
                Survey.updateOne(
                    {
                        _id: surveyId,
                        recipients: {
                            $elemMatch: { email: email, responded: false }
                        }
                    },
                    {
                        $inc: { [choice]: 1 },
                        $set: { "recipients.$.responded": true },
                        lastResponded: new Date()
                    }
                ).exec();
            })
            .value();

        res.send({});
    });
*/
  app.put("/api/orders/deletelines/:centreId/:studentId", async (req, res) => {
    try {
      logger.info("put myorder received");
      let studentTotal = 0; //used in forEAch loop
      let studentId = req.params.studentId;
      let lines = req.body;
      let centre = req.params.centreId;
      let orders = await Order.find({
        _learningCentreId: centre,
        fulfillStatus: "unfulfilled"
      });
      let cab = await Cabinet.findOne({ _learningCentreId: centre });
      //order has an array of line items we want to delete the ones where we have an ID
      //provided in the req.body array of IDs
      //only expecting one so check
      if (orders.length > 1) {
        throw new Error({ code: 404, message: "too many open orders found" });
      }
      let order = orders[0];
      logger.info("removing lineitem");

      await lines.forEach(line => {
        // TODO: All this needs to be in a transaction OR we refactor so that all orders
        //  are just subdocuments of the cabinet itself. This might be the right way to
        //  but remember a document can only get to 16MB max

        //TODO: now we also need to repopulate the cabinet with the returned item
        // a line can contain a quantity of items so we need to use this to add
        // back onto the related rewardItem's count
        let quantity = line.quantity;
        //find the reward item
        let reward = cab.shelves.map(shelf => {
          return shelf.rewardItems.map(item => {
            //console.log(item.count, order.lineItems.id(line).productTitle);
            if (
              JSON.stringify(item._id) ===
              JSON.stringify(order.lineItems.id(line)._rewardId)
            ) {
              item.count = item.count + order.lineItems.id(line).quantity;
              studentTotal += (order.lineItems.id(line).quantity * order.lineItems.id(line).glrpoints);
              return item.count;
            }
          });
        });

        //reward.count += order.lineItems.id(line).quantity;
        cab.markModified("shelves");
        //for each line I need to refund the points to the student
        // here I need to calculate a running total
        order.lineItems.id(line).remove();
      });
      logger.debug("removed from array now saving document");
      logger.debug("student points to refund: ", studentTotal);
      let student = await Student.findById(studentId);
      student.currentPoints += studentTotal;
      student.markModified("student.currentPoints");
      await order.save();
      await cab.save();
      await student.save();
      logger.debug("saved document sending new order as a response");
      res.send(lines);
    } catch (err) {
      logger.error(err);
      throw err;
    }

    //TODO: Find
  });

  app.post("/api/orders/", requireLogin, async (req, res) => {
    const studentId = req.body.user._student._id;
    const lineItems = req.body.lineItems;
    const _learningCentreId = req.body.user._learningCentreId; //with this we can find the cabinet
    logger.debug(lineItems);
    let newOrder = null;
    try {
      logger.debug("calling findOpenOrderFor Centre");
      const orders = await findOpenOrderForCentre(_learningCentreId);
      logger.debug("called findOpenOrderFor Centre");
      if (orders.length > 1) {
        //console.log("I found an array", orders);
        logger.error("found too many errors");
      } else if (orders.length !== 1) {
        logger.debug("neworder for learningCentre: ", _learningCentreId);
        //didn't find anything so create a new one
        newOrder = new Order({
          finStatus: "unpaid",
          fulfillStatus: "unfulfilled",
          _learningCentreId: _learningCentreId,
          lineItems,
          dateReceived: Date.now(),
          dateUpdated: Date.now()
        });
      } else {
        newOrder = orders[0];
        let oldLineItems = newOrder.lineItems;
        oldLineItems.push.apply(oldLineItems, lineItems);
        newOrder.lineItems = oldLineItems;
        newOrder.dateUpdated = Date.now();
      }
      // if too many orders we wont get to this because we will have thrown an error
      updateCabinetStockLevels(_learningCentreId, lineItems);

      //TODO: put all this into a proper mongoose transaction
      let orderPoints = calcGLRPointsTotal(lineItems);
      let order = null;
      //assuming no errors we now amend the user points and save these.
      const student = await Student.findById(studentId);
      logger.debug("completed search for Student");
      if (student) {
        if (orderPoints > student.currentPoints) {
          logger.info("not enough points");
        } else {
          student.currentPoints = student.currentPoints - orderPoints;
          logger.debug("saving student revised points total");
          await student.save();
          logger.debug("saved student");
          logger.debug("saving newOrder");
          order = await newOrder.save();
          logger.debug("saved new order");
        }
      }
      //add the updated user info (new points total)
      let origUser = req.body.user;
      origUser._student = student;
      let newRes = Object.assign(origUser, order.toObject());
      res.send(newRes);
    } catch (err) {
      console.log(err);
      res.status(422).send(err);
    }
  });

  app.post("/api/draftorders/webhooks/sdfew3434", (req, res) => {
    res.send({}); //respond to indicate receipt
  });

  function getSum(total, num) {
    return total + num;
  }

  function calcGLRPointsTotal(lineItems) {
    let lineItemPoints = lineItems.map(line => {
      return line.glrpoints * line.quantity;
    });
    let totalPoints = lineItemPoints.reduce(getSum, 0);
    return totalPoints;
  }

  async function updateCabinetStockLevels(centreId, lineItems) {
    try {
      const cab = await Cabinet.findOne({ _learningCentreId: centreId });
      if (!cab) {
        throw { code: 404, message: "cabinet not found" };
      }
      //let shelves = cab.shelves.id("5e9026e965896000009ca5fc");
      let shelves = cab.shelves;
      //for each lineitems map
      let matches = [];
      lineItems.forEach(line => {
        //console.log(line);
        shelves.forEach(shelf => {
          shelf.rewardItems.map(reward => {
            if (JSON.stringify(line._rewardId) === JSON.stringify(reward._id)) {
              //console.log("FOUND REWARD: changing stock levels: ", reward.count, line.quantity);
              if (line.quantity > reward.count) {
                throw { code: 404, message: "not enough stock" };
              }
              logger.debug("updating cabinet quantities");
              reward.count = reward.count - line.quantity;
              return reward;
            }
          });
        });
      });
      logger.debug("saving updated cabinet");
      cab.markModified("shelves");
      await cab.save();
      logger.debug("saved updated cabinet");
    } catch (err) {
      logger.error("error processing cabinet data for order");
      const err1 = err;
      throw err1;
    }
  }

  async function findOpenOrderForCentre(centreId) {
    //we will only use our own db for saving and amending orders and line items
    //separately we will be using BULL or similar to schedule the sync of this data with shopify

    //first check to see if we have an order for that school in our db
    //console.log(schoolId);
    const orders = await Order.find({
      _learningCentreId: centreId,
      finStatus: "unpaid",
      fulfillStatus: "unfulfilled"
    });
    logger.debug("findOpenOrderForCentre: completed");
    return orders;
  }

  function filterByStudent(arr, student) {
    logger.debug("in filterByStudent: ", student._id);
    if (!arr || typeof arr != "object") return;
    if (typeof student == "undefined" || student == null) return arr;
    return arr.filter(line => {
      return JSON.stringify(line._student) === JSON.stringify(student);
    });
  }
};
