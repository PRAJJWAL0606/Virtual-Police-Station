console.log("Server-side code running");

const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const mongodb = require("mongodb");
const app = express();
const dialogflow = require('dialogflow');
// const { uuid } = require('uuidv4');
const uuid = require('uuid');
// const newUuid = uuid.v1();
// uuid = newUuid;

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


app.get("/policestationmain", (req, res) => {
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


var userid=null;
var policestationid=null;

app.post("/login", (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  var role = req.body.role;

  db.collection("userDetails").find({username:username, password:password, role:role}).toArray((err, result) => {
    if (err){
      res.send(err);
    } 
    else{
      userid = result[0]._id;
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
    image:newfir.type,
    description:newfir.description,
    message:message,
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