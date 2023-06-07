/* -----------   API Intialization   ------------ */
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



/* ---------------------------------   Requests - Responses Retrieving   ---------------------------------- */


//Retrieve all requests (for users)
app.get("/all-requests", function (req, res) {
  dbConn.query(`SELECT r.request_id , u.user_Fname, u.user_Lname , r.request_status,  r.hospital_id, 
                r.request_quantity, r.request_case , b.blood_type , l.city , h.hospital_name  , DATE(r.request_date) 
                from request AS r join blood AS b on r.blood_type = b.blood_id
                JOIN hospital AS h ON h.hospital_id = r.hospital_id 
                JOIN location AS l ON h.location_code = l.location_code
                LEFT JOIN user AS u ON r.user_id = u.user_id`
  , function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: "All Requests" });
  });
});



//Retrieve all requests (for hospitals)
app.get("/all-requests-hospitals", function (req, res) {
  dbConn.query(`SELECT  r.request_status, r.request_quantity , r.request_case , b.blood_type , l.city , h.hospital_name  , DATE(r.request_date) 
                  from request AS r join blood AS b on r.blood_type = b.blood_id
                  JOIN hospital AS h ON h.hospital_id = r.hospital_id 
                  JOIN location AS l ON h.location_code = l.location_code
                WHERE r.user_id IS NULL`
  , function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: "All Requests" });
  });
});



//Retrieve my requests (for users)
app.get("/my-requests/:id", function (req, res) {
  user_id = req.params.id
  dbConn.query(`SELECT r.request_id , r.request_status,  r.hospital_id, 
                  r.request_quantity, r.request_case , b.blood_type , l.city , h.hospital_name  , DATE(r.request_date) AS "request_date"
                  from request AS r join blood AS b on r.blood_type = b.blood_id
                  JOIN hospital AS h ON h.hospital_id = r.hospital_id 
                  JOIN location AS l ON h.location_code = l.location_code
                WHERE r.user_id = ? ` , user_id
  , function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: "All Requests" });
  });
});



//Retrieve my responses (for users)
app.get("/my-responses/:id", function (req, res) {
  user_id = req.params.id
  dbConn.query(`SELECT d.response_status , DATE(d.response_date) , u.user_id , h.hospital_name , h.hospital_city 
                  FROM request_donations AS d 
                  JOIN request AS r ON d.request_id = r.request_id 
                  JOIN user AS u ON d.responding_user = u.user_id  
                  JOIN hospital AS h ON h.hospital_id = r.hospital_id 
                WHERE d.responding_user = ? ` , user_id
  , function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: "All Requests" });
  });
});



/* ---------------------------------   Requests Filtering   ---------------------------------- */


//search requests
app.get("/search-requests/:value", function (req, res) {
  const param = req.params.value;
  const wildcard = `%${param.split('').join('%')}%`;
  
    let sql = `SELECT r.request_status, r.request_quantity, r.request_case , b.blood_type , l.city , h.hospital_name 
                from request AS r join blood AS b on r.blood_type = b.blood_id 
                JOIN hospital AS h ON h.hospital_id = r.hospital_id 
                JOIN location AS l ON h.location_code = l.location_code
                WHERE h.hospital_name LIKE ? OR b.blood_type LIKE ? `;
  
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



//Filter my requests (user)
app.get("/filter-by-user/:id", function (req, res) {
  user_id = req.params.id;
  dbConn.query(`SELECT r.request_status, r.request_quantity, r.request_case , b.blood_type , l.city , h.hospital_name ,
                  u.user_Fname , u.user_Lname , h.hospital_address 
                  from request AS r join blood AS b on r.blood_type = b.blood_id 
                  JOIN hospital AS h ON h.hospital_id = r.hospital_id 
                  JOIN location AS l ON h.location_code = l.location_code
                  LEFT JOIN user AS u ON r.user_id = u.user_id 
                WHERE r.user_id = ?` , user_id
  , function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: "Requests list." });
  });
});



//Filter requests by hospital 
app.get("/filter-by-hospital/:id", function (req, res) {
    hospital_id = req.params.id;
    dbConn.query(`SELECT r.request_id, r.request_status, r.request_quantity, r.request_case , b.blood_type , l.city , h.hospital_name ,
                    u.user_Fname , u.user_Lname , h.hospital_address , r.request_date		
                    from request AS r join blood AS b on r.blood_type = b.blood_id 
                    JOIN hospital AS h ON h.hospital_id = r.hospital_id 
                    JOIN location AS l ON h.location_code = l.location_code
                    LEFT JOIN user AS u ON r.user_id = u.user_id 
                  WHERE r.hospital_id = ?` , hospital_id
    , function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, data: results, message: "Requests list." });
    });
  });



//Filter requests by blood type
app.get("/filter-by-blood/:id", function (req, res) {
    blood_id = req.params.id;
    dbConn.query(`SELECT r.request_status, r.request_quantity, r.request_case , b.blood_type , l.city , h.hospital_name ,
                  u.user_Fname , u.user_Lname , h.hospital_address				
                  from request AS r join blood AS b on r.blood_type = b.blood_id 
                  JOIN hospital AS h ON h.hospital_id = r.hospital_id 
                  JOIN location AS l ON h.location_code = l.location_code
                  LEFT JOIN user AS u ON r.user_id = u.user_id 
                  WHERE r.blood_type = ? ` , blood_id
    , function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, data: results, message: "Requests list." });
    });
  });



app.get("/cities", function (req, res) {
    dbConn.query("SELECT * FROM location" , function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, data: results, message: "bcities list" });
    });
  });



//Filter requests by city
app.get("/filter-by-city/:id", function (req, res) {
  location_code = req.params.id;
  dbConn.query(`SELECT r.request_status, r.request_quantity, r.request_case , b.blood_type , l.city , h.hospital_name ,
                  u.user_Fname , u.user_Lname , h.hospital_address				
                  from request AS r join blood AS b on r.blood_type = b.blood_id 
                  JOIN hospital AS h ON h.hospital_id = r.hospital_id 
                  JOIN location AS l ON h.location_code = l.location_code
                  LEFT JOIN user AS u ON r.user_id = u.user_id 
                WHERE l.location_code = ? ` , location_code
  , function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: "Requests list." });
  });
});



/* ---------------------------------   Requests CRUD Operations   ---------------------------------- */


//create new request 

//first get all blood types in drop down list 
app.get("/blood-types", function (req, res) {
    dbConn.query("SELECT blood_type, blood_id FROM blood" , function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, data: results, message: "blood types list." });
    });
  });
//second get all hospitals in drop down list 
app.get("/hospitals", function (req, res) {
    dbConn.query("SELECT hospital_name,hospital_id  FROM hospital" , function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, data: results, message: "hospitals" });
    });
  });
//third insert a new record in requests
app.post("/add-request", function (req, res) {
    user_id = req.body.user_id;
    hospital_id = req.body.hospital_id;
    //request_status = req.body.request_status;
    //request_date = req.body.request_date; 
    request_quantity = req.body.request_quantity ;
    request_case = req.body.request_case;
    blood_type = req.body.blood_type;

    dbConn.query(`INSERT INTO request SET user_id = ? , hospital_id = ? , request_quantity = ? ,
                  request_case = ? , blood_type = ? ` ,
    [user_id, hospital_id, request_quantity, request_case, blood_type] ,
    function (error, results, fields) {
        if (error) throw error;
        return res.send(
            { error: false,
              message: "new request added successfully" 
            });
      });
    });



//update request
app.put("/update-request", function (req, res) {
  //request_status = req.body.request_status;
  request_quantity = req.body.request_quantity ;
  request_case = req.body.request_case;
  request_id = req.body.request_id;
  

    dbConn.query(`UPDATE request SET request_quantity = ? , request_case = ? WHERE request_id = ? ` ,
        [ request_quantity, request_case, request_id] 
    , function (error, results, fields) {
      if (error) throw error;
      return res.send(
        { error: false,
          message: "your request has been updated" });
    });
  });



//delete request
app.delete("/delete-request/:id", function (req, res) {
    id = req.params.id;
    
    dbConn.query("delete from request where request_id = ?  " , id
    , function (error, results, fields) {
      if (error) throw error;
      return res.send(
        { error: false,
          message: "request deleted" });
    });
  });


/* ---------------------------------   Responses Operations (add, count, calculate expiry)  ---------------------------------- */

//add a user response
app.post("/add-response", function (req, res) {
  request_id = req.body.request_id;
  res_user = req.body.user_id;
  hospital_id = req.body.hospital_id;

  dbConn.query(`INSERT INTO request_donations SET responding_user = ? , hospital_id = ? , request_id = ? ` ,
  [res_user, hospital_id, request_id] ,
  function (error, results, fields) {
      if (error) throw error;
      return res.send(
          { error: false,
            message: "new response added successfully" 
          });
    });
  });



//count number of responses to a specific request
app.get("/count", function (req, res) {
    dbConn.query(`SELECT  r.request_id , u.user_Fname , u.user_Lname , r.blood_type , COUNT(*) AS "Requests Counter" ,
                  DATE(r.request_date) , r.request_case , r.request_quantity , h.hospital_name , h.hospital_city , h.hospital_id 
                  FROM request_donations AS d 
                  JOIN request AS r ON d.request_id = r.request_id 
                  JOIN user AS u ON r.user_id = u.user_id
                  JOIN hospital AS h ON r.hospital_id = h.hospital_id
                  GROUP BY request_id  `
    , function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, data: results, message: "All Requests" });
    });
  });


//calculate response expire date 
app.get("/calculate-expire-date/:id", function (req, res) {
  hospital_id = req.params.id;
  dbConn.query(`CALL UpdateRowsBasedOnDateDiff(${hospital_id});`, hospital_id
  , function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: "All Requests" });
  });
});


/* ---------------------------------   Hospital Forms and Operations   ---------------------------------- */


//get responses form
app.get("/users-form/:id", function (req, res) { 
  sql = `SELECT us.user_Fname AS "applicant_Fname", us.user_Lname AS "applicant_Lname", us.user_national_ID AS "applicant_ID", 
          req.request_date, b.blood_type, req.request_quantity ,
          u.user_national_ID AS "participant_ID", u.user_Fname AS "participant_Fname", u.user_Lname AS "participant_Lname" ,
          d.response_date , d.response_status
          from request AS req 
          JOIN request_donations AS d ON req.request_id = d.request_id
          JOIN user AS u ON d.responding_user = u.user_id 
          LEFT JOIN user AS us ON req.user_id = us.user_id
          JOIN blood AS b ON req.blood_type = b.blood_id
            WHERE req.hospital_id = ? ` 
  hospital_id = req.params.id;
  dbConn.query(sql , hospital_id , function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: "hospital request form" });
  });
});



//add points when user donating
app.post("/add-points-after-donation", function (req, res) {
  response_id = req.body.response_id;
  user_id = req.body.user_id;
  hospital_id = req.body.hospital_id;

  sql = `SELECT InsertPointsAfterResponseChange( ${response_id} , ${user_id}, ${hospital_id})`

  dbConn.query(`SELECT InsertPointsAfterResponseChange( ${response_id} , ${user_id}, ${hospital_id})` ,
  function (error, results, fields) {
      if (error) throw error;
      return res.send(
          { error: false,
            message: "points added successfully" 
          });
    });
  });



//Fulfilled Request 
app.put("/fulfilled-request", function (req, res) {
  request_id = req.body.request_id
  
    dbConn.query(`UPDATE request SET request_status = 1 WHERE request_id = ? ` , request_id  
    , function (error, results, fields) {
      if (error) throw error;
      return res.send(
        { error: false,
          message: "Request is fulfilled!" });
    });
  });

  
// set port
app.listen(9000, function () {
    console.log("Node app is running on port 9000");
  });
  module.exports = app;