const app = require('../app')
const { expect } = require('@jest/globals');

//test for the forum 

describe('Test Handlers', () => {
    test('responds to /', async () => {
        const res = await request.get('/');
        expect(res.headers).toBe('application/json;');
        expect(res.statusCode).toBe(200)
    })

    test('responds to /forum', async () => {
        const res = await request.get('/forum');
        expect(res.headers).toBe('application/json;');
        expect(res.statusCode).toBe(200)
    })
})

describe('Test Handlers', () => {
    test('responds to post /forum', async () => {
        const res = await request.post('/forum').send(    {
            title: "just a test",
            content: "anothe piece of test",
            author: "just the bname of the author ",
            comment: "just another comment",
        });
        expect(res.headers).toBe('application/json;');
        expect(res.statusCode).toBe(201)
    })

    
})

describe('Test Handlers', () => {
    test('responds to /', async () => {
        const res = await request.delete('/');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200)
    })

    test('responds to /forum', async () => {
        const res = await request.delete('/forum');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200)
    })
})
