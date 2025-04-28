const Category = require('../models/category');
const Paper = require('../models/paper');

// GET /categories - Fetch all categories with optional paper details
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate('papers', 'title authors');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error });
  }
};

// POST /categories - Create a new category
exports.createCategory = async (req, res) => {
  try {
    console.log("entered")
    const { name, paperIds } = req.body;

    const newCategory = new Category({
      name,
      papers: paperIds || []
    });

    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(400).json({ message: 'Error creating category', error });
  }
};

// PATCH /categories/:id/add-paper
exports.addPaperToCategory = async (req, res) => {
    try {
      const { paperId } = req.body;
      const category = await Category.findByIdAndUpdate(
        req.params.id,
        { $addToSet: { papers: paperId } }, // prevents duplicates
        { new: true }
      );
      if (!category) return res.status(404).json({ message: 'Category not found' });
      res.json(category);
    } catch (error) {
      res.status(400).json({ message: 'Error adding paper to category', error });
    }
  };

