const getGovPkg = require("./getGovPkg");
const extractCsv = require("./extractcsvurl");
getGovPkg("somajul-inregistrat-aprilie-2019", (statusCode, output) => {
    console.log(`Status code ${statusCode} ; length output : ${output.length}`);
    extractCsv(JSON.parse(output));
});