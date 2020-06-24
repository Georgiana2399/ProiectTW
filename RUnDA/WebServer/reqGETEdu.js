module.exports = (req, res) => {
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

  const getDBConn = require("./getDBConn");
  const getParamsFromURL = require("./getParamsFromURL");
  const TABLE_NAME = "educatie_aprilie";
  var conn = getDBConn();

  console.log(req.url);
  var params = getParamsFromURL(req.url);
  console.log("PARAMS : ");
  console.log(params);
  if (false === "judet" in params) {
    res.writeHead(400, {
      "Content-Type": "text/plain",
    });
    res.end(`Bad request - your url: ${req.url}`);
    return;
  }
  console.log(params.judet + "" + judeteAll[parseInt(params.judet)]);
  var sqlCommand = `SELECT * FROM ${TABLE_NAME} WHERE judet = '${
    judeteAll[params.judet]
  }'`;
  conn.query(sqlCommand, (error, results, _fields) => {
    if (error) throw error;
    res.writeHead(200, {
      "Content-Type": "text/json",
    });
    var finalResult = results[0];
    console.log(`RESULT: ${finalResult}`);
    console.log(JSON.stringify(finalResult));
    res.end(JSON.stringify(finalResult));
  });
  conn.end();
};
