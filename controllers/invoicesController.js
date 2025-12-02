const pool = require("../db/connection");

async function listInvoices(req, res) {
    const user = req.user;
    try {
        if (!user) return res.status(401).json({ error: "not authenticated" });
        // admins can list all invoices
        if (user.role === "admin") {
            const [rows] = await pool.query(
                "SELECT * FROM Invoice ORDER BY InvoiceID DESC"
            );
            return res.json({ invoices: rows });
        }
        // customers only their invoices (via Borrowing -> BorrowID relation)
        const [rows] = await pool.execute(
            `SELECT i.* FROM Invoice i
             JOIN Borrowing b ON i.BorrowID = b.BorrowID
             WHERE b.CusID = ?
             ORDER BY i.InvoiceID DESC`,
            [user.userId]
        );
        res.json({ invoices: rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "internal server error" });
    }
}

async function getInvoice(req, res) {
    const id = parseInt(req.params.id, 10);
    if (!id) return res.status(400).json({ error: "invalid id" });
    const user = req.user;
    try {
        const [[invoice]] = await pool.query(
            "SELECT * FROM Invoice WHERE InvoiceID = ?",
            [id]
        );
        if (!invoice) return res.status(404).json({ error: "not found" });
        if (user.role !== "admin") {
            // verify ownership via Borrowing
            const [[b]] = await pool.query(
                "SELECT CusID FROM Borrowing WHERE BorrowID = ?",
                [invoice.BorrowID]
            );
            if (!b || b.CusID !== user.userId)
                return res.status(403).json({ error: "forbidden" });
        }
        res.json({ invoice });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "internal server error" });
    }
}

// Create invoice (admin or system). Expects { BorrowID, Amount, Fine (optional), PaymentDate (optional), Status (optional) }
async function createInvoice(req, res) {
    const user = req.user;
    if (!user) return res.status(401).json({ error: "not authenticated" });
    // Only admin or system processes should create invoices via API
    if (user.role !== "admin")
        return res.status(403).json({ error: "forbidden" });
    const { BorrowID, Amount, Fine, PaymentDate, Status } = req.body;
    if (!BorrowID || !Amount)
        return res.status(400).json({ error: "BorrowID and Amount required" });
    try {
        const [result] = await pool.execute(
            "INSERT INTO Invoice (BorrowID, Amount, Fine, PaymentDate, Status) VALUES (?, ?, ?, ?, ?)",
            [
                BorrowID,
                Amount,
                Fine || 0,
                PaymentDate || null,
                Status || "unpaid",
            ]
        );
        res.status(201).json({ invoiceId: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "internal server error" });
    }
}

// Mark invoice as paid (simulate payment). Expects { PaymentDate (optional) }
async function payInvoice(req, res) {
    const id = parseInt(req.params.id, 10);
    if (!id) return res.status(400).json({ error: "invalid id" });
    const user = req.user;
    if (!user) return res.status(401).json({ error: "not authenticated" });
    try {
        const [[invoice]] = await pool.query(
            "SELECT * FROM Invoice WHERE InvoiceID = ?",
            [id]
        );
        if (!invoice) return res.status(404).json({ error: "not found" });
        if (user.role !== "admin") {
            const [[b]] = await pool.query(
                "SELECT CusID FROM Borrowing WHERE BorrowID = ?",
                [invoice.BorrowID]
            );
            if (!b || b.CusID !== user.userId)
                return res.status(403).json({ error: "forbidden" });
        }
        const paymentDate =
            req.body.PaymentDate || new Date().toISOString().slice(0, 10);
        const [result] = await pool.execute(
            "UPDATE Invoice SET PaymentDate = ?, Status = ? WHERE InvoiceID = ?",
            [paymentDate, "paid", id]
        );
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "internal server error" });
    }
}

module.exports = { listInvoices, getInvoice, createInvoice, payInvoice };
