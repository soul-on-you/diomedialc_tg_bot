import request from "request";
request(
  "https://iss.moex.com/iss/securities/GMKN.xml?iss.meta=off",
  (error, response, body) => {
    console.error("error:", error); // Print the error if one occurred
    console.log("statusCode:", response && response.statusCode); // Print the response status code
    console.log("body:", body); // Print the HTML for the Google homepage.
  }
);