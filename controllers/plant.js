const { response } = require('express');
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId; 

const getAll = async (req, res) => {
    /*  #swagger.description = 'Returns all plant descriptions from the database.'
        #swagger.tags = ['Plant Information']
    */
   const result = await mongodb.getDb().db().collection('plant').find();
   result.toArray().then((lists) => {
     res.setHeader('Content-Type', 'application/json');
     res.status(200).json(lists);
   });
};

const getOne = async (req, res) => {
  /*  #swagger.description = 'Returns one plant description from the database.'
      #swagger.tags = ['Plant Information']
      #swagger.parameters['plantId'] = {
        description: 'The plant ID for the database to retrieve.',
        required: 'true',
        type: 'string'
      }
  */
  throw {name : "NotImplementedException"}; 
}

const uploadPlant = async (req, res) => {
  /*  #swagger.description = 'Stores a plant description in the database.'
      #swagger.tags = ['Plant Information']
      #swagger.security = [{ "oAuth": [] }]
      #swagger.parameters['obj'] = {
        in: 'body',
        description: 'The plant description to add to the database.',
        schema: {
          $name: 'Plant Name',
          $category: 'Plant Category',
          $description: 'A lengthy description.',
          tips: ['tip 1', 'tip 2'],
          optimalSpacing: 200,
          optimalDirt: 'Dirt properties and conditions',
          avgGrowHeight: 10
        }
      }
  */
  throw {name : "NotImplementedException"}; 
}

const updatePlant = async (req, res) => {
  /*  #swagger.description = 'Updates a plant description in the database.'
      #swagger.tags = ['Plant Information']
      #swagger.security = [{ "oAuth": [] }]
      #swagger.parameters['plantId'] = {
        description: 'The plant description ID for the database to update.',
        required: 'true',
        type: 'string'
      }
      #swagger.parameters['obj'] = {
        in: 'body',
        description: 'The updated plant description.',
        schema: {
          $name: 'Plant Name',
          $category: 'Plant Category',
          $description: 'A lengthy description.',
          tips: ['tip 1', 'tip 2'],
          optimalSpacing: 200,
          optimalDirt: 'Dirt properties and conditions',
          avgGrowHeight: 10
        }
      }
  */
  throw {name : "NotImplementedException"}; 
}

const deletePlant = async (req, res) => {
  /*  #swagger.description = 'Deletes a plant description from the database.'
      #swagger.tags = ['Plant Information']
      #swagger.security = [{ "oAuth": [] }]
      #swagger.parameters['plantId'] = {
        description: 'The plant description ID for the database to delete.',
        required: 'true',
        type: 'string'
      }
  */
  throw {name : "NotImplementedException"}; 
}

module.exports = {getAll, getOne, uploadPlant, updatePlant, deletePlant};