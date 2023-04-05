var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var request = require('request');
var bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const router = express.Router();


var users = require('./routes/plant');
const plant = require('./models/plant');
const { constants } = require('fs/promises');

var app = express();

mongodb.initDb((err) => {
    if (err) {
      console.log(err);
    } 
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())
// Request URL



request({
  url: 'https://cse341-final-project-26gf.onrender.com/login',
}, (error, response, body) => {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
})

app.use('/', plant);

module.exports = app;
