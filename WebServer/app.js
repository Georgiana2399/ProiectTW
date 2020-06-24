"use strict";
//#region APP CONSTANTS
const PORT = 80;
const ROOT_MEDII = "/api/medii/";
const WEB_ROOT = "\\public\\";
const HOME_PAGE = "\\filter.html";
//#endregion
//#region LIBS
const http = require("http");
const fs = require("fs");
var path = require("path");

const getMime = require("./getMime");
const reqGETMedii = require("./reqGETMedii");
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
  if (givenURL.startsWith(ROOT_MEDII)) {
    switch (givenMethod) {
      case "GET":
        reqGETMedii(req, res);
        break;
      default:
        console.log(`Bad request: url @${req.url}@; method @${req.method}@`);
        break;
    }
  }
});

server.listen(PORT, () => {
  console.log(`WebServer now listening on port ${PORT}...`);
});
