const express = require("express");
const router = express.Router();
const {
    borrowingsHistory,
    reservationsHistory,
} = require("../controllers/historyController");
const { authenticate } = require("../middlewares/authMiddleware");

router.get("/borrowings", authenticate, borrowingsHistory);
router.get("/reservations", authenticate, reservationsHistory);

module.exports = router;
