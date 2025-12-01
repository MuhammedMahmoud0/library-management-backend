const express = require("express");
const router = express.Router();
const {
    listBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook,
} = require("../controllers/booksController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");

router.get("/", listBooks);
router.get("/:id", getBook);
router.post("/", authenticate, authorize("admin"), createBook);
router.put("/:id", authenticate, authorize("admin"), updateBook);
router.delete("/:id", authenticate, authorize("admin"), deleteBook);

module.exports = router;
