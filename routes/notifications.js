const express = require("express");
const router = express.Router();
const {
    listNotifications,
    markRead,
    markReadAll,
    deleteNotification,
} = require("../controllers/notificationsController");
const { authenticate } = require("../middlewares/authMiddleware");

router.get("/", authenticate, listNotifications);
router.put("/:id/read", authenticate, markRead);
router.put("/read-all", authenticate, markReadAll);
router.delete("/:id", authenticate, deleteNotification);

module.exports = router;
