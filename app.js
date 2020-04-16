const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
let passport = require("passport");
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const keys = require("./config/keys");
const flash = require("connect-flash");

const MongoStore = require("connect-mongo")(session);
require("./models/rewards/Cabinet");
require("./models/rewards/Shelf");
require("./models/rewards/Reward");
require("./models/rewards/RewardTemplate");
require("./models/rewards/RewardType");
require("./models/Student");
require("./models/Teacher");
require("./models/User");
require("./models/shop/order/Order");
require("./services/passport");

const options = {
  useNewUrlParser: true,
  //authSource: "admin",
  retryWrites: true,
  //autoIndex: false, // Don't build indexes
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  //bufferMaxEntries: 0,
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000,
  useCreateIndex:true
};

mongoose.connect(keys.mongoURI, options);
const app = express();
let db = mongoose.connection;
db.once("open", () => console.log("connected to db"));
db.on("error", console.error.bind(console, "Mongo connection error"));

const sessionStore = new MongoStore({
  mongooseConnection:db,
  collection: "sessions"
});
app.use(bodyParser.json());
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: (1000 * 60 * 60 * 24)},
    secret: keys.expressSessionSecret,
    store: sessionStore
  })
);

app.use(cookieParser());
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);
require("./routes/orderRoutes")(app);
require("./routes/billingRoutes")(app);
//require("./routes/shopRoutes")(app); removed so it did not clash with product routes
require("./routes/studentRoutes")(app);
require("./routes/productRoutes")(app);
require("./routes/rewardRoutes")(app);

if (process.env.NODE_ENV === "production") {
  //express will serve up production assets. Remember these are built into something different for prod
  //and node needs to hand off if routes are not handled here in node.js
  app.use(express.static("client/build"));

  // this runs if the above does not get catch by above line or previous routes
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
