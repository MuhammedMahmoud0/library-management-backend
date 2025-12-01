const express = require("express");
const router = express.Router();
const {
    createBorrowing,
    myBorrowings,
    returnBorrowing,
    renewBorrowing,
    listBorrowingsAdmin,
} = require("../controllers/borrowingsController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");

router.post("/", authenticate, createBorrowing);
router.get("/my-borrowings", authenticate, myBorrowings);
// Backwards-compatible alias used by Swagger/examples: GET /api/borrowings/my
router.get("/my", authenticate, myBorrowings);
router.put("/:id/return", authenticate, returnBorrowing);
// Allow POST for clients that send POST instead of PUT (backwards-compat)
router.post("/:id/return", authenticate, returnBorrowing);
router.put("/:id/renew", authenticate, renewBorrowing);
// Backwards-compat: allow POST for clients that use POST instead of PUT
router.post("/:id/renew", authenticate, renewBorrowing);
router.get("/", authenticate, authorize("admin"), listBorrowingsAdmin);

module.exports = router;
