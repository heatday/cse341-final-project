const mongoose = require('mongoose');

const forumSchema = new mongoose.Schema ({
  title: {  type: String, required: true },
  content: { type: String },
  author: { type: String, required: true },
  date: { type: Date, required: true },
  isEdited: {type: Boolean, required: false},
  comments: [{
    id: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    date: { type: Date, required: true },
    isEdited: {type: Boolean, required: false}
  }]
});

module.exports = mongoose.model('forum', forumSchema);
