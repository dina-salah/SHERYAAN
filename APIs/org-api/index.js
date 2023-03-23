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
  let event_code = req.body.event_code;
  let name = req.body.organization_name;
  let phoneNo = req.body.organization_phoneNo;
  let email = req.body.organization_email;
  let password = req.body.organization_password;

  /*if (!org) {
    return res
      .status(400)
      .send({ error: true, message: "Please Provide Organization Id" });
  }*/
  dbConn.query(
    "INSERT INTO organization SET ? ",
    {
      //organization_id: org,
      event_code: event_code,
      organization_name: name,
      organization_password: password,
      organization_phoneNo: phoneNo,
      organization_email: email
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
  let event_code = req.body.event_code;
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
    `UPDATE organization SET event_code = ? , organization_name = ? , organization_phoneNo = ? , organization_email = ? , organization_password = ? WHERE organization_id = ${org} ;`,
    [event_code, name, phoneNo, email, password],
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
    "SELECT organization_email , organization_password FROM organization WHERE organization_email = ?",
    email,
    function (error, results, fields) {
      if (error) throw error;
      //console.log(typeof results[0].user_password);
      if (results.length === 0 ||results[0].organization_password !== password ){
        return res.send({
          error: false,
          //data: results,
          message: "email or password are not accepted",
        });
      }
      else if (
        results[0].organization_email === email &&
        results[0].organization_password === password
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
app.listen(6000, function () {
  console.log("Node app is running on port 6000");
});
module.exports = app;
