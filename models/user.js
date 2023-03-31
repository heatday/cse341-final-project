const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({
    sub: {
    type: String,
    //Commented out for issues with OIDC
    //required: true,
    unique: true
  },
   username: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true
  },
  bio: {
    type: String,
  },
  joinDate: {
    type: Date,
    //Commented out for issues where join date is not in the body
    //required: true,
  }
});
  
module.exports = mongoose.model('user', userSchema);