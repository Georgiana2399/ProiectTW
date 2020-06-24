"use strict";
var extract = (obj) => {
  var resArray = obj.result.resources;
  var csvArray = new Array(4);
  for (let i = 0; i < resArray.length; i++) {
    var urlString = resArray[i].datagovro_download_url.replace(/\r|\n|\r/g, "");
    if (urlString.endsWith(".csv") === false) return null;
    csvArray[i] = {
      url: urlString,
      name: resArray[i].name.replace(/\r|\n|\r/g, ""),
    };
  }
  return csvArray;
};
module.exports = extract;
