const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const bookSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  date: { type: String, required: true },
  authorImageUrl: { type: String, required: true },
  author: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  rating: { type: Number, default: 0 },
  description: { type: String, required: true },
  reviews: [reviewSchema],
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
