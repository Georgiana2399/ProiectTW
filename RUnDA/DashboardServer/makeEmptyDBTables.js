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
var createSqlCommandMedii = (judet) => {
  return (
    "INSERT INTO `somaj`.`medii` (`judet`, `ruralfeminin`, `ruralmasculin`, `urbanfeminin`, `urbanmasculin`) VALUES (" +
    `\'${judet}\'` +
    ", 0, 0, 0, 0);"
  );
};
module.exports = () => {
  console.log("Making tables empty");
  var conn = getDBConn();
  for (let i = 0; i < judeteAll.length; i++) {
    conn.query(
      createSqlCommandMedii(judeteAll[i]),
      (error, results, fields) => {
        if (error) throw error;
      }
    );
  }
  conn.end();
  console.log("Table medii init successful!");
};
