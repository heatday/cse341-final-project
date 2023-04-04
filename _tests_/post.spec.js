const app = require('../app')
const { expect } = require('@jest/globals');



describe('Test Handlers', () => {
    test('responds to post /plant', async () => {
        const res = await request.post('/plant').send(    {
            NamePlant: "Plectranthus verticillatus or money plant ",
            Description: "The genus Petunia, also commonly called petunia, comprises 23 species belonging to the Solanaceae family native to South America.",
            type_of_tree: "non vascular plants",
            gender_of_tree: "Lamiaceae",
        });
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(201)
    })

    
})