const keys = require("../config/keys");
const axios = require('axios');
const winston = require('winston');

const logger = winston.createLogger({
  level: keys.glrLogLevel,
  defaultMeta: { service: "productRoutes" },
  transports: [new (winston.transports.Console)({'timestamp':true, format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.simple()
    )})]
});

module.exports = app => {
  //TODO: add requireLogin and requiresStudent back in
  //TODO: clean up these calls to the proper apis and any redundant code
  app.get("/api/shop/products", async (req, res) => {
    logger.info('handling products route');
    logger.debug(req.user);
    let cursor = null;
    let backward = req.query.backward;
    logger.debug("backward", backward);
    logger.debug("query", req.query);
    if(req.query.cursor){
      cursor = req.query.cursor;
    }

    try {
      let url = keys.glrAPIGateway +  keys.glrAPIProduct;
      let options = {
        params: {
          cursor: cursor,
          backward: backward
        },
        headers:{
          'X-API-KEY': keys.glrAPIGatewayKey
        }
      };
      const axiosResponse = await axios.get(url,options);
      const data = axiosResponse.data;
      logger.debug(data);
      res.send(data);
    } catch (err) {
      logger.error("error getting products: ", err);
      res.status(422).send(err);
    }

  });

};
