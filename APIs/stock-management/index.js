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
    password: "pass",
    database: "blooddb2",
  });
// connect to database
  dbConn.connect();



//start
app.get("/", function (req, res) {
  return res.send({ error: false, message: "hello" });
});

//Retrieve all hospitals stock
app.get("/all-hospitals-stock", function (req, res) {
  dbConn.query("select hospital_name, blood_type , blood_quantity  from hospital_blood_stock AS hs join blood as bld on hs.blood_id = bld.blood_id JOIN hospital AS h ON hs.hospital_id = h.hospital_id ORDER BY h.hospital_id "
  , function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: "hospitals list." });
  });
});



//Retrive hospital stock by id
app.get("/hospital-stock/:id", function (req, res) {
    hospital_id = req.params.id;
    dbConn.query("select blood_type , blood_quantity  from hospital_blood_stock AS hs join blood as bld on hs.blood_id = bld.blood_id WHERE hs.hospital_id = ? " , hospital_id
    , function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, data: results, message: "hospitals list." });
    });
  });
  


//update hospital stock
app.put("/hospital-stock", function (req, res) {
    hid= req.body.hid;
    bid = req.body.bid;
    qty= req.body.qty

    dbConn.query("update hospital_blood_stock set blood_quantity = ? where blood_id = ? and hospital_id = ?  " , [ qty , bid, hid] 
    , function (error, results, fields) {
      if (error) throw error;
      return res.send(
        { error: false,
          message: "stock information has been updated" });
    });
  });




//delete hospital stock
app.delete("/hospital-stock", function (req, res) {
    hid= req.body.hid;
    bid = req.body.bid;

    dbConn.query("delete from hospital_blood_stock where blood_id = ? and hospital_id = ?  " , [ bid, hid] 
    , function (error, results, fields) {
      if (error) throw error;
      return res.send(
        { error: false,
          message: "stock information has been deleted successfully" });
    });
  });



//search by hospital name or blood type
// app.post("/stock-search", function (req, res) {
//     h_name= req.body.h_name;
//     b_type = req.body.b_type;

//     dbConn.query("select hospital_name, blood_type , blood_quantity from hospital_blood_stock as hs join blood as bld on hs.blood_id = bld.blood_id JOIN hospital AS h ON hs.hospital_id = h.hospital_id where hospital_name = ? or bld.blood_type = ? " , [ h_name, b_type] 
//     , function (error, results, fields) {
//       if (error) throw error;
//       if (!h_name&&!b_type){
//         return res
//             .status (400)
//             .send(
//             { error: true,
//               message: "provide a hospital name or blood type" });
//       }
//       return res.send(
//         { error: false,
//           data: results,
//           message: "search results: " });
//     });
//   });
app.get("/stocksearch/:value", function (req, res) {
  const param = req.params.value;
  const wildcard = `%${param.split('').join('%')}%`;


  let sql = `SELECT hospital_name, blood_type, blood_quantity FROM hospital_blood_stock AS hs 
              JOIN blood AS bld ON hs.blood_id = bld.blood_id 
              JOIN hospital AS h ON hs.hospital_id = h.hospital_id 
              WHERE hospital_name LIKE ? OR bld.blood_type LIKE ?`;

  dbConn.query(
    sql,
    [wildcard, wildcard],
    function (error, results, fields) {
      console.log(sql)
      console.log(wildcard)

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


//create a new stock 

//first get all blood types in drop down list 
app.post("/blood-types", function (req, res) {
  hospital_id = req.body.hospital_id;
  dbConn.query(`select blood_type , blood_id from blood where blood_id not in ( Select blood_id from hospital_blood_stock where hospital_id = ? ) `, hospital_id , function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: "blood types list." });
  });
});
//second insert a new record in hospital's stock
app.post("/add-stock", function (req, res) {
    hid= req.body.hid;
    bid = req.body.bid;
    qty= req.body.qty;

    dbConn.query("INSERT INTO hospital_blood_stock SET blood_id = ?, hospital_id = ? , blood_quantity = ?" ,
    [bid, hid, qty] ,
    function (error, results, fields) {
        if (error) throw error;
        return res.send(
            { error: false,
              message: "new stock added successfully" 
            });
      });
    });



// set port
app.listen(1000, function () {
    console.log("Node app is running on port 1000");
  });
  module.exports = app;
