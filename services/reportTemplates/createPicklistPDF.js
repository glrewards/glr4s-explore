const fs = require("fs");
const puppeteer = require("puppeteer");
const path = require('path');
const {logger} = require('../../globalservices');
const keys = require('../../config/keys');
const mongoose = require("mongoose");
const plSchema = require("../../models/Report");
const PickingListModel = mongoose.model('PickingList');

// Build paths
const { buildPathHtml, buildPathPdf, baseName } = require("./buildPaths");


//const awsClient = new S3Client(undefined);
const printPdf = async id => {
  console.log("Starting: Generating PDF Process, Kindly wait ..");

  /** Launch a headless browser */
  const browser = await puppeteer.launch({ args: ["--no-sandbox"] }); // needed if we want this to run on heroku
  /* 1- Create a newPage() object. It is created in default browser context. */
  const page = await browser.newPage();
  /* 2- Will open our generated `.html` file in the new Page instance. */
  //console.log(buildPathHtml);
  try {
    const browser = await puppeteer.launch({ args: ['--single-process', '--no-zygote', "--no-sandbox"] }); // needed if we want this to run on heroku
    /* 1- Create a newPage() object. It is created in default browser context. */
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(100000);
    await page.setDefaultTimeout(10000);
    /* 2- Will open our generated `.html` file in the new Page instance. */
    //console.log(buildPathHtml);
    let fileName = path.resolve(`${baseName}${id}.html`);
    console.log("trying to open html file: " + fileName);

    await page.goto("file:///" + fileName, { waitUntil: "networkidle0" });
    console.log("opened OK");
    /* 3- Take a snapshot of the PDF */
    const pdf = await page.pdf({
      format: "A4",
      margin: {
        top: "20px",
        right: "20px",
        bottom: "20px",
        left: "20px"
      }
    });
    /* 4- Cleanup: close browser. */
    //await browser.close();
    console.log("Ending: Generating PDF Process");
    return pdf;
  } catch (e) {
    console.log(e.message);
    return null;
  }finally {
    await browser.close();
  }
};

async function getPDF(id) {

  const pdf = await printPdf(id);
  let htmlFileName = path.resolve(`${baseName}${id}.html`);
  let pdfFileName = path.resolve(`${baseName}${id}.pdf`);
  //fs.writeFileSync(pdfFileName, pdf);
  await PickingListModel.create({fileName:pdfFileName, fileType: 'pdf', file: pdf});
  console.log("Deleting html file");
  //f the file exists delete the file from system
  fs.unlinkSync(htmlFileName);
  console.log("Successfully created a PDF file on Mongo");
  return path.resolve(`${baseName}${id}.pdf`);
}

module.exports = { getPDF };
