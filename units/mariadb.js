const mariadb = require("mariadb");
const pool = mariadb.createPool({
  //   host: process.env.DB_HOST,
  //   user: process.env.DB_USER,
  //   connectionLimit: 5,
  host: "localhost",
  user: "ash",
  password: "rable1553",
  database: "TelegramMoexBot",
  port: 3306,
  //  }).then(conn => {})
});

pool
  .getConnection()
  .then((conn) => {
    conn
      .query("SELECT 1 as val")
      .then((rows) => {
        console.log(rows); //[ {val: 1}, meta: ... ]
        //Table must have been created before
        // " CREATE TABLE myTable (id int, val varchar(255)) "
        return conn.query(
          "INSERT INTO Users (TelegramID, IsFollow) value (?, ?)",
          [42355, 1]
        );
      })
      .then((res) => {
        console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
        conn.end();
      })
      .catch((err) => {
        //handle error
        console.log(err);
        conn.end();
      });
  })
  .catch((err) => {
    //not connected
  });

// import { createPool } from "mariadb";
// const pool = createPool({
//   host: "localhost",
//   user: "ash",
//   password: "rable1553",
//   database: "TelegramMoexBot",
//   port: 3306,
// });

// pool
//   .getConnection()
//   .then((conn) => {
//     conn
//       .query("SELECT 1 as val")
//       .then((rows) => {
//         console.log(rows); //[ {val: 1}, meta: ... ]
//         //Table must have been created before
//         // " CREATE TABLE myTable (id int, val varchar(255)) "
//         return conn.query(
//           "INSERT INTO Users (TelegramID, IsFollow) value (?, ?)",
//           [42355, 1]
//         );
//       })
//       .then((res) => {
//         console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
//         conn.end();
//       })
//       .catch((err) => {
//         //handle error
//         console.log(err);
//         conn.end();
//       });
//   })
//   .catch((err) => {
//     //not connected
//   });
