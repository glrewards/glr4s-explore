const glr4sProductQuerys = require("../graphql/gqlTemplates");
const { GraphQLClient } = require("graphql-request");
const keys = require("../config/keys");


module.exports = app => {
  //TODO: add requireLogin and requiresStudent back in
  app.get("/api/shop/products", async (req, res) => {
    let cursor = null;
    let backward = req.query.backward;

    let gqlQuery = backward === 'true'? glr4sProductQuerys.gl4sProductBack : glr4sProductQuerys.gl4sProductQuery;
    if(req.query.cursor){
      cursor = req.query.cursor;
    }
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
      const data = await graphQLClient.request(gqlQuery, {
        collectionId: keys.shopifyCollectionId,
        metaNamespace: keys.shopifyMetaNamespace,
        metaKey: keys.shopifyMetaKey,
        cursor: cursor
      });
      //now we want to remove any items that might not have a metafield:{value:} field
      const prods = filterIfNoMeta(data.collection.products.edges);
      if(!prods || prods.length < 1){
        throw {
          code: 404,
          message: "no products found"
          }
      }
      //add back in some lost info - we need to know page info for example
      let finalData =
          {
            page: data.collection.products.pageInfo,
            prods: prods
          };
      res.send(finalData);
    } catch (err) {
      console.error("error getting products: ", err);
      res.status(422).send(err);
    }
  });

  function filterIfNoMeta(products){
    if (!products || typeof products != 'object') return;
    return products.filter((product) => {
      if (!product.node.metafield) {
        return false;
      }else{
        return true;
      }
    });
  }

};
