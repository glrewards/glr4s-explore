let Queue = require('bull');
const winston = require("winston");
let REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';

// Create / Connect to a named work queue
let workQueue = new Queue('work', REDIS_URL);

const logger = winston.createLogger({
    level: keys.glrLogLevel,
    format: winston.format.json(),
    defaultMeta: { service: "reportWorkerRoutes" },
    transports: [new (winston.transports.Console)({'timestamp':true})]
});

module.exports = app => {
    //TODO: add requireLogin middleware
    app.get("/api/cabinet", requireLogin, async (req, res) => {
        logger.info("rewardRoutes: /api/cabinet ", req.query);
        try {
            let centre = req.query.centre;
            let summary = req.query.summary;
            let url = keys.glrAPIGateway + keys.glrAPICabinet;
            let options = {
                params: {
                    centre: centre,
                    summary: summary
                },
                headers: {
                    "X-API-KEY": keys.glrAPIGatewayKey
                }
            };
            const axiosResponse = await axios.get(url, options);
            const data = axiosResponse.data;
            //now we want to remove any items that might not have a metafield:{value:} field
            res.send(data);
        } catch (err) {
            console.error("error getting cabinet: ", err);
            res.status(422).send(err);
        }
    });
};
