const requireSecret = require("../middlewares/requireSecret");
const requireLearningCentre = require("../middlewares/requireValidLearningCentre");
const mongoose = require("mongoose");
const keys = require("../config/keys");
const winston = require("winston");
const axios = require("axios");
const Centre = mongoose.model("LearningCentre");
const Cab = mongoose.model("Cabinet");
const Shelf = mongoose.model("Shelf");

const logger = winston.createLogger({
  level: keys.glrLogLevel,
  format: winston.format.json(),
  defaultMeta: { service: "webhookRoutes" },
  transports: [new winston.transports.Console()]
});

function createSkeletonCabinetSimple(centreId, centreName) {
  const shelves = [
    {
      name: "25 Lizard Cards",
      imgURL:
        "https://cdn.shopify.com/s/files/1/1427/2590/files/25-Explore-Learning-Prize-Cabinet-Stickers.jpg?v=1526206929",
      pointsLower: 0,
      pointsHigher: 0,
      warningLevel: 5,
      rewardItems: []
    },
    {
      name: "50 Lizard Cards",
      imgURL:
        "https://cdn.shopify.com/s/files/1/1427/2590/files/50-Explore-Learning-Prize-Cabinet-Stickers.jpg?v=1526207134",
      pointsLower: 0,
      pointsHigher: 0,
      warningLevel: 5,
      rewardItems: []
    },
    {
      name: "75 Lizard Cards",
      imgURL:
        "https://cdn.shopify.com/s/files/1/1427/2590/files/75-Explore-Learning.jpg?v=1526207166",
      pointsLower: 0,
      pointsHigher: 0,
      warningLevel: 5,
      rewardItems: []
    },
    {
      name: "100 Lizard Cards",
      imgURL:
        "https://cdn.shopify.com/s/files/1/1427/2590/files/1726_large.jpg?v=1515233393",
      pointsLower: 0,
      pointsHigher: 0,
      warningLevel: 5,
      rewardItems: []
    },
    {
      name: "200 Lizard Cards",
      imgURL:
        "https://cdn.shopify.com/s/files/1/1427/2590/files/1727-T.jpg?v=1515233386",
      pointsLower: 0,
      pointsHigher: 0,
      warningLevel: 5,
      rewardItems: []
    }
  ];
  let newCab = {
    learningCentreId: centreId,
    name: centreName,
    shelves: shelves
  };
  return newCab;
}

module.exports = app => {
  app.post(
    "/api/webhook/shopifyOrder",
    requireSecret,
    requireLearningCentre,
    async (req, res) => {
      // if we get here we know we have an order for a valid learning centre and that we can use the order note to
      // find the centre by name to get the the ID
      // all of this should really be via the APIs and not using mongoose in this
      try {
        //logger.log(req.centreId);
        //let centre = await Centre.find({"name": payload.note});
        let url = keys.glrAPIGateway + keys.glrAPICabinet;
        logger.log({ level: "debug", message: req.centreId });
        logger.log({ level: "debug", message: req.body });
        let options = {
          //tells axios not to throw an error for codes less than 404
          validateStatus: function(status) {
            return status < 500;
          },
          params: {
            centre: req.centreId
          },
          headers: {
            "X-API-KEY": keys.glrAPIGatewayKey
          }
        };
        logger.log({ level: "debug", message: "calling axios: " + url });
        const axiosResponse = await axios.get(url, options);
        logger.log({ level: "debug", message: axiosResponse.data });

        // if no cabinet was found this is not an error. It should just mean that we do not have a cabinet
        // for the centre so we need to create one.

        //check the response to see what we have 404 means we did not find a cabinet for the given learning centre
        if (axiosResponse.status === 404) {
          logger.log({
            level: "info",
            message:
              "no cabinet found for centre " +
              req.centreId +
              ". Will create a new Cabinet"
          });
          /* create a skeleton Cabinet. this will have empty shelves
           */
          let newCabinet = createSkeletonCabinetSimple(
            req.centreId,
            req.centreName
          );
            url = keys.glrAPIGateway + keys.glrAPICabinet;
            options = {
                //tells axios not to throw an error for codes less than 404
                validateStatus: function(status) {
                    return status < 500;
                },
                headers: {
                    "X-API-KEY": keys.glrAPIGatewayKey
                }
            };
            logger.log({ level: "debug", message: "calling axios: " + url });
            // call addCabinet API and pass over the simple newCabinet object in the body
            // this pushes all mongo work over to the API layer!
            const createCabResponse = await axios.post(url, newCabinet, options);
            logger.log({ level: "debug", message: createCabResponse.data });

/*
          build a reward object for each line item. To do this we need to lookup from shopifyproducts
          by id and we should take the title and metafield glr.points.

           */
          /*
            Now we need to push the reward onto the appropriate shelf object
             */
        }
        res.send({ code: 200 }); // return 200 whatever happens to  shopify
      } catch (e) {
        logger.debug({
          level: "debug",
          message: "still landing in catch block"
        });
        logger.error(e.toJSON());
        res.send({ code: 401 });
      }
    }
  );
};
