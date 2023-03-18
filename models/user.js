const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({
    sub: {
    type: String,
    required: true,
  },
   username: {
    type: String,
    required: true,
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