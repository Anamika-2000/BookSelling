const Book = require('../models/product')

const createBook = async (req, res) => {
  try {
    const bookData = req.body;
    const newBook = await Book.create(bookData);
    res.status(201).send({ message: 'Book created successfully', data: newBook });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};


const getAllBooks = async (req, res) => {
	try {
	  const books = await Book.find();
	  res.send({ message: 'Books fetched successfully', data: books });
	} catch (error) {
	  res.status(500).send({ message: error.message });
	}
  };


  const getBookById = async (req, res) => {
	try {
	  const { id } = req.body;
	  const book = await Book.findById(id);
	  if (!book) {
		return res.status(404).send({ message: 'Book not found' });
	  }
	  res.send({ message: 'Book fetched successfully', data: book });
	} catch (error) {
	  res.status(500).send({ message: error.message });
	}
  };

  const updateBook = async (req, res) => {
	try {
	  const id  = req.headers.id;
	  const updatedData = req.body;
	  const book = await Book.findByIdAndUpdate(id, updatedData, { new: true });
	  if (!book) {
		return res.status(404).send({ message: 'Book not found' });
	  }
	  res.send({ message: 'Book updated successfully', data: book });
	} catch (error) {
	  res.status(500).send({ message: error.message });
	}
  };

  const deleteBook = async (req, res) => {
	try {
	  const  id  = req.headers.id;
	  const book = await Book.findByIdAndDelete(id);
	  if (!book) {
		return res.status(404).send({ message: 'Book not found' });
	  }
	  res.send({ message: 'Book deleted successfully' });
	} catch (error) {
	  res.status(500).send({ message: error.message });
	}
  };

  const searchBooks = async (req, res) => {
	try {
	  const { keyword } = req.query;
	  const books = await Book.find({ $or: [{ title: { $regex: keyword, $options: 'i' } }, { description: { $regex: keyword, $options: 'i' } }] });
	  res.send({ message: 'Books found', data: books });
	} catch (error) {
	  res.status(500).send({ message: error.message });
	}
  };
  

  module.exports = {
	createBook,
	getAllBooks,
	getBookById,
	updateBook,
	deleteBook,
	searchBooks
  };
  