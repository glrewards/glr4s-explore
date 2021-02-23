const { buildPathHtml } = require('./buildPaths');
const fs = require('fs');

const createRow = (line) =>`
    <tr>
    <td>${line.productTitle}</td>
    <td>${line.quantity}</td>
    <td>${line.glrpoints}</td>
    <td><img src="${line.img}"></td>
    <td>${line.memberFirstName}</td>
    <td>${line.memberLastName}</td>
    </tr>
    `

const createTable = (rows) => `
<table>
<style>
        table {
          width: 100%;
        }
        tr {
          text-align: left;
          border: 1px solid black;
        }
        th, td {
          padding: 15px;
        }
        tr:nth-child(odd) {
          background: #CCC
        }
        tr:nth-child(even) {
          background: #FFF
        }
        .no-content {
          background-color: #ff0000;
        }
        img {
        width:50px; height:auto;
        }
      </style>
    <tr>
        <th>Title</th>
        <th>quantity</th>
        <th>Points</th>
        <th>Image</th>
        <th>First Name</th>
        <th>Last Name</th>
    </tr>
    ${rows}
 </table>
`

const createHTML = (table) => `
<html>
<head>
</head>
<body>
${table}
</body>
</html>
`
const doesFileExist = (filePath) => {
    try {
        fs.statSync(filePath); // get information of the specified file path.
        return true;
    } catch (error) {
        return false;
    }
};

function populateTable(data) {
    const rows = data.map(createRow).join('');
    const table = createTable(rows);
    return table;
}
module.exports = {populateTable}
