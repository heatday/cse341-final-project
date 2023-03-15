const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema ({
    NamePlant: {
    type: String,
    required: true,
  },
   Description: {
    type: String,
    required: true,
  },
  Type_of_tree: {
    type: String,
    required: true,
  },
  gender_of_tree: {
    type: String,
    required: true,
  }
});
  
module.exports = mongoose.model('plant', plantSchema);


