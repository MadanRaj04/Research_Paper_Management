const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// Example controller imports (assume these are implemented in controllers folder)
const paperController = require('./controllers/paper.Controller');
const userController = require('./controllers/user.Controller');
const categoryController = require('./controllers/category.Controller');
const commentController = require('./controllers/comment.Controller');
const  {uploadFileToDropbox} = require('./controllers/file.Controller');

// Paper Routes
router.get('/papers', paperController.getPapersByCategory);
router.get('/papers/:id', paperController.getPaperById);
router.post('/papers', paperController.createPaper);
router.put('/papers/:id', paperController.updatePaper);
router.patch('/papers/:id', paperController.partialUpdatePaper);
router.delete('/papers/:id', paperController.deletePaper);

// Extended Paper Features
router.get('/papers/search', paperController.searchPapers);
router.get('/papers/category/:categoryName', paperController.getPapersByCategory);
router.get('/papers/recent', paperController.getRecentPapers);
router.get('/papers/popular', paperController.getPopularPapers);
router.post('/papers/:id/download', paperController.downloadPaper);

// Categories
router.get('/categories', categoryController.getAllCategories);
router.post('/categories', categoryController.createCategory);

// Comments
router.post('/papers/:id/comments', commentController.addComment);
router.get('/papers/:id/comments', commentController.getCommentsForPaper);

// User Authentication
//router.post('/users/register', userController.registerUser);
//router.post('/users/login', userController.loginUser);
//router.get('/users/me', userController.getUserProfile);

// routes/fileRoutes.js


// POST route to upload file to Dropbox

router.post('/upload', upload.single('file'), uploadFileToDropbox);

module.exports = router;


