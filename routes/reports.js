const express = require("express");
const router = express.Router();
const {
    popularBooks,
    borrowingsReport,
    reservationsReport,
    overdueBooks,
    memberActivity,
} = require("../controllers/reportsController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");

router.get("/popular-books", authenticate, authorize("admin"), popularBooks);
router.get("/borrowings", authenticate, authorize("admin"), borrowingsReport);
router.get(
    "/reservations",
    authenticate,
    authorize("admin"),
    reservationsReport
);
router.get("/overdue-books", authenticate, authorize("admin"), overdueBooks);
// Alias for shorter path
router.get("/overdue", authenticate, authorize("admin"), overdueBooks);
router.get(
    "/member-activity",
    authenticate,
    authorize("admin"),
    memberActivity
);

module.exports = router;
