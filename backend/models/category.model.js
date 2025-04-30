const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  papers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Paper' }]
});

const CategoryModel = mongoose.model('Category', categorySchema);
module.exports = CategoryModel;
