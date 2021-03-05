const path = require('path');

/**
 * Provide absolute paths for where a generated `html` & `pdf`
 * files will be created.
 *
 * `path.resolve` takes in a relative file path & returns the
 * absolute path.
 */
const buildPaths = {
    buildPathHtml: path.resolve('pickinglist.html'),
    buildPathPdf: path.resolve('pickinglist.pdf')
};

module.exports = buildPaths;
