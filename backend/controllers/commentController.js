const Comment = require('../models/comment');
const Paper = require('../models/paper');

// POST /papers/:id/comments - Add a comment to a paper
exports.addComment = async (req, res) => {
  try {
    const { user, comment } = req.body;
    const paperId = req.params.id;

    // Optional: check if the paper exists
    const paper = await Paper.findById(paperId);
    if (!paper) return res.status(404).json({ message: 'Paper not found' });

    const newComment = new Comment({ paper: paperId, user, comment });
    const savedComment = await newComment.save();

    res.status(201).json(savedComment);
  } catch (error) {
    res.status(400).json({ message: 'Error adding comment', error });
  }
};

// GET /papers/:id/comments - Get all comments for a paper
exports.getCommentsForPaper = async (req, res) => {
  try {
    const comments = await Comment.find({ paper: req.params.id }).sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments', error });
  }
};
