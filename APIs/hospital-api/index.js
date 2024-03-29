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
      .send({ error: true, message: "Please provide hospital_id" });
  }
  dbConn.query(
    "SELECT hospital.* , location.city FROM hospital JOIN location ON hospital.location_code = location.location_code  where hospital_id=?",
    hospital_id,
    function (error, results, fields) {
      if (error) {
        return res.status(500).send({ error: true, message: "Internal server error" });
      } else {
        return res.send(results);
      }
    }
  );
});
// app.get("/hospital/:id", function (req, res) {
//   let hospital_id = req.params.id;
//   if (!hospital_id) {
//     return res
//       .status(400)
//       .send({ error: true, message: "Please provide user_id" });
//   }
//   dbConn.query(
//     "SELECT * FROM hospital where hospital_id=?",
//     hospital_id,
//     function (error, results, fields) {
//       if (error) throw error;
//       return res.send({
//         error: false,
//         data: results,
//         message: "hospital data.",
//       });
//     }
//   );
// });

// Add a new hospital
//first choose location
app.get("/locations", function (req, res) {
  dbConn.query(`select * from location ` , function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: "locations list." });
  });
});

//add hospital
app.post("/hospital", function (req, res) {
  //let id = req.body.hospital_id;
  let lcode = req.body.location_code;
  let name = req.body.hospital_name;
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
      hospital_name: name ,
      hospital_password: password,
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
  let name = req.body.hospital_name;
  let password = req.body.hospital_password;
  let phoneNo = req.body.hospital_phoneNo;
  let address = req.body.hospital_address;
  let email = req.body.hospital_Email;
  //let don = req.body.donation;
  if (!id) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide the hospital id" });
  }
  dbConn.query(
    `UPDATE hospital SET location_code = ?, hospital_name = ? , hospital_password = ?, hospital_phoneNo = ?  , hospital_address = ?  , hospital_Email = ?  WHERE hospital_id = ${id} ;`,
    [lcode, name, password, phoneNo, address, email],
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
    "SELECT hospital_id, hospital_Email , hospital_password FROM hospital WHERE hospital_Email = ? AND hospital_password = ? ",
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
app.listen(7000, function () {
  console.log("Node app is running on port 7000");
});
module.exports = app;




