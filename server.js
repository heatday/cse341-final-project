const dotenv = require("dotenv");
dotenv.config();
require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const port = process.env.PORT || 8080;



app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
  })
  .use('/', require('./routes'))
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));




mongodb.initDb((err,) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(port);
      console.log(`Connected to DB and listening on ${port}`);
    }
  });


//   res.setHeader('Content-Type', 'application/json');//