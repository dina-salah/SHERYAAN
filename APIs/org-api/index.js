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
      if (error) {
        return res.status(500).send({ error: true, message: "Internal server error" });
      } else {
        console.log("Api is fired ");
        return res.send(results);
      }
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



// -----------------------------------------------   Eevets   ----------------------------------------------- //



// Retrieve all events
app.get("/events", function (req, res) {
  dbConn.query(`SELECT o.organization_name , e.* , l.city FROM event AS e 
                JOIN organization AS o ON e.org_id = o.organization_id 
                JOIN location AS l ON l.location_code = e.location_code `, function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: "Organizations list." });
  });
});

// Retrieve event with id
app.get("/event/:id", function (req, res) {
  let event_id = req.params.id;
  if (!event_id) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide your organization id" });
  }
  dbConn.query(` SELECT o.organization_name , e.* , l.city FROM event AS e 
                  JOIN organization AS o ON e.org_id = o.organization_id 
                  JOIN location AS l ON l.location_code = e.location_code WHERE e.event_id = ? `, event_id ,
    function (error, results, fields) {
      if (error) {
        return res.status(500).send({ error: true, message: "Internal server error" });
      } else {
        return res.send(results);
      }
    }
  );
});



// Retrieve event with organization
app.get("/event-by-org/:id", function (req, res) {
  let org_id = req.params.id;
  if (!org_id) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide your organization id" });
  }
  dbConn.query(`SELECT o.organization_name , e.* , l.city FROM event AS e 
                JOIN organization AS o ON e.org_id = o.organization_id 
                JOIN location AS l ON l.location_code = e.location_code WHERE e.org_id = ? `, org_id ,
    function (error, results, fields) {
      if (error) {
        return res.status(500).send({ error: true, message: "Internal server error" });
      } else {
        return res.send(results);
      }
    }
  );
});




// Retrieve all organizations
app.get("/orgs", function (req, res) {
  dbConn.query("SELECT oragization_id , organization_name FROM organization", function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: "Organizations list." });
  });
});



// Retrieve all locations
app.get("/locs", function (req, res) {
  dbConn.query("SELECT * FROM location", function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: "Organizations list." });
  });
});




// Add a new event
app.post("/event", function (req, res) {
  let start = req.body.event_startDate;
  let end = req.body.event_endDate;
  let address = req.body.event_address;

  dbConn.query(
    "INSERT INTO organization SET ? ",
    {
      event_startDate: start,
      event_endDate: end ,
      event_address: address,

    },
    function (error, results, fields) {
      if (error) throw error;
      return res.send({
        error: false,
        data: results[0],
        message: "New event has been created successfully.",
      });
    }
  );
});



//  Update event data with id
app.put(`/update-event/:id`, function (req, res) {
  let id = req.params.id;
  let start = req.body.event_startDate;
  let end = req.body.event_endDate;
  let address = req.body.event_address;
  let loc = req.body.location_code;

  if (!id) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide the user ssn" });
  }
  dbConn.query(
    `UPDATE event SET event_startDate = ? , event_endDate = ? , event_address = ? , location_code = ? WHERE organization_id = ${id} ;`,
    [start, end, address, loc],
    function (error, results, fields) {
      if (error) throw error;
      return res.send({
        error: false,
        data: results,
        message: "Event data has been updated successfully.",
      });
    }
  );
});



//  Update organization data with id
app.put(`/event-closed`, function (req, res) {
  let id = req.body.id;

  if (!id) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide the user ssn" });
  }
  dbConn.query(
    `UPDATE event SET event_status = 1 WHERE event_id = ${id} ;`,
    function (error, results, fields) {
      if (error) throw error;
      return res.send({
        error: false,
        data: results,
        message: "Event data has been closed.",
      });
    }
  );
});



//  Delete event
app.delete("/delete-event/:id", function (req, res) {
  let id = req.params.id;
  if (!id) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide organization_id" });
  }
  dbConn.query(
    `DELETE FROM event WHERE event_id=${id} ; `,
    function (error, results, fields) {
      if (error) throw error;
      return res.send({
        error: false,
        data: results,
        message: "event has been deleted successfully.",
      });
    }
  );
});