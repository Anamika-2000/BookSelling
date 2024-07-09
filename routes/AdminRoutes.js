const express = require('express');
const router = express.Router();
const { getAllBooks, getAllOrders, getAllUsers } = require('../controllers//AdminController');
const { authenticateToken, isAdmin } = require('../middlewares/auth');

router.get('/books', authenticateToken, isAdmin, getAllBooks);
router.get('/orders', authenticateToken, isAdmin, getAllOrders);
router.get('/users', authenticateToken, isAdmin, getAllUsers);

module.exports = router;
