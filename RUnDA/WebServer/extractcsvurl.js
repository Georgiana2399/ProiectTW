"use strict";
var extract = (obj) => {
    var resArray = obj.result.resources;
    var csvArray = new Array(4);
    for (let i = 0; i < resArray.length; i++) {
        csvArray[i] = {
            csvURL: resArray[i].datagovro_download_url,
            name: resArray[i].name
        }
    }
    console.log(csvArray);
};
module.exports = extract;