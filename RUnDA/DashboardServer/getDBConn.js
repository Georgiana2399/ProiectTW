module.exports = () => {
  var mysql = require("mysql");
  var conn = mysql.createConnection({
    host: "localhost",
    user: "rareschelariu79",
    password: "password",
    database: "somaj",
  });
  conn.connect((err) => {
    if (err) throw err;
    // console.log("Connected to MySQL!");
  });
  return conn;
};

// var sqlCommand = "SELECT * FROM medii_aprilie";
// conn.query(sqlCommand, (error, results, fields) => {
//   if (error) {
//     return console.log("SQL ERR:" + err);
//   }
//   //console.log(results);
//   //for (var i = 0; i < results.length; i++) console.log(results[i]["JUDET"]);
// });
