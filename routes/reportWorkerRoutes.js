
let Queue = require('bull');
const winston = require("winston");
const keys = require("../config/keys");
const requireLogin = require("../middlewares/requireLogin");
let REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';

// Create / Connect to a named work queue
const workQueue = new Queue('work', REDIS_URL);

const logger = winston.createLogger({
    level: keys.glrLogLevel,
    defaultMeta: { service: "reportWorkerRoutes" },
    transports: [new (winston.transports.Console)({format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.colorize(),
            winston.format.simple()
        )})]
});

logger.debug("work Queue", workQueue);
module.exports = app => {
    //TODO: add requireLogin middleware
    app.get("/api/job/:id", async (req, res) => {

        const id = req.params.id;
        logger.info(`reportWorkerRoutes: GET /api/job ${id}`);
        let job = await workQueue.getJobFromId(id);
        console.log(job);
        if(job === null) {
            res.status(404).end();
        }
        else{
            let state = await job.getState();
            let progress = job._progress;
            let reason = job.failedReason;
            res.json({id, state, progress, reason});
        }
    });
    // Kick off a new job by adding it to the work queue
    app.post('/api/job', async (req, res) => {
        logger.info("reportWorkerRoutes: POST /api/job ");
        // This would be where you could pass arguments to the job
        // Ex: workQueue.add({ url: 'https://www.heroku.com' })
        // Docs: https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#queueadd
        let job = await workQueue.add();
        res.json({ id: job.id });
    });
};
