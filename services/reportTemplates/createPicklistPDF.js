const fs = require('fs');
const puppeteer = require('puppeteer');
// Build paths
const { buildPathHtml, buildPathPdf } = require('./buildPaths');

const printPdf = async () => {
    console.log('Starting: Generating PDF Process, Kindly wait ..');
    /** Launch a headleass browser */
    const browser = await puppeteer.launch();
    /* 1- Create a newPage() object. It is created in default browser context. */
    const page = await browser.newPage();
    /* 2- Will open our generated `.html` file in the new Page instance. */
    console.log(buildPathHtml);
    await page.goto( "/reports/test", { waitUntil: 'networkidle0' });
    /* 3- Take a snapshot of the PDF */
    const pdf = await page.pdf({
        format: 'A4',
        margin: {
            top: '20px',
            right: '20px',
            bottom: '20px',
            left: '20px'
        }
    });
    /* 4- Cleanup: close browser. */
    await browser.close();
    console.log('Ending: Generating PDF Process');
    return pdf;
};

async function getPDF() {
    try {
        const pdf = await printPdf();
        fs.writeFileSync(buildPathPdf, pdf);
        console.log('Succesfully created an PDF table');
        return pdf;
    } catch (error) {
        console.log('Error generating PDF', error);
    }
};

module.exports = {getPDF}
