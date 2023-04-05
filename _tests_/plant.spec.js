const app = require('../app')
const { expect } = require('@jest/globals');
var request = require('request');

//Tes for the controller plant

describe('Test Handlers', () => {
    test('responds to /', async () => {
        const res = await request.get('https://cse341-final-project-26gf.onrender.com/plants');
        console.log(res.statusCode);
        console.log(res.headers);
        console.log(res.body);
        expect(res).toBeDefined();
        expect(res.statusCode).toBe(200);
        expect(res.headers['content-type']).toBe('application/json; charset=utf-8');
    })
})     


test('responds to /plant', async () => {
    const res = await request.get('https://cse341-final-project-26gf.onrender.com/plants');
    expect(res.statusCode).toBe(200);
    expect(res.headers).toBeDefined();
    expect(res.headers['content-type']).toBe('application/json; charset=utf-8');
})


describe('Test Handlers', () => {
    test('responds to post /plant', async () => {
        const res = await request.post({
            url: 'https://cse341-final-project-26gf.onrender.com/plants',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                NamePlant: "Plectranthus verticillatus or money plant ",
                Description: "The genus Petunia, also commonly called petunia, comprises 23 species belonging to the Solanaceae family native to South America.",
                type_of_tree: "non vascular plants",
                gender_of_tree: "Lamiaceae",
            })
        });
        expect(res.headers['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(201)
    })
})





describe('Test Handlers', () => {
    test('responds to /plants', async () => {
      const res = await request.get('https://cse341-final-project-26gf.onrender.com/plants');
      expect(res.headers['content-type']).toBe('application/json');
      expect(res.statusCode).toBe(200);
    });
  
    test('responds to post /plant', async () => {
      const res = await request.post({
        url: 'https://cse341-final-project-26gf.onrender.com/plants',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          NamePlant: 'Plectranthus verticillatus or money plant',
          Description:
            'The genus Petunia, also commonly called petunia, comprises 23 species belonging to the Solanaceae family native to South America.',
          type_of_tree: 'non vascular plants',
          gender_of_tree: 'Lamiaceae',
        }),
      });
      expect(res.headers['content-type']).toBe('application/json');
      expect(res.statusCode).toBe(201);
    });
  
    test('responds to put /plant', async () => {
      const options = {
        url: 'https://cse341-final-project-26gf.onrender.com/plants',
        method: 'PUT',
        json: {
          NamePlant: 'Petunias',
          Description:
            'The genus Petunia, also commonly called petunia, comprises 23 species belonging to the Solanaceae family native to South America.',
          type_of_tree: 'non vascular plants',
          gender_of_tree: 'Solanáceas',
        },
      };
      const res = await request(options);
      expect(res.headers['content-type']).toBe('application/json');
      expect(res.statusCode).toBe(204);
    });
  });

  

  describe('Test Handlers', () => {
    test('responds to /', async () => {
        const res = await request.delete('https://cse341-final-project-26gf.onrender.com/plants');
        expect(res.headers['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200)
    })

    test('responds to /plant', async () => {
        const res = await request.delete('https://cse341-final-project-26gf.onrender.com/plants');
        expect(res.headers['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200)
    })
})


