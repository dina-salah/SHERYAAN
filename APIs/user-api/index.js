const cors = require('cors'); //added cors
var express = require("express");
var app = express();
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
  let user_id = req.params.id;
  if (!user_id) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide user_id" });
  }
  dbConn.query(
    "SELECT * FROM user where user_id=?",
    user_id,
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

  if (!user_national_ID) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide user" });
  }
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
  let user_id = req.params.id;
  let lcode = req.body.location_code;
  let Fname = req.body.user_Fname;
  let Lname = req.body.user_Lname;
  let age = req.body.user_age;
  let city = req.body.user_city;
  let bloodt = req.body.user_blood_type;
  let email = req.body.user_Email;
  let healthsts = req.body.user_health_status;
  let gender = req.body.user_gender;
  let password = req.body.user_password;
  let phoneNo = req.body.user_phoneNo;
  let address = req.body.user_address;
  if (!user_id) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide the user ssn" });
  }
  dbConn.query(
    `UPDATE user SET user_Fname = ? , user_Lname= ?, user_age = ? , user_city = ? , user_blood_type = ? , user_Email = ?, user_health_status = ?  ,user_gender = ?  ,user_password = ? , location_code = ? , user_phoneNo = ? , user_address = ?  WHERE user_id = ${user_id} ;`,
    [Fname, Lname, age, city, bloodt, email, healthsts, gender, password, lcode, phoneNo, address],
    function (error, results, fields) {
      if (error) throw error;
      if (results.affectedRows == 0){
        return res.send({
          error: true,
          data: results,
          message: "there is no matched id",
        });
      }
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
    "DELETE FROM user WHERE user_id = ?",
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
  let ID = req.body.user_national_ID;
  let password = req.body.user_password;
  if (!ID || !password) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide your National ID and password" });
  }
  dbConn.query(
    "SELECT user_id , user_national_ID , user_password FROM user WHERE user_national_ID = ? AND user_password = ? ",
    [ID, password],
    
    function (error, results, fields) {
      if (error) throw error;
      if (results.length == 0 ) {
        return res.send({
          error : true,
          message: "national id or password are not correct"
        })
      } 
      else {
        return res.send({
          error : false,
          data: results,
          message: "loging accepted"
        })
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