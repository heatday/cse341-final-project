const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({
    sub: {
    type: String,
    required: true,
    //Issues with implementation
    //unique: true
  },
   username: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    //Issues with implementation
    //unique: true
  },
  bio: {
    type: String,
  },
  joinDate: {
    type: Date,
    required: true,
  }
});
  
module.exports = mongoose.model('user', userSchema);