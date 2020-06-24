module.exports = (givenURL) => {
  const url = require("url");
  const querystring = require("querystring");

  //var exampleURL = "/?judet=alba&mediu=urban&sex=masculin";

  var parsedUrl = url.parse(givenURL);
  var paramsObject = querystring.parse(parsedUrl.query);
  return paramsObject;
};
