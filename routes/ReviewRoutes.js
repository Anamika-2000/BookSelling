const express = require('express');
const router = express.Router();
const { addReview, getBookWithReviews } = require("../controllers/ReviewController");
const { authenticateToken } = require('../middlewares/auth');

router.post('/addReview', authenticateToken,addReview);
router.get('/getBookWithReviews', authenticateToken,getBookWithReviews);

module.exports = router;
