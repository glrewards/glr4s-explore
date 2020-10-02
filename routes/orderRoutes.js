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
    logger.debug("Received request here ", req.params);
    //TODO: this url needs to be cleaned up
    let url = keys.glrAPIGateway + keys.glrAPIOrder + "/deleteItems";
    let options = {
      headers: {
        "X-API-KEY": keys.glrAPIGatewayKey,
        centreid: req.params.centreId,
        userid: req.params.studentId
      }
    };
    try {
      logger.info("calling axios: " + url);
      const axiosResponse = await axios.put(url, req.body, options);
      const data = axiosResponse.data;
      res.send(data);
    } catch (err) {
      logger.error("error getting order: ", err);
      res.send({ statusCode: 404 });
    }
  });

  app.post("/api/orders/", requireLogin, async (req, res) => {
    logger.debug("Received request here ", req.params);
    logger.debug(req.body);
    try {
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
