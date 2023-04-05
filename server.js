const dotenv = require("dotenv");
dotenv.config();
require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const mongoose = require('mongoose');
const { auth, requiresAuth } = require('express-openid-connect');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./graphs');


//oauth configuration
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL
};

app.use(auth(config));

// Message when you are logged in or logged out
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

//graphql part
app.use('/graphql', graphqlHTTP({
  schema,
  pretty: true,
  graphiql: true,
}));

// Check our profile information when logged in
app.get('/myaccount', requiresAuth(), (req, res) => {
  console.log(JSON.stringify(req.oidc.user))
  res.send(JSON.stringify(req.oidc.user));
}) 

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});
const db  = mongoose.connection;
db.on('error', (error ) => console.error(error))
db.once('open', () => console.log('Connected to Database'));

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