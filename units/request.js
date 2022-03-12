const request = require("request");
request(
  "https://iss.moex.com/iss/securities/GMKN.xml?iss.meta=off",
  (error, response, body) => {
    console.error("error:", error); // Print the error if one occurred
    console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
    console.log("body:", body); // Print the HTML for the Google homepage.
  }
);


//const s = "https://iss.moex.com/iss/securities/GMKN.xml?iss.meta=off"
//"https://iss.moex.com/iss/securities/GMKN.xml?iss.meta=off&iss.only=boards&boards.columns=secid,is_primary,boardid"
//", "//document//data//rows//row[@is_primary=1]/@boardid")
