const keys = require("../config/keys");
const axios = require("axios");
const winston = require("winston");
const requireLogin = require("../middlewares/requireLogin");

const logger = winston.createLogger({
  level: keys.glrLogLevel,
  defaultMeta: { service: "rewardRoutes" },
  transports: [new (winston.transports.Console)({'timestamp':true, format: winston.format.combine(
      winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.simple()
    )})]
});
module.exports = app => {
  app.get("/api/cabinet", requireLogin, async (req, res) => {
    logger.info("rewardRoutes: /api/cabinet ", req.query);
    try {
      let centre = req.query.centre;
      let summary = req.query.summary;
      let url = keys.glrAPIGateway + keys.glrAPICabinet;
      let options = {
        params: {
          centre: centre,
          summary: summary
        },
        headers: {
          "X-API-KEY": keys.glrAPIGatewayKey
        }
      };
      const axiosResponse = await axios.get(url, options);
      const data = axiosResponse.data;
      //now we want to remove any items that might not have a metafield:{value:} field
      res.send(data);
    } catch (err) {
      console.error("error getting cabinet: ", err);
      res.status(422).send(err);
    }
  });
};
