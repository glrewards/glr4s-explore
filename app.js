const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
let passport = require("passport");
const bodyParser = require("body-parser");
let cookieParser = require("cookie-parser");
const keys = require("./config/keys");
const db = require("./globalservices");
const MongoStore = require("connect-mongo")(session);
require("./models/rewards/Cabinet");
require("./models/rewards/Shelf");
require("./models/rewards/Reward");
require("./models/rewards/RewardTemplate");
require("./models/rewards/RewardType");
require("./models/Student");
//require("./models/Teacher");
require("./models/User");
require("./models/shop/order/Order");
require("./models/rewards/LearningCentre");
require("./services/passport");

const app = express();
db.once("open", () => console.log("connected to db"));
db.on("error", console.error.bind(console, "Mongo connection error"));

const sessionStore = new MongoStore({
  mongooseConnection: db,
  collection: "sessions"
});

//added the object to this call so that we could then reference rawbody in requireSecret. This is to check the secret
//provided by shopify

app.use(bodyParser.json({
    type:'*/*',
    limit: '50mb',
    verify: function(req, res, buf) {
        if (req.url.startsWith('/api/webhook')){
            req.rawbody = buf;
        }
    }
}));
app.use(
  session({
    resave: false,
    saveUninitialized: keys.secureSession,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 },
    secret: keys.expressSessionSecret,
    store: sessionStore
  })
);

app.use(cookieParser());
//app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);
require("./routes/orderRoutes")(app);
require("./routes/billingRoutes")(app);
//require("./routes/shopRoutes")(app); removed so it did not clash with product routes
require("./routes/memberRoutes")(app);
require("./routes/studentRoutes")(app);
require("./routes/productRoutes")(app);
require("./routes/rewardRoutes")(app);
require("./routes/shopifyWebHookRoutes")(app);

if (process.env.NODE_ENV === "production"){
  //express will serve up production assets. Remember these are built into something different for prod
  //and node needs to hand off if routes are not handled here in node.js
  app.use(express.static("client/build"));
  console.log("NODE_ENV is production");

  // this runs if the above does not get catch by above line or previous routes
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5001;
app.listen(PORT);


