const winston = require("winston");
const keys = require("./config/keys");


const logger = winston.createLogger({
    level: keys.glrLogLevel,
    defaultMeta: { service: "glrexplore" },
    transports: [new (winston.transports.Console)({'timestamp':true, format: winston.format.combine(
        winston.format.timestamp(),
            winston.format.colorize(),
            winston.format.simple()
        )})]
});

module.exports = logger;
