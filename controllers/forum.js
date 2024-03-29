const forum = require('../models/forum');

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
      #swagger.parameters['obj'] = {
        in: 'body',
        description: 'The new forum post to add to the database.',
        schema: {
          $title: 'A Title for the Forum',
          $content: 'The forum post text.'
        }
      }
      #swagger.security = [{ "oAuth": [] }]
  */
  try {
    if ( !req.body.title || !req.body.content )
      res.status(400).send({ message: 'Error: content is required.' });

    const newForum = new forum({
      title: req.body.title,
      content: req.body.content,
      author: req.oidc.user.sub,
      date: Date.now(),
      comments: []
    });

    newForum.save().then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).json({message: err.message || 'An error occurred.'});
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
    const curr_comment = await forum.find({_id: req.params.forumId}, {comments: {$elemMatch: {_id: req.params.commentId}}});
    //const curr_forum = await forum.findById(req.params.forumId);
    //const curr_comment = await curr_forum.comments.findById(req.params.commentId);
    if (!curr_comment)
      res.status(404).json({message: "Comment does not exist."});

    res.status(200).json(curr_comment);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
}

const postCommentOnForum = async (req, res) => {
  /*  #swagger.description = 'Posts a comment in a forum thread in the database.'
      #swagger.tags = ['Forums']
      #swagger.parameters['obj'] = {
        in: 'body',
        description: 'The new comment to add to the forum post.',
        schema: {
          $content: 'A new comment on a forum thread.',
        }
      }
      #swagger.security = [{ "oAuth": [] }]
  }*/
  try {
    if (!req.body.content)
      res.status(400).send({ message: 'Error: content is required.' });

    const new_comment = {
      content: req.body.content,
      author: req.oidc.user.sub,
      date: Date.now()
    }

    forum.findById(req.params.forumId, function(err, forumThread){
      forumThread.comments.push(new_comment);
      forumThread.save().then((data) => res.status(201).send(data)).catch((err) => res.status(500).json({message: err.message || 'An error occurred.'}));
    })
  } catch (err) {
    res.status(500).json({message: err.message});
  }
}

const editCommentOnForum = async (req, res) => {
  /*  #swagger.description = 'Edits a comment in a forum thread in the database.'
      #swagger.tags = ['Forums']
      #swagger.parameters['obj'] = {
        in: 'body',
        description: 'The user comment to update in the database.',
        schema: {
          $content: 'An updated comment.',
        }
      }
      #swagger.security = [{ "oAuth": [] }]
  }*/
  try {
    if (!req.body.content)
      res.status(400).send({ message: 'Error: content is required.' });
    forum.findOne({"_id": req.params.forumId, "comments._id": req.params.commentId}, function(err, forumThread){
        if(forumThread.comments[0].author != req.oidc.user.sub)
          res.status(400).send({ message: 'Error: You are not allowed to edit another user\'s comment.' });
        else {
          forumThread.comments[0].content = req.body.content;
          forumThread.comments[0].isEdited = true;
          forumThread.save().then((data) => res.status(201).send(data)).catch((err) => res.status(500).json({message: err.message || 'An error occurred.'}));
        }
      });
  } 
  catch (err) {
    res.status(500).json({message: err.message});
  }
}

const deleteCommentOnForum = async (req, res) => {
  /*  #swagger.description = 'Deletes a comment from a forum thread.'
      #swagger.tags = ['Forums']
      #swagger.security = [{ "oAuth": [] }]
  */
  try {
      forum.findOne({"_id": req.params.forumId, "comments._id": req.params.commentId}, function(err, forumThread){
        if(forumThread.comments[0].author != req.oidc.user.sub)
          res.status(400).send({ message: 'Error: You are not allowed to delete another user\'s comment.' });
        else {
          forumThread.comments.pull(req.params.commentId);
          forumThread.save().then((data) => res.status(201).send(data)).catch((err) => res.status(500).json({message: err.message || 'An error occurred.'}));
        }
      });
  } 
  catch (err) {
    res.status(500).json({message: err.message});
  }
}

const updateForum = async (req, res) => {
  /*  #swagger.description = 'Updates a forum post in the database.'
      #swagger.tags = ['Forums']
      #swagger.parameters['obj'] = {
        in: 'body',
        description: 'The updated forum information.',
        schema: {
          $title: 'An Updated Forum Post Title',
          $content: 'An updated forum post description.',
        }
      }
      #swagger.security = [{ "oAuth": [] }]
  }*/
  try {
    if (!req.body.title || !req.body.content)
      res.status(400).send({ message: 'Error: content or title is required.' });

    forum.findById(req.params.forumId, function(err, forumThread){
      if(forumThread.author != req.oidc.user.sub)
        res.status(400).send({ message: 'Error: You are not allowed to edit another user\'s forum post.' });
      
      forumThread.title = req.body.title,
      forumThread.content = req.body.content
      forumThread.isEdited = true;
      forumThread.save().then((data) => res.status(201).send(data)).catch((err) => res.status(500).json({message: err.message || 'An error occurred.'}));
    })
  } 
  catch (err) {
    res.status(500).json({message: err.message});
  }
}

const deleteForum = async (req, res) => {
  /*  #swagger.description = 'Deletes a forum thread from the database.'
      #swagger.tags = ['Forums']
      #swagger.security = [{ "oAuth": [] }]
  */
  try {
    forum.findById(req.params.forumId, function(err, forumThread){
      if(forumThread.author != req.oidc.user.sub)
        res.status(400).send({ message: 'Error: You are not allowed to delete another user\'s forum post.' });
      
      forumThread.remove();
      forumThread.save().then((data) => res.status(201).send(data)).catch((err) => res.status(500).json({message: err.message || 'An error occurred.'}));
    })
  } catch (err) {
    res.status(500).json({message: err.message});
  }
}

module.exports = {getAll, getOne, postForum,
  getCommentFromThread, postCommentOnForum,
  editCommentOnForum, deleteCommentOnForum,
  updateForum, deleteForum};