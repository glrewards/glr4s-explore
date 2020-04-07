const keys = require("../config/keys");
const axios = require('axios');

module.exports = app => {
  //TODO: add requireLogin and requiresStudent back in
  //TODO: clean up these calls to the proper apis and any redundant code
  app.get("/api/shop/products", async (req, res) => {
    let cursor = null;
    let backward = req.query.backward;
    console.log("backward", backward);
    console.log("query", req.query);
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
      res.send(data);
    } catch (err) {
      console.error("error getting products: ", err);
      res.status(422).send(err);
    }

  });

};
