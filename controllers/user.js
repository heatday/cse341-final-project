const { response } = require('express');
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId; 

const getLoggedInUser = async (req, res) => {
    /*  #swagger.description = 'Returns the logged in user's information.'
        #swagger.tags = ['Users']
        #swagger.security = [{ "oAuth": [] }]
    */
    throw {name : "NotImplementedException"}; 
};

const getPublicUser = async (req, res) => {
  /*  #swagger.description = 'Returns the public information available for a user.'
      #swagger.tags = ['Users']
      #swagger.parameters['userId'] = {
        description: 'The public user's ID for the database to retrieve information from.',
        required: 'true',
        type: 'string'
      }
  */
  throw {name : "NotImplementedException"}; 
}

const createUser = async (req, res) => {
  /*  #swagger.description = 'Creates a user account and stores it in the database. NOTE: Password and name will be authenticated using OpenIDConnect/Auth0. We will NOT store passwords in our database.'
      #swagger.tags = ['Users']
      #swagger.parameters['obj'] = {
        in: 'body',
        description: 'The user account information to add to the database.',
        schema: {
          $forumPosts: [],
          $comments: [],
          $userName: 'username',
          bio: 'A biography.',
          joinDate: 0,
        }
      }
  */
  throw {name : "NotImplementedException"}; 
}

const updateUser = async (req, res) => {
  /*  #swagger.description = 'Updates the logged in user's information in the database. NOTE: Password and name will be authenticated using OpenIDConnect/Auth0. We will NOT store passwords in our database.'
      #swagger.tags = ['Users']
      #swagger.security = [{ "oAuth": [] }]
      #swagger.parameters['obj'] = {
        in: 'body',
        description: 'The user account information to update in the database.',
        schema: {
          $forumPosts: [],
          $comments: [],
          $userName: 'username',
          bio: 'An updated biography.',
        }
      }
  */
  throw {name : "NotImplementedException"}; 
}

const deleteUser = async (req, res) => {
  /*  #swagger.description = 'Deletes the logged in user from the database.'
      #swagger.tags = ['Users']
      #swagger.security = [{ "oAuth": [] }]
  */
  throw {name : "NotImplementedException"}; 
}

module.exports = {getLoggedInUser, getPublicUser, createUser, updateUser, deleteUser};