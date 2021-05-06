const requireLogin = require("../middlewares/requireLogin");
const keys = require("../config/keys");
const winston = require("winston");
const axios = require("axios");

const logger = winston.createLogger({
  level: keys.glrLogLevel,
  defaultMeta: { service: "memberRoutes" },
  transports: [new (winston.transports.Console)({'timestamp':true, format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.simple()
    )})]
});

module.exports = app => {
  app.get("/api/user/:userId", requireLogin, async (req, res) => {
    let uid = req.params.userId;
    let url = keys.glrAPIGateway + keys.glrAPIUser + "/" + uid;
    let options = {
      headers: {
        "X-API-KEY": keys.glrAPIGatewayKey
      }
    };
    try {
      logger.debug("calling user api to get user data: uid = " + uid);
      const axiosResponse = await axios.get(url, options);
      const data = axiosResponse.data;
      res.send(data);
    } catch (err) {
      console.error("error getting user: ", err);
      res.statusCode = err.response.status;
      res.send({ code: err.response.status, message: err });
    }
  });
  app.get("/api/user/related/:userId", requireLogin, async (req, res) => {
    let uid = req.params.userId;
    let url = keys.glrAPIGateway + keys.glrAPIUser + "/related/" + uid;
    let options = {
      headers: {
        "X-API-KEY": keys.glrAPIGatewayKey
      }
    };
    try{
        logger.debug("calling user api to get related users for a given user id: uid = " + uid);
        const axiosResponse = await axios.get(url,options);
        const data = axiosResponse.data;
        res.send(data);
    }catch (err){
        console.error("error getting related users: ", err);
        res.statusCode = err.response.status;
        res.send({ code: err.response.status, message: err });
    }

  });

  app.get("/api/user", async (req,res) => {

    let url = keys.glrAPIGateway + keys.glrAPIUser;
    let options = {
      params: req.query,
      headers: {
        "X-API-KEY": keys.glrAPIGatewayKey
      }
    };
      logger.info(`/api/user called`,req.query);
      try{
        const axiosResponse = await axios.get(url,options);
        const data = axiosResponse.data;
        res.send(data);
      }catch (err){
        console.error("error getting related users: ", err);
        res.statusCode = err.response.status;
        res.send({ code: err.response.status, message: err });
      }
  });

};
