const express = require("express");
const router = express.Router();
const {
    userDashboard,
    adminDashboard,
} = require("../controllers/dashboardController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");

router.get("/user", authenticate, userDashboard);
router.get("/admin", authenticate, authorize("admin"), adminDashboard);

module.exports = router;
