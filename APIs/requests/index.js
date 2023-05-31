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



//start
app.get("/", function (req, res) {
  return res.send({ error: false, message: "hello" });
});

//Retrieve all requests
app.get("/all-requests", function (req, res) {
  dbConn.query(`select r.request_status, r.request_quantity, r.request_case , b.blood_type , l.city , h.hospital_name 
                from request AS r join blood AS b on r.blood_type = b.blood_id 
                JOIN hospital AS h ON h.hospital_id = r.hospital_id 
                JOIN location AS l ON h.location_code = l.location_code`
  , function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: "All Requests" });
  });
});



//filter request
app.get("/search-requests/:value", function (req, res) {
  const param = req.params.value;
  const wildcard = `%${param.split('').join('%')}%`;
  
    let sql = `SELECT r.request_status, r.request_quantity, r.request_case , b.blood_type , l.city , h.hospital_name 
                from request AS r join blood AS b on r.blood_type = b.blood_id 
                JOIN hospital AS h ON h.hospital_id = r.hospital_id 
                JOIN location AS l ON h.location_code = l.location_code
                WHERE h.hospital_name LIKE ? OR b.blood_type LIKE ?`;
  
    dbConn.query(
      sql,
      [wildcard, wildcard],
      function (error, results, fields) {
        if (error) {
          console.error(error);
          return res.status(500).json({
            error: true,
            message: "provide a hospital name or blood type",
          });
        }
        return res.json({
          error: false,
          data: results,
          message: "search results: ",
        });
      }
    );
  });



//Retrive request by hospital id
app.get("/filter-by-hospital/:id", function (req, res) {
    hospital_id = req.params.id;
    dbConn.query(`SELECT r.request_status, r.request_quantity, r.request_case , b.blood_type , l.city , h.hospital_name 
                    from request AS r join blood AS b on r.blood_type = b.blood_id 
                    JOIN hospital AS h ON h.hospital_id = r.hospital_id 
                    JOIN location AS l ON h.location_code = l.location_code
                    WHERE r.hospital_id = ?` , hospital_id
    , function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, data: results, message: "Requests list." });
    });
  });



//Retrive request by blood id
app.get("/filter-by-blood/:id", function (req, res) {
    blood_id = req.params.id;
    dbConn.query(`SELECT r.request_status, r.request_quantity, r.request_case , b.blood_type , l.city , h.hospital_name 
                    from request AS r join blood AS b on r.blood_type = b.blood_id 
                    JOIN hospital AS h ON h.hospital_id = r.hospital_id 
                    JOIN location AS l ON h.location_code = l.location_code
                    WHERE r.blood_type = ?` , blood_id
    , function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, data: results, message: "Requests list." });
    });
  });

  

//create new request 

//first get all blood types in drop down list 
app.get("/blood-types", function (req, res) {
    dbConn.query("SELECT blood_type FROM blood" , function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, data: results, message: "blood types list." });
    });
  });
//second get all hospitals in drop down list 
app.get("/hospitals", function (req, res) {
    dbConn.query("SELECT hospital_name FROM hospital" , function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, data: results, message: "hospitals" });
    });
  });
//third insert a new record in requests
app.post("/add-request", function (req, res) {
    user_ssn = req.body.user_ssn;
    hospital_id = req.body.hospital_id;
    request_status = req.body.request_status;
    request_date = req.body.request_date; 
    request_quantity = req.body.request_quantity ;
    request_case = req.body.request_case;
    blood_type = req.body.blood_type;

    dbConn.query(`INSERT INTO request SET` ,
    [user_ssn, hospital_id, request_status, request_date, request_quantity, request_case, blood_type] ,
    function (error, results, fields) {
        if (error) throw error;
        return res.send(
            { error: false,
              message: "new request added successfully" 
            });
      });
    });



//update request
//!!!!!!!!!!!!!!!!!!!!!!!!!!!! which coloumns to update !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
app.put("/update-request", function (req, res) {
    //user_ssn = req.body.user_ssn;
    //hospital_id = req.body.hospital_id;
    request_status = req.body.request_status;
    //request_date = req.body.request_date; 
    request_quantity = req.body.request_quantity ;
    request_case = req.body.request_case;
    //blood_type = req.body.blood_type;
    request_id = req.body.request_id;

    dbConn.query(`UPDATE request SET request_status = ? , request_quantity = ? , request_case = ?  , WHERE request_id = ? ` ,
        [request_status, request_quantity, request_case, request_id] 
    , function (error, results, fields) {
      if (error) throw error;
      return res.send(
        { error: false,
          message: "your request has been updated" });
    });
  });



//delete hospital stock
app.delete("/delete-request/id", function (req, res) {
    id = req.params.id;
    
    dbConn.query("delete from request where request_id = ?  " , request_id
    , function (error, results, fields) {
      if (error) throw error;
      return res.send(
        { error: false,
          message: "request deleted" });
    });
  });



// set port
app.listen(9000, function () {
    console.log("Node app is running on port 9000");
  });
  module.exports = app;