const glr4sProductQuery = require("../graphql/gqlTemplates");
const { GraphQLClient } = require("graphql-request");
const keys = require("../config/keys");

module.exports = app => {
  //TODO: add requireLogin and requiresStudent back in
  app.get("/api/shop/products", async (req, res) => {
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

      const data = await graphQLClient.request(glr4sProductQuery, {
        collectionId: "gid://shopify/Collection/102679248963",
        metaNameSpace: "GLR",
        metaKey: "glrpoints"
      });
      //now we want to remove any items that might not have a metafield:{value:} field
      const prods = filterIfNoMeta(data.collection.products.edges);
      console.log(JSON.stringify(prods, undefined, 2));
      res.send(prods);
    } catch (err) {
      console.error("error getting products: ", err);
      res.status(422).send(err);
    }
  });

  function filterIfNoMeta(products){
    if (!products || typeof products != 'object') return;
    return products.filter((product) => {
      if (!product || typeof product != 'object') {
        return false;
      }else{
        return true;
      }
    });
  }

};
