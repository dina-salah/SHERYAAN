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
dbConn.connect();

// Retrieve all hospitals
app.get("/hospitals", function (req, res) {
  dbConn.query("SELECT * FROM hospital", function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: "hospitals list." });
  });
});

// Retrieve hospital with id
app.get("/hospital/:id", function (req, res) {
  let hospital_id = req.params.id;
  if (!hospital_id) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide user_id" });
  }
  dbConn.query(
    "SELECT * FROM hospital where hospital_id=?",
    hospital_id,
    function (error, results, fields) {
      if (error) throw error;
      return res.send({
        error: false,
        data: results,
        message: "hospital data.",
      });
    }
  );
});

// Add a new hospital
app.post("/hospital", function (req, res) {
  //let id = req.body.hospital_id;
  let lcode = req.body.location_code;
  let stock = req.body.stock_id;
  let name = req.body.hospital_name;
  let city = req.body.hospital_city;
  let password = req.body.hospital_password;
  let phoneNo = req.body.hospital_phoneNo;
  let address = req.body.hospital_address;
  let email = req.body.hospital_Email;
  let donation = req.body.donation;

  /*if (!id) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide hospital id" });
  }*/
  dbConn.query(
    "INSERT INTO hospital SET ? ",
    {
      //hospital_id: id,
      location_code: lcode,
      stock_id: stock,
      hospital_name:name ,
      hospital_city: city,
      hospital_password:password,
      hospital_phoneNo: phoneNo,
      hospital_address:address, 
      hospital_Email: email,
      donation: donation
    },
    function (error, results, fields) {
      if (error) throw error;
      return res.send({
        error: false,
        data: results[0],
        message: "New hospital has been created successfully.",
      });
    }
  );
});

//  Update hospital with id
app.put(`/hospital/:id`, function (req, res) {
  let id = req.params.id;
  let lcode = req.body.location_code;
  let stock = req.body.stock_id;
  let name = req.body.hospital_name;
  let city = req.body.hospital_city;
  let password = req.body.hospital_password;
  let phoneNo = req.body.hospital_phoneNo;
  let address = req.body.hospital_address;
  let email = req.body.hospital_Email;
  let don = req.body.donation;
  if (!id) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide the hospital id" });
  }
  dbConn.query(
    `UPDATE hospital SET location_code = ? , stock_id = ? , hospital_name = ? , hospital_city = ? , hospital_password = ?, hospital_phoneNo = ?  , hospital_address = ?  , hospital_Email = ? , donation = ?  WHERE hospital_id = ${id} ;`,
    [lcode, stock, name, city, password, phoneNo, address, email, don],
    function (error, results, fields) {
      if (error) throw error;
      return res.send({
        error: false,
        data: results,
        message: "hospital information has been updated successfully.",
      });
    }
  );
});

//  Delete hospital
app.delete("/hospital/:id", function (req, res) {
  let hospital_id = req.params.id;
  if (!hospital_id) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide your hospital id" });
  }
  dbConn.query(
    "DELETE FROM hospital WHERE hospital_id = ?",
    hospital_id,
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

//verify hospital information
app.post("/login", function (req, res) {
  let email = req.body.hospital_Email;
  let password = req.body.hospital_password;
  if (!email || !password) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide your email and password" });
  }
  dbConn.query(
    "SELECT hospital_Email , hospital_password FROM hospital WHERE hospital_Email = ?",
    email,
    function (error, results, fields) {
      if (error) throw error;
      //console.log(typeof results[0].user_password);
      if (results.length === 0 ||results[0].hospital_password !== password ){
        return res.send({
          error: false,
          //data: results,
          message: "email or password are not accepted",
        });
      }
      else if (
        results[0].hospital_Email === email &&
        results[0].hospital_password === password
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
app.listen(7000, function () {
  console.log("Node app is running on port 7000");
});
module.exports = app;




