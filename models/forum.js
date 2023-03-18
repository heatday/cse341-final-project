const mongoose = require('mongoose');

const forumSchema = new mongoose.Schema ({
  Title: {  type: String, required: true },
  Content: { type: String },
  Author: { type: String, required: true },
  Date: { type: Date, required: true },
  Comments: [{
    Id: { type: String, required: true },
    Content: { type: String, required: true },
    Author: { type: String, required: true },
    Date: { type: Date, required: true }
  }]
});

module.exports = mongoose.model('forum', forumSchema);
