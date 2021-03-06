const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

var uri = process.env.MONGODB_URI || 'mongodb://heroku_596sd756:bmrioa98oaduau5oh2ehpu04da@ds229468.mlab.com:29468/heroku_596sd756';
mongoose.connect(uri);

mongoose.Promise = Promise;

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.status(200).send("Only /api/blogs or api/users is working right now");
});

app.use("/api/users", require("./routes/users"));

app.use("/api/blogs", require("./routes/blogs"));

module.exports = app;