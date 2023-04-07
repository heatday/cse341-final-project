const app = require('../app')
const { expect } = require('@jest/globals');
const appURI = 'https://cse341-final-project-26gf.onrender.com';
const request = require('request');

// Forum GET Route Tests
describe('Forum Get Route Tests', () => {
    test('GET /forum', () => {
        const config = {
            url: `${appURI}/forum`,
        };
        
        request.get(config, (err, res, body) => {
            expect(res.headers['content-type']).toBe('application/json; charset=utf-8');
            expect(res.statusCode).toBe(200);
        });
    });
});

//NOTE: Testing POST, PUT, and DELETE routes this way is not practical, since it would require a logged in user.
