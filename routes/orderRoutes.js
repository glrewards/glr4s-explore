const requireLogin = require("../middlewares/requireLogin");
const requireGLRPoints = require("../middlewares/requireGLRPoints");
const requireStudent = require("../middlewares/requireStudent");
const keys = require("../config/keys");
const winston = require("winston");
const axios = require("axios");
const tableGenerator = require("../services/reportTemplates/pickingListTemplate");
const PDFGenerator = require("../services/reportTemplates/createPicklistPDF");
const puppeteer = require("puppeteer");
const fs = require("fs");
const {workQueue} = require('../globalservices');
//const Order = mongoose.model("orders");
//const Student = mongoose.model("students");
//const Cabinet = mongoose.model("Cabinet");

const logger = winston.createLogger({
  level: keys.glrLogLevel,
  defaultMeta: { service: "orderRoutes" },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
          winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
});

module.exports = app => {
  /*
  return an array of basic info about the orders for the centre
   */
  app.get("/api/orders/count", async (req, res) => {
    let centre = req.query.centreId;
    let user = req.query.userId;
    let fulfillStatus = req.query.fulfillStatus;
    logger.debug("parameters", req.query);
    let url = keys.glrAPIGateway + keys.glrAPIOrder + "/count";
    let options = {
      params: {
        centreId: centre,
        userId: user,
        fulfillStatus: fulfillStatus
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
      logger.error("error getting order count: ", err);
      res.status(404).send("exception occurred");
    }
  });
  /**
   * this is the 'open' call to using any number of parameters to get an array of orders
   */
  app.get("/api/orders", requireLogin, async (req, res) => {
    logger.log({ level: "info", message: "/api/orders: " + req.params });
    let centre = req.query.centreId;
    let user = req.query.userId;
    let fulfillStatus = req.query.fulfillStatus;
    let fromDate = req.query.fromDate;

    /*
    is there a valid open order? we can check this by doing a count and passing the unfilledStaus value if count < 1
    nothing to return here
     */
    let url = keys.glrAPIGateway + keys.glrAPIOrder;
    let options = {
      params: {
        centreId: centre,
        userId: user,
        fulfillStatus: fulfillStatus,
        fromDate: fromDate
      },
      headers: {
        "X-API-KEY": keys.glrAPIGatewayKey
      }
    };
    logger.log({ level: "debug", message: "request options", state: options });
    try {
      logger.info("calling axios: " + url, centre, user);
      const axiosResponse = await axios.get(url, options);
      const data = axiosResponse.data;
      logger.debug(data);
      //const html = tableGenerator.populateTable(data[1].lineItems);
      //console.log(html);
      res.send(data);
    } catch (err) {
      logger.error("error getting order: ", err);
      res.status(404).send(err);
    }
  });
  // for a given student retrieve their orderitems if any exist. I am assuming there could be a lot and starting to add
  //pagination
  app.get("/api/orders/:centreId/:userId", requireLogin, async (req, res) => {
    logger.log({
      level: "info",
      message: "Received request here: " + req.params
    });

    /*
    is there a valid open order? we can check this by doing a count and passing the unfilledStaus value if count < 1
    nothing to return here
     */

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
      //const html = tableGenerator.populateTable(data[1].lineItems);
      //console.log(html);
      res.send(data);
    } catch (err) {
      logger.error("error getting order: ", err);
      res.status(404).send(err);
    }
  });

  app.get("/api/orders/:centreId", requireLogin, async (req, res) => {
    logger.debug("Received request here ", req.params);
    let centre = req.params.centreId;
    let summary = req.params.summary;
    //TODO: this url needs to be cleaned up
    let url = keys.glrAPIGateway + keys.glrAPIOrder;
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
      logger.debug("axiosResponse Data: ", axiosResponse.data);
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
  app.put(
    "/api/orders/deletelines/:centreId/:studentId",
    requireLogin,
    async (req, res) => {
      //logger.debug("Received request here ", req.params);
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
        console.log("put order", data);
      } catch (err) {
        logger.error("error getting order: ", err);
        res.send({ statusCode: 404 });
      }
    }
  );

  app.post("/api/orders/", requireLogin, async (req, res) => {
    logger.info("Received request here ", req.params);
    //logger.debug(req.body);
    try {
      let userId = req.body.user._student._id;
      logger.log({ level: "debug", message: "userId: " + userId });
      let _learningCentreId = req.body.user._learningCentreId;
      logger.log({
        level: "debug",
        message: "learningCentre: " + _learningCentreId
      });
      logger.log({ level: "debug", message: "body: ", state: req.body });
      let url = keys.glrAPIGateway + keys.glrAPIOrder;
      let options = {
        headers: {
          "X-API-KEY": keys.glrAPIGatewayKey,
          userId: userId,
          centreId: _learningCentreId
        }
      };
      // the UI is sending the user data in the body - cannot remember why - just pass the lineitems onward
      // the data passed from the UI is not valid. We need to create a valid order object
      let tempOrder = {
        finStatus: "unpaid",
        fulfillStatus: "unfulfilled",
        lineItems: req.body.lineItems
      };
      logger.debug(tempOrder);
      logger.info("calling axios: " + url);
      const axiosResponse = await axios.post(url, tempOrder, options);
      const data = axiosResponse.data;
      res.send(data);
      //console.log("post order", data);
    } catch (err) {
      logger.error("error getting order: ", err);
      res.status(400).send(err);
    }
  });
  app.get("/reports/pickinglist/:orderId", requireLogin, async (req, res) => {
    const type = req.query.type;
    const orderId = req.params.orderId;
    logger.info("/reports/pickinglist/:orderId");
    let url = keys.glrAPIGateway + keys.glrAPIOrder + "/" + orderId;
    let options = {
      headers: {
        "X-API-KEY": keys.glrAPIGatewayKey
      }
    };
    try {
      let response = await axios.get(url, options);

      if (type !== "pdf") {
        logger.info("calling populate Table");
        const html = tableGenerator.populateTable(response.data.lineItems);
        res.send(html);
      } else if (type === "pdf") {
        let file = "";
        logger.info("creating picklist pdf");
        let task = await workQueue.add("pickingListPDF",response.data.lineItems);
        logger.debug(JSON.stringify(`job created. Id: ${task.id}`));
        let done = false;
        while (!done){
          let job = await workQueue.getJobFromId(task.id);
          if (job === null) {
            logger.error("job is null. was expecting something else");
            done = true;
          } else {
            let state = await job.getState();
            let progress = job._progress;
            let reason = job.failedReason;
            //logger.debug(`job data: {id: ${job.id},state: ${state}, progress: ${progress}, reason: ${reason} }`);
            if ((state === 'active') || (state === 'waiting') || (state === 'paused') || (state === 'delayed')){
              done = false;
            }else if (state ==='completed'){
              //we can get the file
              console.log(JSON.stringify(await job.getState()));
              console.log(JSON.stringify(job.returnvalue));
              file = fs.readFileSync(job.returnvalue.file);
              fs.unlinkSync(job.returnvalue.file);
              done = true;
            }
          }
        }
        res.type("application/pdf");
        res.status(200).send(file);
        res.end();
      }
    } catch (e) {
      logger.error(e.message);
      res.status(400).send("error creating picking list");
    }
  });
};
