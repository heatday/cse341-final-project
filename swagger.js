const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Garden Forum API',
    description: 'An API for accessing a public gardening forum and plant information database.',
  },
  tags: [
    {
      name: 'Forums',
      description: 'A suite of APIs for accessing and managing forum threads.',
    },
    {
      name: 'Plant Information',
      description: 'A suite of APIs for accessing and managing plant information.',
    },
    {
      name: 'Users',
      description: 'A suite of APIs for managing user accounts and viewing public user information.',
    }
  ],
  securityDefinitions: {
    oAuth: {
      type: 'oauth2',
      description: 'The authorization method used by this backend runs on Auth0.',
      authorizationUrl: 'https://cse341-final-project-26gf.onrender.com/login',
      flow: 'authorizationCode'
    }
  },
  host: 'cse341-final-project-26gf.onrender.com',
  schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

// Run server after it gets generated
// swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
//   await import('./index.js');
// });