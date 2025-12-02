const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../middlewares/authMiddleware");
const invoices = require("../controllers/invoicesController");

router.use(authenticate);

router.get("/", invoices.listInvoices); // admin or customer (their invoices)
router.get("/:id", invoices.getInvoice);
router.post("/", authorize(["admin"]), invoices.createInvoice);
router.post("/:id/pay", invoices.payInvoice);

module.exports = router;
