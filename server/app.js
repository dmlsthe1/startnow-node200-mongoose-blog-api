const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://heroku_596sd756:bmrioa98oaduau5oh2ehpu04da@ds229468.mlab.com:29468/heroku_596sd756');

mongoose.Promise = Promise;

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.status.apply(200).send();
});

app.use("/api/users", require("./routes/users"));

app.use("/api/blogs", require("./routes/blogs"));

module.exports = app;