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



// default route
app.get("/", function (req, res) {
  return res.send({ error: true, message: "hello" });
});

// connection configurations
var dbConn = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "dina",
  database: "blooddb2",
});
// connect to database
dbConn.connect();

// Retrieve all organizations
app.get("/orgs", function (req, res) {
  dbConn.query("SELECT * FROM organization", function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: "Organizations list." });
  });
});

// Retrieve org with id
app.get("/org/:id", function (req, res) {
  let organization_id = req.params.id;
  if (!organization_id) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide your organization id" });
  }
  dbConn.query(
    "SELECT * FROM organization where organization_id=?",
    organization_id,
    function (error, results, fields) {
      if (error) throw error;
      return res.send({
        error: false,
        data: results,
        message: "Organization: ",
      });
    }
  );
});

// Add a new organization
app.post("/org", function (req, res) {
  //let org = req.body.organization_id;
  //let event_code = req.body.event_code;
  let name = req.body.organization_name;
  let phoneNo = req.body.organization_phoneNo;
  let email = req.body.organization_email;
  let password = req.body.organization_password;
  let city = req.body.orgaization_city;

  /*if (!org) {
    return res
      .status(400)
      .send({ error: true, message: "Please Provide Organization Id" });
  }*/
  dbConn.query(
    "INSERT INTO organization SET ? ",
    {
      //organization_id: org,
      //event_code: event_code,
      organization_name: name,
      organization_password: password,
      organization_phoneNo: phoneNo,
      organization_email: email,
      orgaization_city: city
    },
    function (error, results, fields) {
      if (error) throw error;
      return res.send({
        error: false,
        data: results[0],
        message: "New Organization has been created successfully.",
      });
    }
  );
});

//  Update organization data with id
app.put(`/org/:id`, function (req, res) {
  let org = req.params.id;
  //let event_code = req.body.event_code;
  let name = req.body.organization_name;
  let phoneNo = req.body.organization_phoneNo;
  let email = req.body.organization_email;
  let password = req.body.organization_password;
  if (!org) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide the user ssn" });
  }
  dbConn.query(
    `UPDATE organization SET organization_name = ? , organization_phoneNo = ? , organization_email = ? , organization_password = ? WHERE organization_id = ${org} ;`,
    [name, phoneNo, email, password],
    function (error, results, fields) {
      if (error) throw error;
      return res.send({
        error: false,
        data: results,
        message: "Organization data has been updated successfully.",
      });
    }
  );
});

//  Delete user
app.delete("/org/:id", function (req, res) {
  let organization_id = req.params.id;
  if (!organization_id) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide organization_id" });
  }
  dbConn.query(
    `DELETE FROM organization WHERE organization_id=${organization_id} ; `,
    function (error, results, fields) {
      if (error) throw error;
      return res.send({
        error: false,
        data: results,
        message: "organization has been deleted successfully.",
      });
    }
  );
});

//verify user information
app.post("/login", function (req, res) {
  let email = req.body.organization_email;
  let password = req.body.organization_password;
  if (!email || !password) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide your email and password" });
  }
  dbConn.query(
    "SELECT organization_id, organization_email , organization_password FROM organization WHERE organization_email = ? AND organization_password = ? ",
    [email, password],
    
    function (error, results, fields) {
      if (error) throw error;
      if (results.length == 0 ) {
        return res.send({
          error : true,
          message: "email or password are not correct"
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
app.listen(8000, function () {
  console.log("Node app is running on port 8000");
});
module.exports = app;
