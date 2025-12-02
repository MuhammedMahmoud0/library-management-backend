const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../middlewares/authMiddleware");
const fines = require("../controllers/finesController");

router.use(authenticate);

// Admin: list all fines with pagination and optional status filter
router.get("/", authorize(["admin"]), fines.listFines);

// Statistics (admin) - MUST be before /:id to avoid matching "statistics" as an id
router.get("/statistics", authorize(["admin"]), fines.finesStatistics);

// User: list own fines
router.get("/my", fines.myFines);

// Get fine details
router.get("/:id", fines.getFine);

// Pay a fine (user or admin)
router.post("/:id/pay", fines.payFine);

// Waive a fine (admin only)
router.post("/:id/waive", authorize(["admin"]), fines.waiveFine);

module.exports = router;
