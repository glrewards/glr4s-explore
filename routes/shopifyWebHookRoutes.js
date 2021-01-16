const requireSecret = require("../middlewares/requireSecret");
const requireLearningCentre = require("../middlewares/requireValidLearningCentre");
const mongoose = require("mongoose");
const keys = require("../config/keys");
const winston = require("winston");
const axios = require("axios");
const Centre = mongoose.model("LearningCentre");
const Cab = mongoose.model("Cabinet");
const Shelf = mongoose.model("Shelf");

//using direct connections to mongo rather than mongoose to store a record of the received orders for audit
const MongoClient = require("mongodb").MongoClient;
const uri = keys.mongoURI;
const mclient = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const logger = winston.createLogger({
  level: keys.glrLogLevel,
  format: winston.format.json(),
  defaultMeta: { service: "webhookRoutes" },
  transports: [new winston.transports.Console()]
});

async function updateCabinet(cabinet){
  logger.log({level: 'info', message: 'trying to update cabonet via api'});
  let url = keys.glrAPIGateway + keys.glrAPICabinet;
  let options = {
    //tells axios not to throw an error for codes less than 404
    validateStatus: function(status) {
      return status < 500;
    },
    params: {
      centre: cabinet._learningCentreId
    },
    headers: {
      "X-API-KEY": keys.glrAPIGatewayKey
    }
  };
  logger.log({ level: "debug", message: "calling axios: " + url });
    const axiosResponse = await axios.put(url, cabinet,options);
    logger.log({level: 'info', message: 'finished call to PUT api'});
    logger.log({level: 'debug',message: 'response was: ', state: axiosResponse});
    return axiosResponse;
}
async function createRewardObject(line) {
  /* a line item contains some but not all the data we need. It does not contain the metafields and these
    meant to be the means by which we allocate a product to a shelf. Also rewards only contain objectid references to
    the relevant shopify product. so we need to use the shopifyId to find the product in shopify product and get its
    _id and the metafield. we can then create a valid reward object containing a points attribute and an object ref.
     */
  //TODO: at the moment we are ignoring the variant information on the lineitem. We might need to reconsider this
  //going to use the mongo client to get the info from shopify products. No value in using mongoose for this, it is
  // private internal logic
  try {
    let products = mclient.db().collection("shopifyproducts");
    const query = { id: line.product_id };
    //console.log(query);
    const options = {
      projection: {
        _id: 1,
        id: 1,
        title: 1,
        metafields: { $elemMatch: { namespace: "glr", key: "points" } }
      }
    };
    const product = await products.findOne(query, options);
    logger.log({
      level: "debug",
      message: "shopify product found",
      state: product
    });

    //all items via this route will always be glr issued. So we need to look up the object Id for glr issuer
    const issuers = mclient.db().collection("issuer");
    const us = await issuers.findOne({ name: "Great Little Rewards" });

    const reward = {
      _issuer: us._id,
      _shopifyProduct: product._id,
      count: line.quantity,
      points: parseInt(product.metafields[0].value) //we know this is right because of the elemMatch in the query projection
    };
    return reward;
  } catch (e) {
    logger.error(e.message);
  }
}

async function processLineItems(cabinet, lines) {
  try {
    for (const item of lines) {
      let reward = await createRewardObject(item);
      logger.log({
        level: "info",
        message: "this is the created reward",
        state: reward
      });
      //use a case statement to add the reward the to the correct shelf
      switch (reward.points) {
        case 25:
          logger.log({ level: "info", message: "switch case 25" });
          delete reward.points;
          cabinet.shelves[0].rewardItems.push(reward);
          break;
        case 50:
          logger.log({ level: "info", message: "switch case 50" });
          delete reward.points;
          cabinet.shelves[1].rewardItems.push(reward);
          break;
        case 75:
          logger.log({ level: "info", message: "switch case 75" });
          delete reward.points;
          cabinet.shelves[2].rewardItems.push(reward);
          break;
        case 100:
          logger.log({ level: "info", message: "switch case 100" });
          delete reward.points;
          cabinet.shelves[3].rewardItems.push(reward);
          break;
        case 200:
          logger.log({ level: "info", message: "switch case 200" });
          delete reward.points;
          cabinet.shelves[4].rewardItems.push(reward);
          break;
        default:
          logger.log({
            level: "debug",
            message: "did not match in the switch statement as expected",
            state: reward
          });
      }
    }
  } catch (e) {}
}
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

function updateExistingCabinet(cabinet, lineItems) {
  try {
    logger.log({
      level: "info",
      message: "started to update existing Cabinet"
    });
    logger.log({
      level: "debug",
      message: "updateExistingCabinet: parameters passed: ",
      state: { cabinet, lineItems }
    });
    //ensure we have been passed some objects
    if (!lineItems || !cabinet) {
      throw { status: 404, message: "the passed parameters were not valid" };
    }
    //start the process
    logger.log({
      level: "info",
      message: "starting to loop through the line items"
    });
    // if I find the item then increment the count by the quantity on the line item

    cabinet.shelves.forEach(shelf => {
      shelf.rewardItems.forEach(reward => {
        //see if the item is in the list of line items
        logger.log({
          level: "debug",
          message: "reward product Id: " + reward._shopifyProduct.id
        });
        let found = lineItems.find(line => {
          logger.log({
            level: "debug",
            message: "comparing product Ids: ",
            state: {
              rewardId: reward._shopifyProduct.id,
              lineId: line.product_id
            }
          });
          if (reward._shopifyProduct.id === line.product_id.toString()){
            logger.log({
              level: "info",
              message: "found a match between lineItems and cabinet rewards"
            });
            logger.log({
              level: "debug",
              message:
                  "reward:" + reward._shopifyProduct.title + " count was " + reward.count
            });
            reward.count += line.quantity;
            logger.log({
              level: "debug",
              message:
                  "incremented reward:" + reward._shopifyProduct.title + " to " + reward.count
            });
          }

        });

        //if the item matches increment the count by the lineitem quantity
      });
    });
    //at this stage existing rewards have been incremented so we can do update the cabinet

  } finally {
  }
}

async function storeHook(payload) {
  try {
    await mclient.connect();
    let collection = mclient.db().collection("glrorders");
    await collection.insertOne(payload);
  } finally {
  }
}
module.exports = app => {
  app.post(
    "/api/webhook/shopifyOrder",
    requireSecret,
    requireLearningCentre,
    async (req, res) => {
      // if we get here we know we have an order for a valid learning centre and that we can use the order note to
      // find the centre by name to get the the ID
      try {
        //record the received data in glrorders only having passed the middleware checks
        await storeHook(req.body);
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
        //remember that the API populates the shopify product data when sending us the cabinet data
        //so we have what we need to match lines with rewards.
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

          await processLineItems(newCabinet, req.body.line_items);
          //console.log(newCabinet);

          //now need to populate
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
        } else {
          const existingCabinet = axiosResponse.data;
          updateExistingCabinet(existingCabinet, req.body.line_items);
          await updateCabinet(existingCabinet);
        }
        res.send({ code: 200 }); // return 200 whatever happens to  shopify
      } catch (e) {
        logger.debug({
          level: "debug",
          message: "still landing in catch block"
        });
        logger.log({level: 'error', message: e.message, state: e});
        res.send({ code: 401 });
      }
    }
  );
};
