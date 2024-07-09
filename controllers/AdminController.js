const Book = require('../models/product');
const Order = require('../models/order');
const User = require('../models/user');

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.send({ message: 'Books retrieved successfully', data: books });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('userId', 'firstName lastName email');
    res.send({ message: 'Orders retrieved successfully', data: orders });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.send({ message: 'Users retrieved successfully', data: users });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  getAllBooks,
  getAllOrders,
  getAllUsers
};
