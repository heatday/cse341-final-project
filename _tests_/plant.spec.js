const app = require('../app')
const { expect } = require('@jest/globals');
var request = require('request');
const appURI = 'https://cse341-final-project-26gf.onrender.com';

// Plant GET Route Tests
describe('Plants Get Route Tests', () => {
  test('GET /plants', () => {
      const config = {
          url: `${appURI}/plants`,
      };
      
      request.get(config, (err, res, body) => {
          expect(res.headers['content-type']).toBe('application/json; charset=utf-8');
          expect(res.statusCode).toBe(200);
      });
  });

  test('GET Sunflower', () => {
    const config = {
        url: `${appURI}/plants/642f53c9c1f65d0d87eacc3f`,
    };
    
    request.get(config, (err, res, body) => {
        expect(res.headers['content-type']).toBe('application/json; charset=utf-8');
        expect(res.body['NamePlant']).toBe('Sunflower');
        expect(res.statusCode).toBe(200);
    });
});
});
