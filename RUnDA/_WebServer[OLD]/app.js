"use strict";
//#region APP CONSTANTS
const PORT = 80;
const ROOT_MEDII = "/api/medii/";
const ROOT_EDUCATIE = "/api/edu/";
const ROOT_VARSTA = "/api/varsta/";

const WEB_ROOT = "\\public\\";
const HOME_PAGE = "\\filter.html";
//#endregion
//#region LIBS
const http = require("http");
const fs = require("fs");
var path = require("path");

const getMime = require("./getMime");
const reqGETMedii = require("./reqGETMedii");
const reqGETEdu = require("./reqGETEdu");
const reqGETVarsta = require("./reqGETVarsta");
//#endregion

var server = http.createServer((req, res) => {
  console.log(`URL: ${req.url};`);
  var filePath = "\\public\\" + req.url;
  var isFileFromServer = fs.existsSync(__dirname + filePath);
  if ("/" === req.url) {
    res.writeHead(200, { "Content-Type": "text/html" });
    var readStream = fs.createReadStream(
      __dirname + WEB_ROOT + HOME_PAGE,
      "utf8"
    );
    readStream.pipe(res);
    return;
  }
  if (isFileFromServer) {
    var filePath = req.url;
    var extName = path.extname(filePath).toLowerCase();
    res.writeHead(200, { "Content-Type": getMime(filePath) });
    var readStream = fs.createReadStream(
      __dirname + WEB_ROOT + filePath,
      "utf8"
    );
    readStream.pipe(res);
    return;
  }

  if (!req.url.startsWith("/api")) {
    console.log(`Bad path: @${req.url}@`);
    return;
  }
  var givenURL = req.url;
  var givenMethod = req.method;
  console.log(givenURL);
  if (givenURL.startsWith(ROOT_MEDII) && givenMethod === "GET") {
    reqGETMedii(req, res);
    return;
  }
  if (givenURL.startsWith(ROOT_VARSTA) && givenMethod === "GET") {
    reqGETVarsta(req, res);
    return;
  }
  if (givenURL.startsWith(ROOT_EDUCATIE) && givenMethod === "GET") {
    reqGETEdu(req, res);
    return;
  }
  console.log(`Bad request: url @${givenURL}@; method @${givenMethod}@`);
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end(
    `Resource not found! Bad request at url ${givenURL}; Method: ${givenMethod}`
  );
});

server.listen(PORT, () => {
  console.log(`WebServer now listening on port ${PORT}...`);
});
