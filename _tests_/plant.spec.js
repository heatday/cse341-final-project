const app = require('../app')
const { expect } = require('@jest/globals');

//Tes for the controller plant

describe('Test Handlers', () => {
    test('responds to /', async () => {
        const res = await request.get('/');
        expect(res.headers).toBe('application/json;');
        expect(res.statusCode).toBe(200)
    })

    test('responds to /plant', async () => {
        const res = await request.get('/plant');
        expect(res.headers).toBe('application/json;');
        expect(res.statusCode).toBe(200)
    })
})

describe('Test Handlers', () => {
    test('responds to post /plant', async () => {
        const res = await request.post('/plant').send(    {
            NamePlant: "Plectranthus verticillatus or money plant ",
            Description: "The genus Petunia, also commonly called petunia, comprises 23 species belonging to the Solanaceae family native to South America.",
            type_of_tree: "non vascular plants",
            gender_of_tree: "Lamiaceae",
        });
        expect(res.headers).toBe('application/json;');
        expect(res.statusCode).toBe(201)
    })

    
})

describe('Test Handlers', () => {
    test('responds to put /plant', async () => {
        const res = await request.put('/plant').send(    {
            NamePlant: "Petunias",
            Description: "The genus Petunia, also commonly called petunia, comprises 23 species belonging to the Solanaceae family native to South America.",
            type_of_tree: "non vascular plants",
            gender_of_tree: "Solanáceas",
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

    test('responds to /plant', async () => {
        const res = await request.delete('/plant');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200)
    })
})

