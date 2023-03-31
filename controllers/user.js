const User = require('../models/user');

const getLoggedInUser = async (req, res) => {
    /*  #swagger.description = 'Returns the logged in user's information.'
        #swagger.tags = ['Users']
        #swagger.security = [{ "oAuth": [] }]
    */
   try{
    User.findOne({sub: req.oidc.sub}, function(err, account){
      if(err) res.status(500).send({message: err.message || 'An error occurred while finding user details.'});
      if(!user){
        res.status(200).send(JSON.stringify(req.oidc.user));
      }
      else{
        const userDetails = req.oidc.user;
        userDetails.username = account.username;
        userDetails.bio = account.bio;
        userDetails.joinDate = account.joinDate;
        res.status(200).send(JSON.stringify(userDetails));
      }
    });
  }
  catch (err){
    res.status(500).json(err);
  }
};

const getPublicUser = async (req, res) => {
  /*  #swagger.description = 'Returns the public information available for a user.'
      #swagger.tags = ['Users']
      #swagger.parameters['username'] = {
        description: 'The public user's ID for the database to retrieve information from.',
        required: 'true',
        type: 'string'
      }
  */
  //NOTE: User Information will also include information from OpenIDConnect when implemented.
      try{
        User.findOne({username: req.params.username}, function(err, account){
          if(err) 
            res.status(500).send({message: err.message || 'An error occurred while finding user details.'});
          if(!account)
            res.status(500).send({message: err.message || 'User not found.'});
          else
            res.status(200).send(JSON.stringify(account));
        });
      }
      catch (err){
        res.status(500).json(err);
      }
}

const createUser = async (req, res) => {
  /*  #swagger.description = 'Creates a user account and stores it in the database. NOTE: Password and name will be authenticated using OpenIDConnect/Auth0. We do NOT store passwords in our database.'
      #swagger.tags = ['Users']
      #swagger.parameters['obj'] = {
        in: 'body',
        description: 'The user account information to add to the database.',
        schema: {
          $username: 'username',
          bio: 'A biography.',
        }
      }
  */
 try{
  const newUser = new User({sub: req.oidc.sub, username: req.body.username, bio: req.body.bio, joinDate: Date.now()});
  newUser.save().then((account) => { console.log(account); })
  .catch((err) => {res.status(500).send(err)});
 }
 catch (err){
  res.status(500).json(err);
 }
}

const updateUser = async (req, res) => {
  /*  #swagger.description = 'Updates the logged in user's information in the database. NOTE: Password and name will be authenticated using OpenIDConnect/Auth0. We do NOT store passwords in our database.'
      #swagger.tags = ['Users']
      #swagger.security = [{ "oAuth": [] }]
      #swagger.parameters['obj'] = {
        in: 'body',
        description: 'The user account information to update in the database.',
        schema: {
          $userName: 'updatedUsername',
          bio: 'An updated biography.',
        }
      }
  */
      User.findOne({sub: req.oidc.sub}, function(err, account){
        if(err) res.status(500).send({message: err.message || 'An error occurred while finding user details.'});
        if(!account){
          res.status(500).send('This user does not exist.');
        }
        else{
          account.bio = req.body.bio;
          account.username = req.body.username;

          account.save().then((dataAccount) => { console.log(dataAccount); })
          .catch((err) => {res.status(500).send('An error ocurred.')});
        }
      });
}

const deleteUser = async (req, res) => {
  /*  #swagger.description = 'Deletes the logged in user from the database.'
      #swagger.tags = ['Users']
      #swagger.security = [{ "oAuth": [] }]
  */
      try {
        User.deleteOne({sub: req.oidc.sub}, function (err, result) {
          if (err) 
            res.status(500).json(err || 'An error occurred while deleting the account.');
          else
            res.status(200).send(result);
        });
      } catch (err) {
        res.status(500).json(err || 'An error occurred while deleting the account.');
      }
}

module.exports = {getLoggedInUser, getPublicUser, createUser, updateUser, deleteUser};