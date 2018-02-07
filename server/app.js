const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/my-blog');
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