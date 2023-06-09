const cors = require('cors'); //added cors
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mysql = require("mysql");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
  );
  
app.use(cors()); //cors
//added cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// connection configurations
var dbConn = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "menna182000",
    database: "blooddb2",
  });
// connect to database
  dbConn.connect();


//update user points after donation by hospitals 
/*app.post("/points", function (req, res) {
  hospital = req.body.hospital_id;
  user = req.body.user_id;
  

  dbConn.query("INSERT INTO points SET user_id = ?, hospital_id = ? , no_of_points = 1, donation_date = CURRENT_DATE() " ,
  [user, hospital] ,
  function (error, results, fields) {
      if (error) throw error;
      return res.send(
          { error: false,
            message: "points has been updated successfully" 
          });
    });
  });*/



//Retrive user points
app.get("/user-points/:id", function (req, res) {
  user = req.params.id;
  dbConn.query("SELECT SUM(no_of_points) AS TotalPoints FROM points WHERE user_id = ?" , user
  , function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: "User Total Points" });
  });
});



  // set port
app.listen(2000, function () {
  console.log("Node app is running on port 2000");
});
module.exports = app;
