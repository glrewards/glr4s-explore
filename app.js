const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./config/keys");
require("./models/User");
require("./models/Survey")
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
  socketTimeoutMS: 45000
};


mongoose.connect(keys.mongoURI, options);
const app = express();


let db = mongoose.connection;
db.once("open", () => console.log("connected to db"));
db.on("error", console.error.bind(console, "Mongo connection error"));

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);
require("./routes/surveyRoutes")(app);
require("./routes/shopRoutes")(app);



if(process.env.NODE_ENV === 'production'){
    //express will serve up production assets. Remember these are built into something different for prod
    //and node needs to hand off if routes are not handled here in node.js
    app.use(express.static('client/build'));

    // this runs if the above does not get catch by above line or previous routes
    const path = require('path');
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname,'client','build', 'index.html'));

    });
}


const PORT = process.env.PORT || 5000;
app.listen(PORT);

