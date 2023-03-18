const User = require('../models/user');

const getLoggedInUser = async (req, res) => {
    /*  #swagger.description = 'Returns the logged in user's information.'
        #swagger.tags = ['Users']
        #swagger.security = [{ "oAuth": [] }]
    */

   //NOTE: User Information will also include information from OpenIDConnect when implemented.
   //NOTE: Until Auth0 is implemented, this will just retrieve the first user in the collection.
   try{
    User.findOne({}, function(err, account){
      if(err) res.status(500).send({message: err.message || 'An error occurred while finding user details.'});
      if(!user){
        res.status(200).send(JSON.stringify(req.oidc.user));
      }
      else{
        //When updating this to support OAuth, the commented out code may be used to append information from OpenIDConnect.

        //const userDetails = req.oidc.user;
        //userDetails.username = user.username;
        res.status(200).send(JSON.stringify(account));
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
          if(err) res.status(500).send({message: err.message || 'An error occurred while finding user details.'});
          if(!account){
            res.status(200).send(JSON.stringify(req.oidc.user));
          }
          else{
            //When updating this to support OAuth, the commented out code may be used to append information from OpenIDConnect.

            //const userDetails = req.oidc.user;
            //userDetails.username = user.username;
            res.status(200).send(JSON.stringify(account));
          }
        });
      }
      catch (err){
        res.status(500).json(err);
      }
}

const createUser = async (req, res) => {
  /*  #swagger.description = 'Creates a user account and stores it in the database. NOTE: Password and name will be authenticated using OpenIDConnect/Auth0. We will NOT store passwords in our database.'
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
  const fakeSub = generateFakeSub(16);
  const newUser = new User({sub: fakeSub, username: req.body.username, bio: req.body.bio});
  newUser.save().then((account) => { console.log(account); })
  .catch((err) => {res.status(500).send('An error ocurred.')});
}

const updateUser = async (req, res) => {
  /*  #swagger.description = 'Updates the logged in user's information in the database. NOTE: Password and name will be authenticated using OpenIDConnect/Auth0. We will NOT store passwords in our database.'
      #swagger.tags = ['Users']
      #swagger.security = [{ "oAuth": [] }]
      #swagger.parameters['obj'] = {
        in: 'body',
        description: 'The user account information to update in the database.',
        schema: {
          $userName: 'username',
          bio: 'An updated biography.',
        }
      }
  */
      User.findOne({username: req.body.username}, function(err, account){
        if(err) res.status(500).send({message: err.message || 'An error occurred while finding user details.'});
        if(!account){
          res.status(500).send('This user does not exist.');
        }
        else{
          //Store listing in existing account
          account.bio = req.body.bio;
          //Commented out, will use when OIDC is implemented.
          //account.username = req.body.username;
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

  //NOTE: Since OAuth isn't implemented yet, you need to use a URL parameter for now.

      try {
        User.deleteOne({username: req.params.username}, function (err, result) {
          if (err) 
            res.status(500).json(err || 'An error occurred while deleting the account.');
          else
            res.status(200).send(result);
        });
      } catch (err) {
        res.status(500).json(err || 'An error occurred while deleting the account.');
      }
}

function generateFakeSub(length) {
  // Lifted from: https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

module.exports = {getLoggedInUser, getPublicUser, createUser, updateUser, deleteUser};