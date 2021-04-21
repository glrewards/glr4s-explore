const fs = require("fs");
const puppeteer = require("puppeteer");
const path = require('path');
// Build paths
const { buildPathHtml, buildPathPdf, baseName } = require("./buildPaths");

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
    await page.setDefaultNavigationTimeout(3600);
    await page.setDefaultTimeout(3600);
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
  fs.writeFileSync(pdfFileName, pdf);
  console.log("Deleting html file");
  //f the file exists delete the file from system
  fs.unlinkSync(htmlFileName);
  console.log("Successfully created a PDF file");
  return path.resolve(`${baseName}${id}.pdf`);
}

module.exports = { getPDF };
