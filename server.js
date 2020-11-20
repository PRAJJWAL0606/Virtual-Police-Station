console.log("Server-side code running");
const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const mongodb = require("mongodb");
const app = express();
const dialogflow = require('dialogflow');
const uuid = require('uuid');
var nodemailer = require("nodemailer");

const PORT = process.env.port || 8080;
app.use(express.static("public"));

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
let db;
const url = "mongodb://ThaparUser:Pass123%23@virtualpolice-shard-00-00.6lhbw.mongodb.net:27017,virtualpolice-shard-00-01.6lhbw.mongodb.net:27017,virtualpolice-shard-00-02.6lhbw.mongodb.net:27017/virtualpolice?ssl=true&replicaSet=atlas-o4o463-shard-0&authSource=admin&retryWrites=true&w=majority";



MongoClient.connect(url, (err, database) => {
  if (err) {
    return console.log(err);
  }
  db = database;
  app.listen((PORT), () => {
      console.log('listening on deployed server');
  });
});


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});


app.get("/mainuserpage", (req, res) => {
    res.sendFile(__dirname + "/mainuser.html");
});


app.get("/chatbot", (req, res) => {
  res.sendFile(__dirname + "/chatbot.html");
});


var userid=null;
var policestationid=null;
var policestationname = "null";

app.get("/policestationmain", (req, res) => {
  res.sendFile(__dirname + "/policestationmain.html");
});

app.get("/policestationmain/:id", (req, res) => {
  policestationid = req.params.id;
  res.sendFile(__dirname + "/policestationmain.html");
});


app.get("/firtracking", (req, res) => {
  res.sendFile(__dirname + "/FIRtracking.html");
});


app.get("/filefir", (req, res) => {
  res.sendFile(__dirname + "/FIRfiling.html");
});


app.get("/missingperson", (req, res) => {
  res.sendFile(__dirname + "/MissingPerson.html");
});


app.get("/lostandfound", (req, res) => {
  res.sendFile(__dirname + "/Lostandfound.html");
});


app.get("/wantedcriminals", (req, res) => {
  res.sendFile(__dirname + "/WantedCriminals.html");
});


app.get("/policestationadmin", (req, res) => {
  res.sendFile(__dirname + "/PoliceStationAdmin.html");
});


app.get("/adminfirtracking", (req, res) => {
  res.sendFile(__dirname + "/PoliceAdminFIRTracking.html");
});


app.get("/admininmatetracking", (req, res) => {
  res.sendFile(__dirname + "/PoliceAdminInmate.html");
});

app.get("/admincriminaltracking", (req, res) => {
  res.sendFile(__dirname + "/PoliceAdminCriminal.html");
});

app.get("/signup", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});


app.get("/addpoliceStation", (req, res) => {
  res.sendFile(__dirname + "/addPoliceStation.html");
});

app.get("/updatePoliceStation", (req, res) => {
  res.sendFile(__dirname + "/updatePoliceStation.html");
});

app.post("/login", (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  var role = req.body.role;

  db.collection("userDetails").find({username:username, password:password, role:role}).toArray((err, result) => {
    if (err){
      res.send(err);
    } 
    else{
      policestationid = result[0].policeStation;
      userid = result[0]._id.toString();
      res.send(result);
    }
  });

});

async function runSample(msg,projectId="virtual-police-pekl") {
  
  const sessionId = uuid.v4();
  const sessionClient = new dialogflow.SessionsClient({
    keyFilename:"F:/Software Engineering Project/Virtual_Police/public/virtual-police-pekl-b730ed1455dd.json"
  });
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);
 
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: msg,
        languageCode: 'en-US',
      },
    },
  };
 
  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  const result = responses[0].queryResult;
  return result.fulfillmentText;

}

app.get('/getbotresponse', (req,res) => {
   var result;
  runSample(req.query.message).then(data=>{
      // console.log(data);
      result = data;
      res.send([{response:result}]);
  });
});




app.post("/filefir", (req, res) => {
  var newfir = req.body;
  
  var fir = {
    policeStationid:policestationid,
    userid:userid,
    subject:newfir.subject,
    type:newfir.type,
    image:newfir.image,
    description:newfir.description,
    message:"No message yet",
    status:"Filed"
  }

  db.collection("FIR").save(fir, (err, result) => {
    if (err) {
      return console.log(err);
    }
    console.log("click added to db");
    res.send([
      {
        message: "Request successfully logged",
        status: true,
      },
    ]);
  });

});


app.get('/getfiledfiruser',(req,res) =>{
  db.collection("FIR").find({ userid: userid, policeStationid:policestationid}).toArray((err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
});



app.get('/getfiledfiradmin',(req,res) =>{
  db.collection("FIR").find({policeStationid:policestationid}).toArray((err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
});


app.get('/getdetailfir',(req,res) =>{
  var firid = req.query.idnumber;
  db.collection("FIR").find({ _id: new mongodb.ObjectId(firid) }).toArray((err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
});




app.post("/sendmsgadmin", (req, res) => {
  var message = req.body.message;
  var firid = req.body.idnumber;
  db.collection("FIR").find({_id: new mongodb.ObjectId(firid)}).toArray((err, result) => {
      if (err) {
        res.send(err);
      } else {
        result[0]['message'] = message;
        db.collection("FIR").save(result[0], function (err, res) {
          if (err) res.send(err);
          console.log("1 document updated");
        });
        res.send([
          {
            message: "Request successfully logged",
            status: true,
          },
        ]);
      }
    });
});

app.post("/updatefirstatus", (req, res) => {
  var newstatus = req.body.status;
  var firid = req.body.idnumber;
  db.collection("FIR").find({_id: new mongodb.ObjectId(firid)}).toArray((err, result) => {
      if (err) {
        res.send(err);
      } else {
        result[0]['status'] = newstatus;
        db.collection("FIR").save(result[0], function (err, res) {
          if (err) res.send(err);
          console.log("1 document updated");
        });
        res.send([
          {
            message: "Request successfully logged",
            status: true,
          },
        ]);
      }
    });
});



app.get('/getmissingperson',(req,res) =>{
  db.collection("FIR").find({policeStationid:policestationid,type:"Missing Person",  $or: [{ 'status': "Filed" }, { 'status': "Tracking"}] }).toArray((err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
});


app.get('/getlostitems',(req,res) =>{
  db.collection("FIR").find({policeStationid:policestationid,type:"Lost Item",  $or: [{ 'status': "Filed" }, { 'status': "Tracking"}] }).toArray((err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
});

//criminal
app.post("/addcriminal", (req, res) => {
  var criminal = req.body;
  var criminaldetail = {
    'policestationid':policestationid,
    'name': criminal.name,    
    'image': criminal.image,
    'type': criminal.type,
    'reward':criminal.reward,
    'description':criminal.description,
    'contactno':criminal.contactno,
    'suspensionDate':criminal.suspensionDate,
    'salary':criminal.salary,
    'behaviour':criminal.behaviour
  }
  db.collection("criminalRecords").save(criminaldetail, (err, result) => {
    if (err) {
      return console.log(err);
    }
    console.log("click added to db");
    res.send([
      {
        message: "Request successfully logged",
        status: true,
      },
    ]);
  });
});



app.post("/updatecriminaltype", (req, res) => {
  var newtype = req.body.type;
  var criminalid = req.body.idnumber;
  db.collection("criminalRecords").find({_id: new mongodb.ObjectId(criminalid)}).toArray((err, result) => {
      if (err) {
        res.send(err);
      } else {
        result[0]['type'] = newtype;
        db.collection("criminalRecords").save(result[0], function (err, res) {
          if (err) res.send(err);
          console.log("1 document updated");
        });
        res.send([
          {
            message: "Request successfully logged",
            status: true,
          },
        ]);
      }
    });
});



app.post("/updatecriminalcontact", (req, res) => {
  var newcontact = req.body.contactno;
  var criminalid = req.body.idnumber;
  db.collection("criminalRecords").find({_id: new mongodb.ObjectId(criminalid)}).toArray((err, result) => {
      if (err) {
        res.send(err);
      } else {
        result[0]['contactno'] = newcontact;
        db.collection("criminalRecords").save(result[0], function (err, res) {
          if (err) res.send(err);
          console.log("1 document updated");
        });
        res.send([
          {
            message: "Request successfully logged",
            status: true,
          },
        ]);
      }
    });
});




app.get('/getcriminallist',(req,res) =>{
  db.collection("criminalRecords").find({policeStationid:policestationid,type:"Criminal"}).toArray((err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
});


//inmate

app.post("/addinmate", (req, res) => {
  var criminal = req.body;
  var criminaldetail = {
    'policestationid':policestationid,
    'name': criminal.name,    
    'image': criminal.image,
    'type': criminal.type,
    'reward':criminal.reward,
    'description':criminal.description,
    'contactno':criminal.contactno,
    'suspensionDate':criminal.suspensionDate,
    'salary':criminal.salary,
    'behaviour':criminal.behaviour
  }
  db.collection("criminalRecords").save(criminaldetail, (err, result) => {
    if (err) {
      return console.log(err);
    }
    console.log("click added to db");
    res.send([
      {
        message: "Request successfully logged",
        status: true,
      },
    ]);
  });
});



app.post("/updateinmatetype", (req, res) => {
  var newtype = req.body.type;
  var criminalid = req.body.idnumber;
  db.collection("criminalRecords").find({_id: new mongodb.ObjectId(criminalid)}).toArray((err, result) => {
      if (err) {
        res.send(err);
      } else {
        result[0]['type'] = newtype;
        db.collection("criminalRecords").save(result[0], function (err, res) {
          if (err) res.send(err);
          console.log("1 document updated");
        });
        res.send([
          {
            message: "Request successfully logged",
            status: true,
          },
        ]);
      }
    });
});



app.post("/updateinmatewage", (req, res) => {
  var newwage = req.body.salary;
  var criminalid = req.body.idnumber;
  db.collection("criminalRecords").find({_id: new mongodb.ObjectId(criminalid)}).toArray((err, result) => {
      if (err) {
        res.send(err);
      } else {
        result[0]['salary'] = newwage;
        db.collection("criminalRecords").save(result[0], function (err, res) {
          if (err) res.send(err);
          console.log("1 document updated");
        });
        res.send([
          {
            message: "Request successfully logged",
            status: true,
          },
        ]);
      }
    });
});



app.post("/updateinmatebehaviour", (req, res) => {
  var newbh = req.body.behaviour;
  var criminalid = req.body.idnumber;
  db.collection("criminalRecords").find({_id: new mongodb.ObjectId(criminalid)}).toArray((err, result) => {
      if (err) {
        res.send(err);
      } else {
        result[0]['behaviour'] = newbh;
        db.collection("criminalRecords").save(result[0], function (err, res) {
          if (err) res.send(err);
          console.log("1 document updated");
        });
        res.send([
          {
            message: "Request successfully logged",
            status: true,
          },
        ]);
      }
    });
});




app.get('/getinmatelist',(req,res) =>{
  db.collection("criminalRecords").find({policeStationid:policestationid,type:"Inmate"}).toArray((err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
});



app.get('/getpolicestation',(req,res) =>{

  db.collection("PoliceStation").find({}).toArray((err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });

});


app.get('/getuserDetails',(req,res) =>{
  db.collection("userDetails").find({ _id: new mongodb.ObjectId(userid) }).toArray((err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
});

app.post('/alertPoliceStation',(req,res) =>{
  var alert = req.body;

  db.collection("Alerts").save(alert, (err, result) => {
    if (err) {
      return console.log(err);
    }
    console.log("click added to db");
    res.send([
      {
        message: "Request successfully logged",
        status: true,
      },
    ]);
  });
});


app.get('/getalerts',(req,res) =>{

  db.collection("Alerts").find({policeStationid:policestationid}).toArray((err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });

});


let transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  secure: true,
  port: 465,
  auth: {
    user: "GBM918211@gmail.com",
    pass: "Pass#123!",
  },
});



app.post("/confirmalert", (req, res) => {
  var deletedata = req.body;
  var emailid = req.body.emailid;

  db.collection("Alerts").remove(
    { _id: new mongodb.ObjectId(deletedata.idnumber) },
    (err, result) => {
      if (err) {
        return console.log(err);
      }
      let HelperOptions = {
        from: "GBM918211@gmail.com",
        to: emailid,
        subject: "Approaching in Few Minutes",
        text:
          "Dear Citizen, we are approaching you in few seconds and trackin gyour location and the police station name is "+policestationname,
      };
      transporter.sendMail(HelperOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Message sent");
        }
      });
      
      res.send([
        {
          message: "Request successfully logged",
          status: true,
        },
      ]);
    }
  );
});



app.get('/getpolicestationdetails',(req,res) =>{
  db.collection("PoliceStation").find({ _id: new mongodb.ObjectId(policestationid)}).toArray((err, result) => {
      if (err) {
        res.send(err);
      } else {
        policestationname = result[0].policeStationname;
        res.send(result);
      }
    });
});




app.post("/signupnewuser", (req, res) => {
  var newuser = req.body;

  db.collection("userDetails").save(newuser, (err, result) => {
    if (err) {
      return console.log(err);
    }

    console.log("click added to db");
    res.send([
      {
        message: "Request successfully logged",
        status: true,
      },
    ]);
  });

});




app.post("/addnewpolicestation", (req, res) => {
  var newps = req.body;

  db.collection("PoliceStation").save(newps, (err, result) => {
    if (err) {
      return console.log(err);
    }

    db.collection("PoliceStation").find().sort({"_id" : -1}).limit(1).toArray(function (err1, result1){
      if (err1){
        return console.log(err1);
      }

      console.log("click added to db");

      res.send([
        {
          message: result1[0]._id.toString(),
          status: true,
        },
      ]);
    });
  });
});



app.post("/updatepolicestation", (req, res) => {
  var fieldname = req.body.fieldname;
  var info = req.body.info;

  db.collection("PoliceStation").find({_id: new mongodb.ObjectId(policestationid)}).toArray((err, result) => {
      if (err) {
        res.send(err);
      } else {
        result[0][fieldname] = info;
        db.collection("PoliceStation").save(result[0], function (err, res) {
          if (err) res.send(err);
          console.log("1 document updated");
        });
        res.send([
          {
            message: "Request successfully logged",
            status: true,
          },
        ]);
      }
    });
});