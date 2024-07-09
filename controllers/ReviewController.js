const Book = require('../models/product');

const addReview = async (req, res) => {
  try {
    const { bookId, userId, rating, comment } = req.body;

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).send({ message: 'Book not found' });
    }
    const review = { userId, rating, comment };
    book.reviews.push(review);
    const totalReviews = book.reviews.length;
    const totalRating = book.reviews.reduce((acc, review) => acc + review.rating, 0);
    book.rating = totalRating / totalReviews;
    await book.save();
    res.send({ message: 'Review added successfully', data: book });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getBookWithReviews = async (req, res) => {
  try {
    const bookId  = req.body.bookId;
    const book = await Book.findById(bookId).populate('reviews.userId', 'firstName lastName');
    if (!book) {
      return res.status(404).send({ message: 'Book not found' });
    }
    res.send({ message: 'Book retrieved successfully', data: book });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  addReview,
  getBookWithReviews,
};
