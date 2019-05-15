if (process.env.NODE_ENV === "production") {
  //use prd keys
  module.exports = require("./prod");
} else {
  //use dev keys
  module.exports = require("./dev");
}
