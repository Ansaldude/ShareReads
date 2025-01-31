const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book")



router.post("/createpost", bookController.addbook)

router.get("/books", bookController.getAllBooks);
router.get('/books/user/:userId', bookController.getBooksByUserId);

module.exports = router