const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  paper: { type: mongoose.Schema.Types.ObjectId, ref: 'Paper', required: true },
  user: { type: String }, // can be user ID or username depending on your auth
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const CommentModel = mongoose.model('Comment', commentSchema);
module.exports = CommentModel;