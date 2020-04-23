const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireGLRPoints = require("../middlewares/requireGLRPoints");
const requireStudent = require("../middlewares/requireStudent");
const keys = require("../config/keys");
const winston = require("winston");
const axios = require("axios");
const Order = mongoose.model("orders");
const Student = mongoose.model("students");
const Cabinet = mongoose.model("Cabinet");

const logger = winston.createLogger({
  level: keys.glrLogLevel,
  format: winston.format.json(),
  defaultMeta: { service: "orderRoutes" },
  transports: [new winston.transports.Console()]
});

module.exports = app => {
  // for a given student retrieve their orderitems if any exist. I am assuming there could be a lot and starting to add
  //pagination
  app.get("/api/orders/:centreId/:userId", async (req, res) => {
    logger.debug("Received request here ", req.params);
    let centre = req.params.centreId;
    let user = req.params.userId;
    let url = keys.glrAPIGateway + keys.glrAPIOrder + "/getMyItems";
    let options = {
      params: {
        centreId: centre,
        userId: user
      },
      headers: {
        "X-API-KEY": keys.glrAPIGatewayKey
      }
    };
    try {
      logger.info("calling axios: " + url, centre, user);
      const axiosResponse = await axios.get(url, options);
      const data = axiosResponse.data;
      res.send(data);
    } catch (err) {
      logger.error("error getting order: ", err);
      res.status(404).send(err);
    }
  });

  app.get("/api/orders/:centreId", async (req, res) => {
    logger.debug("Received request here ", req.params);
    let centre = req.params.centreId;
    let summary = req.params.summary;
    //TODO: this url needs to be cleaned up
    let url = keys.glrAPIGateway + keys.glrAPIOrder + "/getCurrentForCentre";
    let options = {
      params: {
        centreId: centre
      },
      headers: {
        "X-API-KEY": keys.glrAPIGatewayKey
      }
    };
    try {
      logger.info("calling axios: " + url, centre);
      const axiosResponse = await axios.get(url, options);
      const data = axiosResponse.data;
      res.send(data);
    } catch (err) {
      logger.error("error getting order: ", err);
      res.status(422).send(err);
    }
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
            if (
              JSON.stringify(item._id) ===
              JSON.stringify(order.lineItems.id(line)._rewardId)
            ) {
              item.count = item.count + order.lineItems.id(line).quantity;
              studentTotal +=
                order.lineItems.id(line).quantity *
                order.lineItems.id(line).glrpoints;
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
  });

  app.post("/api/orders/", requireLogin, async (req, res) => {
    logger.debug("Received request here ", req.params);
    let userId = req.body.user._student._id;
    logger.debug("userId: " + userId);
    let _learningCentreId = req.body.user._learningCentreId;
    logger.debug("learningCentre: " + _learningCentreId);
    let url = keys.glrAPIGateway + keys.glrAPIOrder;
    let options = {
      headers: {
        "X-API-KEY": keys.glrAPIGatewayKey,
        userId: userId,
        centreId: _learningCentreId
      }
    };
    try {
      logger.info("calling axios: " + url);
      const axiosResponse = await axios.post(url, req.body, options);
      const data = axiosResponse.data;
      res.send(data);
    } catch (err) {
      logger.error("error getting order: ", err);
      res.status(400).send(err);
    }
  });

};
