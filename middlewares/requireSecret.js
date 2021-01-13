const keys = require("../config/keys");
const crypto = require("crypto");
//const getRawBody = require("raw-body");

async function verifyShopifyHook(req) {
  const hmac = req.get("X-Shopify-Hmac-Sha256");
  const topic = req.get("X-Shopify-Topic");
  console.log(topic);
  try {
    //const rawBody = await getRawBody(req);
    //console.log(rawBody);
    const generatedHash = crypto
        .createHmac("SHA256", keys.webhookSecret)
        .update(Buffer.from(req.rawbody))
        .digest("base64");
    //console.log(generatedHash);
    //console.log(hmac);
    return generatedHash === hmac;
  }catch (e){
    console.log(e.message);
    return false;
  }
}

module.exports = async (req, res, next) => {
  if (! await verifyShopifyHook(req)) {
    console.log("webhook not verified");
    return res.status(401).send({ error: "invalid secret" });
  } else {
    console.log("webhook verified");
    //console.log(req.body);
  }
  next();
};
