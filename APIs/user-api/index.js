var express = require("express");
var app = express();
var cookieParser = require("cookie-parser");
var sessions = require('express-session');
var bodyParser = require("body-parser");
var mysql = require("mysql");
var MySQLStore = require('express-mysql-session')(sessions);




// 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24 ;


app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

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

// to store sessions in database 
const sessionStore = new MySQLStore({},dbConn);

// session middleware
app.use(sessions({
  secret: "thisismysecrctekeyformenna8654",
  saveUninitialized:true,
  cookie: { maxAge: oneDay },
  resave: false,
  store: sessionStore,
}));

// cookie parser middleware
app.use(cookieParser());



/////////////////////////////////////////////////////////////////////
// default route
app.get("/", function (req, res) {
  return res.send({ error: true, message: "hello" });
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
  let user_national_ID = req.params.id;
  if (!user_national_ID) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide user_id" });
  }
  dbConn.query(
    "SELECT * FROM user where user_national_ID=?",
    user_national_ID,
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

// Add a new user
app.post("/user", function (req, res) {
  //let user = req.body.user_national_ID;
  let user_national_ID = req.body.user_national_ID;
  let user_Lname = req.body.user_Lname;
  let user_Fname = req.body.user_Fname;
  let user_address = req.body.user_address;
  let lcode = req.body.location_code;
  let age = req.body.user_age;
  let city = req.body.user_city;
  let bloodt = req.body.user_blood_type;
  let email = req.body.user_Email;
  let healthsts = req.body.user_health_status;
  let gender = req.body.user_gender;
  let password = req.body.user_password;
  let user_phoneNo = req.body.user_phoneNo;

  /*if (!user) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide user" });
  }*/
  dbConn.query(
    "INSERT INTO user SET ? ",
    {
      user_national_ID: user_national_ID,
      user_Fname: user_Fname,
      user_Lname: user_Lname,
      user_age: age,
      user_gender: gender,
      user_Email: email,
      user_phoneNo: user_phoneNo,
      user_password: password,
      location_code: lcode,
      user_address: user_address,
      user_city: city,
      user_health_status: healthsts,
      user_blood_type: bloodt
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

//  Update user with id
app.put(`/user/:id`, function (req, res) {
  let user_national_ID = req.params.id;
  let lcode = req.body.location_code;
  let name = req.body.user_name;
  let age = req.body.user_age;
  let city = req.body.user_city;
  let bloodt = req.body.user_blood_type;
  let email = req.body.user_Email;
  let healthsts = req.body.user_health_status;
  let gender = req.body.user_gender;
  let password = req.body.user_password;
  if (!user_national_ID) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide the user ssn" });
  }
  dbConn.query(
    `UPDATE user SET user_name = ? , user_age = ? , user_city = ? , user_blood_type = ? , user_Email = ?, user_health_status = ?  ,user_gender = ?  ,user_password = ? , location_code = ?  WHERE user_national_ID = ${user_national_ID} ;`,
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
    "DELETE FROM user WHERE user_national_ID = ?",
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
  session=req.session;
  console.log(session)
  
  let id = req.body.user_national_ID;
  let password = req.body.user_password;
  if (!id || !password) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide your SSN and password" });
  }
  dbConn.query(
    "SELECT user_national_ID , user_password FROM user WHERE user_national_ID = ?",
    id,
    function (error, results, fields) {
      if (error) throw error;
      //console.log(results.length)
      //console.log(typeof results[0].user_password);
      if (results.length === 0 ||results[0].user_password !== password ){
        return res.send({
          error: false,
          //data: results,
          message: "your national Id or password is not correct",
        });
      }
      else if (
        results[0].user_national_ID === id &&
        results[0].user_password === password
      ) {
        return res.send({
          error: false,
          //data: results,
          message: "login accepted",
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






























/*
{
  "user_national_ID": "user_national_ID",
  "user_Fname": "user_Fname",
  "user_Lname": "user_Lname",
  "user_age": "age",
  "user_gender": "gender",
  "user_Email": "email",
  "user_phoneNo": "user_phoneNo",
  "user_password": "password",
  "location_code": "lcode",
  "user_address": "user_address",
  "user_city": "city",
  "user_health_status": "healthsts",
  "user_blood_type": "bloodt"
}*/