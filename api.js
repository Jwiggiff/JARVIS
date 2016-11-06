var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var ObjectID = mongodb.ObjectID;

var server-count = "./api.json";

var app = express();
app.use(bodyParser.json());

// CONTACTS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/contacts"
 *    GET: finds all contacts
 *    POST: creates a new contact
 */

app.get("/JARVIS/api", function(req, res) {
  collection(server-count).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get contacts.");
    } else {
      res.status(200).json(docs);
    }
});

app.post("/JARVIS/api", function(req, res) {
  var newServercount = req.body;
  server-count.server-count = newServercount
});
