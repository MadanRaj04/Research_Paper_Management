const mongoose = require('mongoose');

const paperSchema = new mongoose.Schema({
  paperids: {type: String, required: true},
  title: { type: String, required: true },
  authors: [String],
  abstract: String,
  publicationDate: Date,
  fileUrl: String,
  category: String,
  downloadCount: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Paper', paperSchema);
