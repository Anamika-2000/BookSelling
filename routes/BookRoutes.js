const express = require("express");
const router = express.Router();
const {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
  searchBooks,
} = require("../controllers/BookController");
const { authenticateToken } = require("../middlewares/auth");

router.post("/createBook", authenticateToken, createBook);
router.get("/getAllBooks", authenticateToken, getAllBooks);
router.get("/getBookById", authenticateToken, getBookById);
router.put("/updateBook", authenticateToken, updateBook);
router.delete("/deleteBook", authenticateToken, deleteBook);
router.get("/searchBooks", authenticateToken, searchBooks);

module.exports = router;
