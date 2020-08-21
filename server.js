console.log("Server-side code running");

const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const mongodb = require("mongodb");
const app = express();
const PORT = process.env.port || 8080;
app.use(express.static("public"));


var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
let db;
const url =
  "mongodb://ThaparUser:Pass123#@ds035776.mlab.com:35776/virtualpolice";

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