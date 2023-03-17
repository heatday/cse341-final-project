// const { response } = require('express');
// const mongodb = require('../db/connect');
// const ObjectId = require('mongodb').ObjectId; 
const forum = require('../models/forum')

const getAll = async (req, res) => {
  /*  #swagger.description = 'Returns all forum posts from the database.'
      #swagger.tags = ['Forums']
  */
  try {
    const result = await forum.find();
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({message: err.message});
    }
};

const getOne = async (req, res) => {
  /*  #swagger.description = 'Returns one forum thread from the database.'
      #swagger.tags = ['Forums']
  */
  try {
    const curr_forum = await forum.findById(req.params.forumId);
    if (!curr_forum) {
      res.status(404).json({message: "Forum not found."});
      return;
    }
    res.status(200).json(curr_forum);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
}

const postForum = async (req, res) => {
  /*  #swagger.description = 'Posts a new forum thread in the database.'
      #swagger.tags = ['Forums']
  */
  try {
    if ( !req.body.Title || !req.body.Author ) {
      res.status(400).send({ message: 'Error: content is required.' });
      return;
    }
    let timestamp = Date().toLocaleString();
    req.body.Date = timestamp;

    const newforum = new forum(req.body);
    newforum.save().then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).json({message: err.message || 'An error occured.'});
    });
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};

const getCommentFromThread = async (req, res) => {
  /*  #swagger.description = 'Returns one forum thread from the database.'
      #swagger.tags = ['Forums']
  */
  try {
    const curr_forum = await forum.findById(req.params.forumId);
    const curr_comment = curr_forum.find({"comment.Id": req.params.commentId})
    if (!curr_comment) {
      res.status(404).json({message: "Comment does not exist."});
      return;
    }
    res.status(200).json(curr_comment);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
}

const postCommentOnForum = async (req, res) => {
  /*  #swagger.description = 'Posts a comment in a forum thread in the database.'
      #swagger.tags = ['Forums']
  }*/
  try {
    if ( !req.body.Content || !req.body.Author ) {
      res.status(400).send({ message: 'Error: content is required.' });
      return;
    }
    let timestamp = Date().toLocaleString();

    const new_comment = {
      Content: req.body.Content,
      Author: req.body.Author,
      Date: timestamp
    }

    forum.update(
      { _id: req.body.forumId }, 
      { $push: { Comments: new_comment } },
      done
    ).then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).json({message: err.message || 'An error occured.'});
    });
  } catch (err) {
    res.status(500).json({message: err.message});
  }
}

const editCommentOnForum = async (req, res) => {
  /*  #swagger.description = 'Posts a comment in a forum thread in the database.'
      #swagger.tags = ['Forums']
  }*/
  try {
    if ( !req.body.Content ) {
      res.status(400).send({ message: 'Error: content is required.' });
      return;
    }

    forum.update(
      { _id: req.body.forumId, "comments.Id": req.body.commentId },
      { $set: { "Content": req.body.Content } },
      done
    ).then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).json({message: err.message || 'An error occured.'});
    });
  } catch (err) {
    res.status(500).json({message: err.message});
  }
}

const deleteCommentOnForum = async (req, res) => {
  /*  #swagger.description = 'Deletes a comment from a forum thread.'
      #swagger.tags = ['Forums']
  */
  try {
    if ( !req.body.Content || !req.body.Author ) {
      res.status(400).send({ message: 'Error: content is required.' });
      return;
    }

    forum.update(
      { _id: req.body.forumId },
      { $pull: req.body.commentId },
      done
    ).then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).json({message: err.message || 'An error occured.'});
    });
  } catch (err) {
    res.status(500).json({message: err.message});
  }
}

const updateForum = async (req, res) => {
  /*  #swagger.description = 'Updates a forum post in the database.'
      #swagger.tags = ['Forums']
  }*/
  try {
    if ( !req.body.Content ) {
      res.status(400).send({ message: 'Error: content is required.' });
      return;
    }
    let timestamp = Date().toLocaleString();

    forum.update(
      { _id: req.body.forumId },
      { $set: {
        "Title": req.body.Title,
        "Content": req.body.Content,
        "Date": timestamp
      } },
      done
    ).then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).json({message: err.message || 'An error occured.'});
    });
  } catch (err) {
    res.status(500).json({message: err.message});
  }
}

const deleteForum = async (req, res) => {
  /*  #swagger.description = 'Deletes a forum thread from the database.'
      #swagger.tags = ['Forums']
  */
  try {
    const curr_forum = await forum.findById(req.params.forumId);
    if (!curr_forum) {
      res.status(404).json({message: "Forum does not exist."});
      return;
    }
    curr_forum.remove();
    res.status(200).json({message: "Successfully deleted."});
  } catch (err) {
    res.status(500).json({message: err.message});
  }
}

module.exports = {getAll, getOne, postForum,
  getCommentFromThread, postCommentOnForum,
  editCommentOnForum, deleteCommentOnForum,
  updateForum, deleteForum};