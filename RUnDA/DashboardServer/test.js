"use strict";
// TESTING PURPOSES ONLY
const fs = require("fs");
const https = require("https");

const file = fs.createWriteStream("data.txt");
const options = {
  host: "data.gov.ro",
  path:
    "/dataset/ff4249fd-fe19-4948-8feb-9549957ed517/resource/4678809d-3bcd-4e25-8e3f-e86084496e6b/download/medii.csv",
  rejectUnauthorized: false,
};
https.get(options, (response) => {
  // var stream = response.pipe(file);
  // stream.on("finish", () => {
  //   console.log("done");
  // });
  var output = "";
  response.on("data", (chunk) => {
    output += chunk;
  });
  response.on("end", () => {
    console.log(output);
  });
});
