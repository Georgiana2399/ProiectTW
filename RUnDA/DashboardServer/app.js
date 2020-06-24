"use strict";
const PORT = 3000;

const http = require("http");

const getAllGovPkg = require("./getAllGovPkgReq");
const getGovPkg = require("./getGovPkg");
const extractcsvurl = require("./extractcsvurl.js");
const addMedii = require("./addMedii");
const addEdu = require("./addEdu");
const addVarsta = require("./addVarste");
const makeEmptyDBTables = require("./makeEmptyDBTables");

// const getDBConn = require("./getDBConn");
// global.dbconn = getDBConn();
makeEmptyDBTables();
getAllGovPkg(null, null, getGovPkg.method, (statusCode, output) => {
  if ((statusCode / 100) * 100 != 200) {
    console.log(`Statuscode : ${statusCode};`);
    return;
  }
  var resultArray = extractcsvurl(JSON.parse(output));
  if (resultArray === null) return;
  for (let i = 0; i < resultArray.length; i++) {
    if (-1 !== resultArray[i].name.indexOf("med")) addMedii(resultArray[i].url);
    else if (-1 !== resultArray[i].name.indexOf("edu"))
      addEdu(resultArray[i].url);
    else if (-1 !== resultArray[i].name.indexOf("grupe de"))
      addVarsta(resultArray[i].url);
  }
  //console.log("\n\n");
});
// global.dbconn.end();
return;

var server = http.createServer((req, res) => {
  switch (req.method) {
    case "GET":
      if ("/allpkg" === req.url) getAllGovPkg(req, res, null, null);
      break;
    default:
      res.end(`Bad request! Given req: ${req.url} ; ${req.method}`);
      break;
  }
  res.writeHead(200, { "Content-Type": "application/json" });
  if ("GET" === req.method && "/allPkg" === req.url) getAllGovPkg(req, res);
});
server.listen(PORT, () => {
  console.log(`Dashboard Server listening now on PORT ${PORT}`);
});
