const winston = require("winston");
const keys = require("./config/keys");


const logger = winston.createLogger({
    level: keys.glrLogLevel,
    format: winston.format.json(),
    defaultMeta: { service: "glrexplore" },
    transports: [new winston.transports.Console()]
});

module.exports = logger;
