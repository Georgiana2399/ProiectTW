"use strict";
module.exports = (_givenReq, givenRes, callbackTreatPkg, callbackCsv) => {
  const https = require("https");
  const PREFIX_SOMAJ = "somajul-inregistrat-";
  const JSON_MIME_TYPE = "application/json";

  const options = {
    hostname: "data.gov.ro",
    path: "/api/3/action/package_list", // somajul-inregistrat-aprilie-2019
    method: "GET",
    rejectUnauthorized: false,
  };

  const req = https.request(options, (res) => {
    var output = "";
    res.on("data", (chunk) => {
      output += chunk;
    });
    res.on("end", () => {
      var objOutput = JSON.parse(output);
      var results = objOutput.result;
      //console.log(JSON.stringify(results));
      var somajInregistratIds = [];
      for (let i = 0; i < results.length; i++)
        if (results[i].startsWith(PREFIX_SOMAJ))
          somajInregistratIds.push(results[i]);
      if (null !== givenRes) {
        givenRes.writeHead(200, { "Content-Type": JSON_MIME_TYPE });
        givenRes.end(JSON.stringify(somajInregistratIds));
        return;
      }
      for (let i = 0; i < somajInregistratIds.length; i++)
        callbackTreatPkg(somajInregistratIds[i], callbackCsv);
    });
  });

  req.on("error", (error) => {
    console.error(error);
  });

  req.end();
};
