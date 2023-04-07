const app = require('../app')
const { expect } = require('@jest/globals');
var request = require('request');
const appURI = 'https://cse341-final-project-26gf.onrender.com';

// User GET Route Tests
describe('user Get Route Tests', () => {
    test('GET /user/username', () => {
        const config = {
            url: `${appURI}/user/example11username11`,
        };
        
        request.get(config, (err, res, body) => {
            expect(res.headers['content-type']).toBe('text/html; charset=utf-8');
            expect(res.statusCode).toBe(200);
        });
    });
  
  });
  
  
  //NOTE: Testing POST, PUT, and DELETE routes this way is not practical, since it would require a logged in user.