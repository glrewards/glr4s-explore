const throng = require("throng");
const Queue = require("bull");
const keys = require('./config/keys');

const { logger } = require("./globalservices");
const tableGenerator = require("./services/reportTemplates/pickingListTemplate");
const PDFGenerator = require("./services/reportTemplates/createPicklistPDF");

// Connect to a local redis instance locally, and the Heroku-provided URL in production
let REDIS_URL = keys.redisURL;

// Spin up multiple processes to handle jobs to take advantage of more CPU cores
// See: https://devcenter.heroku.com/articles/node-concurrency for more info
let workers = process.env.WEB_CONCURRENCY || 2;

// The maximum number of jobs each worker should process at once. This will need
// to be tuned for your application. If each job is mostly waiting on network
// responses it can be much higher. If each job is CPU-intensive, it might need
// to be much lower.
let maxJobsPerWorker = 5;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function start() {
  logger.info("report worker started");
  // Connect to the named work queue
  let workQueue = new Queue("work", REDIS_URL);

  workQueue.process("pickingListPDF", maxJobsPerWorker,  async (job) => {
    // This is an example job that just slowly reports on progress
    // while doing no work. Replace this with your own job logic.
    let progress = 0;
    logger.info("calling populate Table");
    const html = tableGenerator.populateTable(job.data, job.id);
    //logger.debug(`html for pickinglist is: ${html}`);

    // if html is null then this part of the process has failed and we should fail the job
    if (html == null) {
      //fail the job
      throw new Error("HTML creation failed");
    }
    const pdfPath = await PDFGenerator.getPDF(job.id);
    //TODO: need to have a scheduled cleanup job to clear down all the pdfs HOWEVER they should
    // go every time we recycle the dyno any way
    console.log(`PDFPATH: ${pdfPath}`);
    return {file: pdfPath };
  });
}

// Initialize the clustered worker process
// See: https://devcenter.heroku.com/articles/node-concurrency for more info
throng({ workers, start });
