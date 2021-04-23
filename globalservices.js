const mongoose = require("mongoose");
const Queue = require("bull");
const keys = require("./config/keys");
const winston = require("winston");
const methodOverride = require("method-override");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const crypto = require("crypto");
const path = require("path");

// Connect to a local redis intance locally, and the Heroku-provided URL in production
const REDIS_URL = keys.redisURL;
const workQueue = new Queue("work", REDIS_URL);

//const workQueueEvents = new QueueEvents('work',REDIS_URL);
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

//initialise the gridfs interfaces to mongo so we can work with binary files
const storage = new GridFsStorage({
  url: keys.mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      //encrypt file name before storing it
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "reports"
        };
        resolve(fileInfo);
      });
    });
  }
});

const report = multer({storage});

const logger = winston.createLogger({
  level: keys.glrLogLevel,
  levels: winston.config.npm.levels,
  defaultMeta: { service: "glr4Explore" },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
});

module.exports = { db, workQueue, logger };
