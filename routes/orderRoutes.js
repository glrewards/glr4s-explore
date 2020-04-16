const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireGLRPoints = require("../middlewares/requireGLRPoints");
const requireStudent = require("../middlewares/requireStudent");
const findStudentSchool = require("../middlewares/findStudentSchool");
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

/*
const DraftOrderFragment = gql`
  fragment DraftOrderFragment on DraftOrder{
    id
    webUrl
    totalTax
    subtotalPrice
    totalPrice
    customer{
      displayName
    }
    lineItems (first: 250) {
      edges {
        node {
          id
          title
          variant {
            id
            title
            image {
              src
            }
            price
          }
          quantity
        }
      }
    }
  }
`;

const draftOrderMutation = gql `mutation {
  draftOrderCreate($input: DraftOrderInput!) {
    draftOrder {
      ...DraftOrderFragment
     }

    }
  }
}
${DraftOrderFragment}
`;
*/

module.exports = app => {
  // for a given student retrieve their orderitems if any exist. I am assuming there could be a lot and starting to add
  //pagination
  app.get(
    "/api/orders/:studentId",
    requireLogin,
    findStudentSchool,
    async (req, res) => {
      //get all the open orders for the school
      const orders = await Order.find({ _school: req.school });
      if (orders.length > 1 || orders.length === 0) {
        throw "too many or zero orders  found";
      }

      //now search the array to find the lineitems that belong to the the student only
      let myItems = filterByStudent(orders[0].lineItems, req.params.studentId);
      res.send(myItems);
    }
  );

  //:TODO This should be an admin function for the school to see all orders - will need more middlewares etc
  app.get("/api/orders", requireLogin, requireStudent, async (req, res) => {
    console.log("yup");
    const orders = await Order.find({ _school: req.student._school }).select({
      _lineItems: false
    });
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

  app.post("/api/orders/", requireLogin, requireStudent, async (req, res) => {
    const _school = req.body.user._student._school;
    const studentId = req.body.user._student._id;
    const lineItems = req.body.lineItems;
    const _learningCentreId = req.body.user._learningCentreId; //with this we can find the cabinet
    let newOrder = null;
    try {
      logger.debug("calling findOpenOrderFor Centre");
      const orders = await findOpenOrderForCentre(_learningCentreId);
      logger.debug("called findOpenOrderFor Centre");
      if (orders.length > 1) {
        //console.log("I found an array", orders);
        logger.error('found too many errors');
      } else if (orders.length !== 1) {
        logger.debug("neworder for learningCentre: ", _learningCentreId)
        //didn't find anything so create a new one
        newOrder = new Order({
          "finStatus": "unpaid",
          "fulfillStatus": "unfulfilled",
          "_learningCentreId": _learningCentreId,
          lineItems,
          "dateReceived": Date.now(),
          "dateUpdated": Date.now()
        });
      } else {
        newOrder = orders[0];
        let oldLineItems = newOrder.lineItems;
        oldLineItems.push.apply(oldLineItems, lineItems);
        newOrder.lineItems = oldLineItems;
        newOrder.dateUpdated = Date.now();
      }
      // if too many orders we wont get to this because we will have thrown an error
      logger.debug("calling updateCabinetStockLevels");
        updateCabinetStockLevels(_learningCentreId, lineItems);
        logger.debug("called updateCabinetStockLevels");
      //TODO: put all this into a proper mongoose transaction
      let orderPoints = calcGLRPointsTotal(lineItems);
      let order = null;
      //assuming no errors we now amend the user points and save these.
      logger.debug("finding student",studentId);
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
      res.status(422).send(err);
    }
  });

  //TODO: remove this completely it is just a test to prove we can write and run a graphql route NOT USING the storefront api
  app.get("/api/orders/test2", async (req, res) => {
    //start with a simple gql get using the admin api
    const query = `
{
  draftOrders(first: 5) {
    edges {
      node {
        totalTax
        totalPrice
        customer {
          id
          totalSpentV2 {
            amount
            currencyCode
          }
          updatedAt
        }
        note2
        name
        updatedAt
      }
      cursor
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
  }
}`;
    try {
      const endpoint =
        "https://" +
        keys.shopifyStoreName +
        ".myshopify.com/admin/api/" +
        keys.shopifyAPIVersion +
        "/graphql.json";

      const graphQLClient = new GraphQLClient(endpoint, {
        headers: {
          "X-Shopify-Access-Token": keys.shopifyAPIPassword
        }
      });

      const data = await graphQLClient.request(query);
      res.send(data);
    } catch (err) {
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
      logger.debug("finding cabinet for Id: " + centreId);
      const cab = await Cabinet.findOne({_learningCentreId: centreId});
      logger.debug("completed search for cabinet for Id: " + centreId);
      if (!cab) {
        throw {code: 404, message: "cabinet not found"};
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
                throw {code: 404, message: "not enough stock"}
              }
              logger.debug("updating cabinet quantities");
              reward.count = reward.count - line.quantity;
              return reward;
            }
          });
        });
      });
      logger.debug("saving updated cabinet");
      cab.markModified('shelves');
      await cab.save();
      logger.debug("saved updated cabinet");
    }catch(err){
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
    logger.debug("findOpenOrderForCentre: looking for open order for centre",centreId);
    const orders = await Order.find({
      _learningCentreId: centreId,
      finStatus: "unpaid",
      fulfillStatus: "unfulfilled"
    });
    logger.debug("findOpenOrderForCentre: completed");
    return orders;

  }

  function filterByStudent(arr, student) {
    if (!arr || typeof arr != "object") return;
    if (typeof student == "undefined" || student == null) return arr;
    return arr.filter(line => {
      return line._student === student;
    });
  }
};
