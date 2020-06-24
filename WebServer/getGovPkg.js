"use strict";
module.exports = (govPkgId, callbackGetGovPkg) => {
  const https = require("https");

  const options = {
    hostname: "data.gov.ro",
    path: "/api/3/action/package_show?id=" + govPkgId, // somajul-inregistrat-aprilie-2019
    method: "GET",
    rejectUnauthorized: false,
  };

  const req = https.request(options, (res) => {
    var output = "";
    res.on("data", (chunk) => {
      output += chunk;
    });
    res.on("end", () => {
      callbackGetGovPkg(res.statusCode, output);
    });
  });

  req.on("error", (error) => {
    console.error(error);
  });

  req.end();
};
