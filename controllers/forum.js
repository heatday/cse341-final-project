const { response } = require('express');
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId; 

const getAll = async (req, res) => {
    /*  #swagger.description = 'Returns all forum posts from the database.'
        #swagger.tags = ['Forums']
    */
    throw {name : "NotImplementedException"}; 
};

const getOne = async (req, res) => {
  /*  #swagger.description = 'Returns one forum thread from the database.'
      #swagger.tags = ['Forums']
      #swagger.parameters['forumId'] = {
        description: 'The forum ID for the database to retrieve',
        required: 'true',
        type: 'string'
  }
  */
  throw {name : "NotImplementedException"}; 
}

const postForum = async (req, res) => {
  /*  #swagger.description = 'Posts a new forum thread in the database.'
      #swagger.tags = ['Forums']
      #swagger.security = [{ "oAuth": [] }]
      #swagger.parameters['obj'] = {
        in: 'body',
        description: 'The new forum thread to add to the database.',
        schema: {
          $title: 'Forum Name',
          $category: 'Forum Category',
          $desc: 'A lengthy forum post.',
          $comments: []
        }
      }
  }*/
  throw {name : "NotImplementedException"}; 
}

const getCommentFromThread = async (req, res) => {
    /*  #swagger.description = 'Returns one forum thread from the database.'
        #swagger.tags = ['Forums']
        #swagger.parameters['forumId'] = {
          description: 'The forum ID for the database to retrieve',
          required: 'true',
          type: 'string'
        }
        #swagger.parameters['commentId'] = {
          description: 'The comment ID for the database to retrieve',
          required: 'true',
          type: 'string'
        }
    */
    throw {name : "NotImplementedException"}; 
}

const postCommentOnForum = async (req, res) => {
    /*  #swagger.description = 'Posts a comment in a forum thread in the database.'
        #swagger.tags = ['Forums']
        #swagger.security = [{ "oAuth": [] }]
        #swagger.parameters['forumId'] = {
          description: 'The forum ID to add the comment to.',
          required: 'true',
          type: 'string'
        }
        #swagger.parameters['obj'] = {
          in: 'body',
          description: 'The new comment to add to the forum thread.',
          schema: {
            $comment: 'A lengthy comment.',
          }
        }
    }*/
    throw {name : "NotImplementedException"}; 
}

const editCommentOnForum = async (req, res) => {
    /*  #swagger.description = 'Posts a comment in a forum thread in the database.'
        #swagger.tags = ['Forums']
        #swagger.security = [{ "oAuth": [] }]
        #swagger.parameters['forumId'] = {
          description: 'The forum ID the comment is part of.',
          required: 'true',
          type: 'string'
        }
        #swagger.parameters['commentId'] = {
          description: 'The comment ID for the database to edit.',
          required: 'true',
          type: 'string'
        }
        #swagger.parameters['obj'] = {
          in: 'body',
          description: 'The edited comment to update the forum thread.',
          schema: {
            $comment: 'An updated lengthy comment.',
          }
        }
    }*/
    throw {name : "NotImplementedException"}; 
}

const deleteCommentOnForum = async (req, res) => {
    /*  #swagger.description = 'Deletes a comment from a forum thread.'
        #swagger.tags = ['Forums']
        #swagger.security = [{ "oAuth": [] }]
        #swagger.parameters['forumId'] = {
          description: 'The forum ID the offending comment is part of.',
          required: 'true',
          type: 'string'
        }
        #swagger.parameters['commentId'] = {
          description: 'The comment ID for the database to delete.',
          required: 'true',
          type: 'string'
        }
    */
    throw {name : "NotImplementedException"}; 
}

const updateForum = async (req, res) => {
  /*  #swagger.description = 'Updates a forum post in the database.'
      #swagger.tags = ['Forums']
      #swagger.security = [{ "oAuth": [] }]
      #swagger.parameters['forumId'] = {
        description: 'The forum post ID for the database to update.',
        required: 'true',
        type: 'string'
      }
      #swagger.parameters['obj'] = {
        in: 'body',
        description: 'The new forum thread to add to the database.',
        schema: {
          $title: 'Forum Name',
          $category: 'Forum Category',
          $desc: 'A lengthy forum post.',
        }
      }
  }*/
  throw {name : "NotImplementedException"}; 
}

const deleteForum = async (req, res) => {
  /*  #swagger.description = 'Deletes a forum thread from the database.'
      #swagger.tags = ['Forums']
      #swagger.security = [{ "oAuth": [] }]
      #swagger.parameters['forumId'] = {
        description: 'The forum thread ID for the database to delete.',
        required: 'true',
        type: 'string'
      }
  */
  throw {name : "NotImplementedException"}; 
}

module.exports = {getAll, getOne, postForum, getCommentFromThread, postCommentOnForum, editCommentOnForum, 
    deleteCommentOnForum, updateForum, deleteForum};