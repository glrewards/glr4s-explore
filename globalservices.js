const mongoose = require("mongoose");
const keys = require("./config/keys");

const options = {
    useNewUrlParser: true,
    //authSource: "admin",
    retryWrites: true,
    //autoIndex: false, // Don't build indexes
    //reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    //reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    //bufferMaxEntries: 0,
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000,
    useUnifiedTopology: true,
    useCreateIndex: true
};

mongoose.connect(keys.mongoURI, options);
const db = mongoose.connection;
module.exports = db;
