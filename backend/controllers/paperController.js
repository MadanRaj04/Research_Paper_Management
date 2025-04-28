const Paper = require('../models/paper'); // Assuming you have a Mongoose model for Paper

// GET /papers - Fetch all papers
exports.getAllPapers = async (req, res) => {
  try {
    const papers = await Paper.find();
    res.json(papers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching papers', error });
  }
};

// GET /papers/:id - Get a single paper by ID
exports.getPaperById = async (req, res) => {
  try {
    const paper = await Paper.findById(req.params.id);
    if (!paper) return res.status(404).json({ message: 'Paper not found' });
    res.json(paper);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching paper', error });
  }
};

// POST /papers - Create a new paper
exports.createPaper = async (req, res) => {
  try {
    const newPaper = new Paper(req.body);
    const savedPaper = await newPaper.save();
    res.status(201).json(savedPaper);
  } catch (error) {
    res.status(400).json({ message: 'Error creating paper', error });
  }
};

// PUT /papers/:id - Fully update a paper
exports.updatePaper = async (req, res) => {
  try {
    const updatedPaper = await Paper.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedPaper) return res.status(404).json({ message: 'Paper not found' });
    res.json(updatedPaper);
  } catch (error) {
    res.status(400).json({ message: 'Error updating paper', error });
  }
};

// PATCH /papers/:id - Partially update a paper
exports.partialUpdatePaper = async (req, res) => {
  try {
    const updatedPaper = await Paper.findByIdAndUpdate(req.params.id, { $set: req.body }, {
      new: true,
      runValidators: true,
    });
    if (!updatedPaper) return res.status(404).json({ message: 'Paper not found' });
    res.json(updatedPaper);
  } catch (error) {
    res.status(400).json({ message: 'Error updating paper', error });
  }
};

// DELETE /papers/:id - Delete a paper
exports.deletePaper = async (req, res) => {
  try {
    const deletedPaper = await Paper.findByIdAndDelete(req.params.id);
    if (!deletedPaper) return res.status(404).json({ message: 'Paper not found' });
    res.json({ message: 'Paper deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting paper', error });
  }
};

// GET /papers/search?query=term
exports.searchPapers = async (req, res) => {
    try {
      const { query } = req.query;
      const papers = await Paper.find({
        $or: [
          { title: new RegExp(query, 'i') },
          { abstract: new RegExp(query, 'i') },
          { authors: { $elemMatch: { $regex: query, $options: 'i' } } }
        ]
      });
      res.json(papers);
    } catch (error) {
      res.status(500).json({ message: 'Error searching papers', error });
    }
  };
  
  // GET /papers/category/:categoryName
  exports.getPapersByCategory = async (req, res) => {
    try {
      const { categoryName } = req.params;
      const papers = await Paper.find({ category: categoryName });
      res.json(papers);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching category papers', error });
    }
  };
  
  // GET /papers/recent
  exports.getRecentPapers = async (req, res) => {
    try {
      const papers = await Paper.find().sort({ createdAt: -1 }).limit(10);
      res.json(papers);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching recent papers', error });
    }
  };
  
  // GET /papers/popular
  exports.getPopularPapers = async (req, res) => {
    try {
      const papers = await Paper.find().sort({ downloadCount: -1 }).limit(10);
      res.json(papers);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching popular papers', error });
    }
  };
  
  // POST /papers/:id/download
  exports.downloadPaper = async (req, res) => {
    try {
      const paper = await Paper.findById(req.params.id);
      if (!paper) return res.status(404).json({ message: 'Paper not found' });
  
      // Increment download count
      paper.downloadCount = (paper.downloadCount || 0) + 1;
      await paper.save();
  
      // Redirect to file URL or stream file
      res.redirect(paper.fileUrl); // Or stream file if stored locally
    } catch (error) {
      res.status(500).json({ message: 'Error processing download', error });
    }
  };