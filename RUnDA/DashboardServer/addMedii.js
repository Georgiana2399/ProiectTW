"use strict";
const https = require("https");
const getDBConn = require("./getDBConn");
const judeteAll = [
  "ALBA",
  "ARAD",
  "ARGES",
  "BACAU",
  "BIHOR",
  "BISTRITA-NASAUD",
  "BOTOSANI",
  "BRAILA",
  "BRASOV",
  "BUCURESTI",
  "BUZAU",
  "CALARASI",
  "CARAS-SEVERIN",
  "CLUJ",
  "CONSTANTA",
  "COVASNA",
  "DAMBOVITA",
  "DOLJ",
  "GALATI",
  "GIURGIU",
  "GORJ",
  "HARGHITA",
  "HUNEDOARA",
  "IALOMITA",
  "IASI",
  "ILFOV",
  "MARAMURES",
  "MEHEDINTI",
  "MURES",
  "NEAMT",
  "OLT",
  "PRAHOVA",
  "SALAJ",
  "SATU MARE",
  "SIBIU",
  "SUCEAVA",
  "TELEORMAN",
  "TIMIS",
  "TULCEA",
  "VALCEA",
  "VASLUI",
  "VRANCEA",
];
var makeSQLInsert = (row) => {
  // return `INSERT INTO \`somaj\`.\`medii\` (\`judet\`, \`ruralfeminin\`, \`ruralmasculin\`, \`urbanfeminin\`, \`urbanmasculin\`)" +
  //   "VALUES ('${row.judet}', ${row.ruralfeminin}, ${row.ruralmasculin}, ${row.urbanfeminin}, ${row.urbanmasculin});`;
  var badNo =
    row.ruralfeminin === NaN ||
    row.ruralmasculin === NaN ||
    row.urbanfeminin === NaN ||
    row.urbanmasculin === NaN;
  if (badNo) return null;
  return `UPDATE \`somaj\`.\`medii\` SET ruralfeminin = ruralfeminin + ${row.ruralfeminin}, ruralmasculin = ruralmasculin + ${row.ruralmasculin}, urbanfeminin = urbanfeminin + ${row.urbanfeminin}, urbanmasculin = urbanmasculin + ${row.urbanmasculin} WHERE judet = '${row.judet}';`;
};
var func = (givenURL) => {
  const HOST_NAME = "data.gov.ro";
  const options = {
    host: HOST_NAME,
    path: givenURL.substr(givenURL.indexOf(HOST_NAME) + HOST_NAME.length),
    rejectUnauthorized: false,
  };
  var conn = getDBConn();
  https.get(options, (response) => {
    var output = "";
    response.on("data", (chunk) => {
      output += chunk;
    });
    response.on("end", () => {
      //console.log(output);
      var lines = output.split(/\r|\n|\r\n/);

      if (
        -1 === lines[lines.length - 1].indexOf("BUCURESTI") &&
        -1 === lines[lines.length - 1].indexOf("VRANCEA")
      )
        lines.pop();

      for (var i = 1; i < lines.length; i++) {
        var currentLine = lines[i];
        // if (-1 === lines[i].toLowerCase().indexOf("toata")) continue;
        var tokens = currentLine.split(",");
        if (tokens[0].charAt(0) === " ") {
          tokens[0] = tokens[0].substr(1);
        }
        var tableRow = {
          judet: tokens[0],
          ruralfeminin: parseInt(tokens[5]),
          ruralmasculin: parseInt(tokens[6]),
          urbanfeminin: parseInt(tokens[8]),
          urbanmasculin: parseInt(tokens[9]),
        };
        /*         if (judeteAll.includes(tableRow.judet)) {
          if (
            tableRow.ruralfeminin === NaN ||
            tableRow.ruralmasculin === NaN ||
            tableRow.urbanfeminin === NaN ||
            tableRow.urbanmasculin === NaN
          )
            console.log(tableRow);
        } */
        if (judeteAll.includes(tableRow.judet)) {
          console.log(tableRow);
          console.log(`##${tableRow.judet}##`);
          var sqlCommand = makeSQLInsert(tableRow);
          if (sqlCommand.toLowerCase().includes("nan") === false) {
            console.log(sqlCommand);
            conn.query(sqlCommand, (error, results, fields) => {
              if (error) {
                console.log("LOOK HERE : " + sqlCommand);
                throw error;
              }
            });
          }
        } else {
          console.log(`NOT INCLUDED : ${tableRow.judet}`);
        }
      }
      conn.end();
      console.log(`Rows incremented in table medii for url ${givenURL}`);
    });
  });
};

module.exports = func;
