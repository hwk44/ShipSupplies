const express = require("express");
const app = express();
const mysql = require("mysql"); // npm i mysql
const PORT = 3001; // 포트번호 설정

// mysql 연결
const db = mysql.createPool({
    host : "127.0.0.1",
    user : "root",
    password : "1234",
    dastabase : "product",
})

app.post("/create", (req, res) => {
    const name = req.body.frontname;
    const age = req.body.frontage;
    const country = req.body.frontcountry;
    const position = req.body.frontposition;
    const wage = req.body.frontwage;
  
    db.query(
      "select distinct category from ship.product",
      //콜백함수
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("values Inserted");
        }
      }
    );
  });
  
  app.listen(3001, () => {
    console.log("your server is running on 3001~! yeah");
});