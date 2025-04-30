const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  papers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Paper' }]
});

module.exports = mongoose.model('Category', categorySchema);

