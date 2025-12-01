const express = require("express");
const router = express.Router();
const {
    listMembers,
    getMember,
    updateMember,
    deleteMember,
} = require("../controllers/membersController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");

router.get("/", authenticate, authorize("admin"), listMembers);
router.get("/:id", authenticate, authorize("admin"), getMember);
router.put("/:id", authenticate, authorize("admin"), updateMember);
router.delete("/:id", authenticate, authorize("admin"), deleteMember);

module.exports = router;
