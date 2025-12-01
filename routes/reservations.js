const express = require("express");
const router = express.Router();
const {
    createReservation,
    myReservations,
    deleteReservation,
    pickupReservation,
    listReservationsAdmin,
} = require("../controllers/reservationsController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");

router.post("/", authenticate, createReservation);
router.get("/my-reservations", authenticate, myReservations);
// Alias for convenience: GET /api/reservations/my
router.get("/my", authenticate, myReservations);
router.delete("/:id", authenticate, deleteReservation);
router.put("/:id/pickup", authenticate, pickupReservation);
router.get("/", authenticate, authorize("admin"), listReservationsAdmin);

module.exports = router;
