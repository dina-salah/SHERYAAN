const cors = require('cors');
var express = require("express");

var app = express();
app.use(cors());
var bodyParser = require("body-parser");
var mysql = require("mysql");
//added cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
//added cors

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// app.use(cors({
//   origin: 'localhost',
//   credentials: true
// }));

// default route
app.get("/", function (req, res) {
  return res.send({ error: true, message: "hello" });
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
// dbConn.connect();
dbConn.connect((error) => {
  if (error) {
    console.error('Error connecting to MySQL: ', error);
    return;
  }
  console.log('Connected to MySQL Database');
});

// Retrieve all users
app.get("/users", function (req, res) {
  dbConn.query("SELECT * FROM user", function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: "users list." });
  });
});

// Retrieve user with id
app.get("/user/:id", function (req, res) {
  let user_ssn = req.params.id;
  if (!user_ssn) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide user_id" });
  }
  dbConn.query(
    "SELECT * FROM user where user_ssn=?",
    user_ssn,
    function (error, results, fields) {
      if (error) throw error;
      return res.send({
        error: false,
        data: results,
        message: "users list.",
      });
    }
  );
});

////////////////////////////////////////////////////

// Add a new user
app.post("/user", function (req, res) {
  let name = req.body.user_name;
  let lname = req.body.user_lname;
  let lcode = req.body.location_code;
  let user = req.body.user_ssn;
  let gender = req.body.user_gender;
  let age = req.body.user_age;
  let address = req.body.user_address;
  let phone = req.body.user_phone;
  let email = req.body.user_Email;
  let city = req.body.user_city;
  let bloodt = req.body.user_blood_type;
  let healthsts = req.body.user_health_status;
  let password = req.body.user_password;

  // if (!user) {
  //   return res
  //     .status(400)
  //     .send({ error: true, message: "Please provide user" });
  // }
  dbConn.query(
    "INSERT INTO user SET ? ",
    {
      location_code: lcode,
      user_name: name,
      user_lname: lname,
      user_ssn: user,
      user_gender: gender,
      user_age: age,
      user_address: address,
      user_phone: phone,
      user_Email: email,
      user_city: city,
      user_blood_type: bloodt,
      user_health_status: healthsts,
      user_password: password
    },
    function (error, results, fields) {
      if (error) throw error;
      return res.send({
        error: false,
        data: results[0],
        message: "New user has been created successfully.",
      });
    }
  );
});



////////////////////////////////////////////////
//  Update user with id
app.put(`/user/:id`, function (req, res) {
  let user_ssn = req.params.id;
  let lcode = req.body.location_code;
  let name = req.body.user_name;
  let age = req.body.user_age;
  let city = req.body.user_city;
  let bloodt = req.body.user_blood_type;
  let email = req.body.user_Email;
  let healthsts = req.body.user_health_status;
  let gender = req.body.user_gender;
  let password = req.body.user_password;
  if (!user_ssn) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide the user ssn" });
  }
  dbConn.query(
    `UPDATE user SET user_name = ? , user_age = ? , user_city = ? , user_blood_type = ? , user_Email = ?, user_health_status = ?  ,user_gender = ?  ,user_password = ? , location_code = ?  WHERE user_ssn = ${user_ssn} ;`,
    [name, age, city, bloodt, email, healthsts, gender, password, lcode],
    function (error, results, fields) {
      if (error) throw error;
      return res.send({
        error: false,
        data: results,
        message: "user has been updated successfully.",
      });
    }
  );
});



//  Delete user
app.delete("/user/:id", function (req, res) {
  let user_id = req.params.id;
  if (!user_id) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide user_id" });
  }
  dbConn.query(
    "DELETE FROM user WHERE user_ssn = ?",
    user_id,
    function (error, results, fields) {
      if (error) throw error;
      return res.send({
        error: false,
        data: results,
        message: "User has been deleted successfully.",
      });
    }
  );
});

//verify user information
app.post("/login", function (req, res) {
  let ssn = req.body.user_ssn;
  let password = req.body.user_password;
  if (!ssn || !password) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide your SSN and password" });
  }
  dbConn.query(
    "SELECT user_ssn , user_password FROM user WHERE user_ssn = ?",
    ssn,
    function (error, results, fields) {
      if (error) throw error;
      //console.log(typeof results[0].user_password);
      if (
        results[0].user_ssn === ssn &&
        results[0].user_password === password
      ) {
        return res.send({
          error: false,
          //data: results,
          message: "login accepted",
        });
      } else {
        return res.send({
          error: false,
          //data: results,
          message: "user ssn or password are not correct",
        });
      }
    }
  );
});

// set port
app.listen(5000, function () {
  console.log("Node app is running on port 5000");
});
module.exports = app;
