const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const auth = require('./middlewares/auth');
const role = require('./middlewares/role');

const paperController = require('./controllers/paper.Controller');
const userController = require('./controllers/user.Controller');
const categoryController = require('./controllers/category.Controller');
const commentController = require('./controllers/comment.Controller');
const { uploadFileToDropbox } = require('./controllers/file.Controller');

// Paper Routes (authenticated users can create/update, only admins can delete)
router.get('/papers', paperController.getPapersByCategory);
router.get('/papers/:id', paperController.getPaperById);
router.post('/papers', auth, role(['admin', 'editor']), paperController.createPaper);
router.put('/papers/:id', auth, role(['admin', 'editor']), paperController.updatePaper);
router.patch('/papers/:id', auth, role(['admin', 'editor']), paperController.partialUpdatePaper);
router.delete('/papers/:id', auth, role('admin'), paperController.deletePaper);

// Search and Filters
router.get('/papers/search', paperController.searchPapers);
router.get('/papers/category/:categoryName', paperController.getPapersByCategory);
router.get('/papers/recent', paperController.getRecentPapers);
router.get('/papers/popular', paperController.getPopularPapers);
router.post('/papers/:id/download', auth, paperController.downloadPaper);

// Categories (only admin can create)
router.get('/categories', categoryController.getAllCategories);
router.post('/categories', auth, role('admin'), categoryController.createCategory);

// Comments (any authenticated user)
router.post('/papers/:id/comments', auth, role(['user', 'editor', 'admin']), commentController.addComment);
router.get('/papers/:id/comments', commentController.getCommentsForPaper);

// User Auth Routes
router.post('/users/register', userController.registerUser);
router.post('/users/login', userController.loginUser);
router.put('/users/updateUser', auth, userController.updateUser);

// Dropbox Upload (admin only)
router.post('/upload', auth, role('admin'), upload.single('file'), uploadFileToDropbox);

module.exports = router;
