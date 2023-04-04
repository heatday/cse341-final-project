var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const mongodb = require('./db/connect');

var users = require('./routes/plant');
const plant = require('./models/plant');

var app = express();

mongodb.initDb((err) => {
    if (err) {
      console.log(err);
    } 
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

app.use('/', plant);

module.exports = app;