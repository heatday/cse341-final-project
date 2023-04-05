const app = require('../app')
const { expect } = require('@jest/globals');
var request = require('request');

//test for the user 

describe('Test Handlers', () => {
    test('responds to /', async () => {
        const res = await request.get('/');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200)
    })

    test('responds to /user', async () => {
        const res = await request.get('/user');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200)
    })
})

describe('Test Handlers', () => {
    test('responds to post /user', async () => {
        const res = await request.post('/user').send(      {
            sub: "some test",
            username: "Tgenius",
            bio: "some just test"
           
        });
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(201)
        
    })

    
})

describe('Test Handlers', () => {
    test('responds to put /user', async () => {
        const res = await request.put('/user').send(    {
            account: "name of the account",
            username: "newgenius"
        });
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(204)
    })

    
})

describe('Test Handlers', () => {
    test('responds to /', async () => {
        const res = await request.delete('/');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200)
    })

    test('responds to /user', async () => {
        const res = await request.delete('/user');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200)
    })
})

