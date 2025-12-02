const pool = require("../db/connection");

// Helper to calculate days overdue (positive integer) based on DueDate and Payment/ReturnDate
function daysOverdue(dueDate, comparedDate) {
    if (!dueDate) return 0;
    const due = new Date(dueDate);
    const comp = comparedDate ? new Date(comparedDate) : new Date();
    const diff = Math.ceil((comp - due) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
}

async function listFines(req, res) {
    const user = req.user;
    if (!user) return res.status(401).json({ error: "not authenticated" });

    const page = Math.max(1, parseInt(req.query.page || "1", 10));
    const limit = Math.min(
        100,
        Math.max(1, parseInt(req.query.limit || "20", 10))
    );
    const offset = (page - 1) * limit;
    const status = (req.query.status || "all").toLowerCase();

    try {
        let rows, totalRows;
        if (user.role === "admin") {
            // admin can filter by status
            if (status === "paid") {
                [rows] = await pool.query(
                    `SELECT i.* FROM Invoice i WHERE i.Status = 'paid' ORDER BY i.InvoiceID DESC LIMIT ${limit} OFFSET ${offset}`
                );
                const [[{ cnt }]] = await pool.query(
                    "SELECT COUNT(*) as cnt FROM Invoice WHERE Status = 'paid'"
                );
                totalRows = cnt;
            } else if (status === "unpaid") {
                [rows] = await pool.query(
                    `SELECT i.* FROM Invoice i WHERE i.Status IN ('unpaid','pending','Pending') ORDER BY i.InvoiceID DESC LIMIT ${limit} OFFSET ${offset}`
                );
                const [[{ cnt }]] = await pool.query(
                    "SELECT COUNT(*) as cnt FROM Invoice WHERE Status IN ('unpaid','pending','Pending')"
                );
                totalRows = cnt;
            } else {
                [rows] = await pool.query(
                    `SELECT i.* FROM Invoice i ORDER BY i.InvoiceID DESC LIMIT ${limit} OFFSET ${offset}`
                );
                const [[{ cnt }]] = await pool.query(
                    "SELECT COUNT(*) as cnt FROM Invoice"
                );
                totalRows = cnt;
            }
        } else {
            // customers only their fines via Borrowing
            [rows] = await pool.execute(
                `SELECT i.* FROM Invoice i
                 JOIN Borrowing br ON i.BorrowID = br.BorrowID
                 WHERE br.CusID = ?
                 ORDER BY i.InvoiceID DESC
                 LIMIT ${limit} OFFSET ${offset}`,
                [user.userId]
            );
            const [[{ cnt }]] = await pool.execute(
                `SELECT COUNT(*) as cnt FROM Invoice i JOIN Borrowing br ON i.BorrowID = br.BorrowID WHERE br.CusID = ?`,
                [user.userId]
            );
            totalRows = cnt;
        }

        // map rows to include DaysOverdue calculated from Borrowing due date
        const fines = await Promise.all(
            rows.map(async (r) => {
                try {
                    // fetch borrowing due date
                    const [brRows] = await pool.execute(
                        "SELECT DueDate, BookID, CusID FROM Borrowing WHERE BorrowID = ?",
                        [r.BorrowID]
                    );
                    const br = brRows[0] || null;
                    const due = br ? br.DueDate : null;
                    const days = daysOverdue(due, r.PaymentDate);
                    return {
                        FineID: r.InvoiceID,
                        BorrowID: r.BorrowID,
                        UserID: br ? br.CusID : null,
                        BookID: br ? br.BookID : null,
                        Amount: parseFloat(r.Amount) || 0,
                        Reason: r.Fine > 0 ? "Overdue" : "Charge",
                        DaysOverdue: days,
                        Status: r.Status || "unpaid",
                        IssueDate: r.PaymentDate || null,
                        PaidDate: r.PaymentDate || null,
                    };
                } catch (err) {
                    console.error("Error mapping fine row:", err);
                    return {
                        FineID: r.InvoiceID,
                        BorrowID: r.BorrowID,
                        UserID: null,
                        BookID: null,
                        Amount: parseFloat(r.Amount) || 0,
                        Reason: "Charge",
                        DaysOverdue: 0,
                        Status: r.Status || "unpaid",
                        IssueDate: null,
                        PaidDate: r.PaymentDate || null,
                    };
                }
            })
        );

        res.json({ fines, total: totalRows, page, limit });
    } catch (err) {
        console.error("listFines error:", err.message, err.stack);
        res.status(500).json({
            error: "internal server error",
            details: err.message,
        });
    }
}

async function myFines(req, res) {
    // convenience wrapper for listFines but forced to user scope and no pagination
    req.query.page = req.query.page || 1;
    req.query.limit = req.query.limit || 100;
    return listFines(req, res);
}

async function getFine(req, res) {
    const id = parseInt(req.params.id, 10);
    if (!id) return res.status(400).json({ error: "invalid id" });
    const user = req.user;
    if (!user) return res.status(401).json({ error: "not authenticated" });
    try {
        const [[r]] = await pool.query(
            "SELECT * FROM Invoice WHERE InvoiceID = ?",
            [id]
        );
        if (!r) return res.status(404).json({ error: "not found" });
        // ownership check
        if (user.role !== "admin") {
            const [[br]] = await pool.query(
                "SELECT CusID FROM Borrowing WHERE BorrowID = ?",
                [r.BorrowID]
            );
            if (!br || br.CusID !== user.userId)
                return res.status(403).json({ error: "forbidden" });
        }
        const [brRows] = await pool.query(
            "SELECT DueDate, BookID, CusID FROM Borrowing WHERE BorrowID = ?",
            [r.BorrowID]
        );
        const br = brRows[0] || null;
        const days = daysOverdue(br ? br.DueDate : null, r.PaymentDate || null);
        res.json({
            FineID: r.InvoiceID,
            BorrowID: r.BorrowID,
            UserID: br ? br.CusID : null,
            BookID: br ? br.BookID : null,
            Amount: parseFloat(r.Amount) || 0,
            Reason: r.Fine > 0 ? "Overdue" : "Charge",
            DaysOverdue: days,
            Status: r.Status || "unpaid",
            IssueDate: r.PaymentDate || null,
            PaidDate: r.PaymentDate || null,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "internal server error" });
    }
}

async function payFine(req, res) {
    const id = parseInt(req.params.id, 10);
    if (!id) return res.status(400).json({ error: "invalid id" });
    const user = req.user;
    if (!user) return res.status(401).json({ error: "not authenticated" });
    try {
        const [[r]] = await pool.query(
            "SELECT * FROM Invoice WHERE InvoiceID = ?",
            [id]
        );
        if (!r) return res.status(404).json({ error: "not found" });
        if (user.role !== "admin") {
            const [[br]] = await pool.query(
                "SELECT CusID FROM Borrowing WHERE BorrowID = ?",
                [r.BorrowID]
            );
            if (!br || br.CusID !== user.userId)
                return res.status(403).json({ error: "forbidden" });
        }
        const paidDate = new Date().toISOString();
        const [result] = await pool.execute(
            "UPDATE Invoice SET PaymentDate = ?, Status = ? WHERE InvoiceID = ?",
            [paidDate, "paid", id]
        );
        res.json({
            message: "Fine paid successfully",
            fine: { FineID: id, Status: "paid", PaidDate: paidDate },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "internal server error" });
    }
}

async function waiveFine(req, res) {
    const id = parseInt(req.params.id, 10);
    if (!id) return res.status(400).json({ error: "invalid id" });
    const user = req.user;
    if (!user) return res.status(401).json({ error: "not authenticated" });
    if (user.role !== "admin")
        return res.status(403).json({ error: "forbidden" });
    try {
        const [[r]] = await pool.query(
            "SELECT * FROM Invoice WHERE InvoiceID = ?",
            [id]
        );
        if (!r) return res.status(404).json({ error: "not found" });
        const waivedDate = new Date().toISOString();
        const reason = req.body.reason || null;
        const [result] = await pool.execute(
            "UPDATE Invoice SET Status = ? WHERE InvoiceID = ?",
            ["waived", id]
        );
        res.json({
            message: "Fine waived successfully",
            fine: { FineID: id, Status: "waived" },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "internal server error" });
    }
}

async function finesStatistics(req, res) {
    const user = req.user;
    if (!user) return res.status(401).json({ error: "not authenticated" });
    if (user.role !== "admin")
        return res.status(403).json({ error: "forbidden" });
    try {
        const [[{ totalFines }]] = await pool.query(
            "SELECT COUNT(*) as totalFines FROM Invoice"
        );
        const [[{ totalPaid }]] = await pool.query(
            "SELECT COUNT(*) as totalPaid FROM Invoice WHERE Status = 'paid'"
        );
        const [[{ totalUnpaid }]] = await pool.query(
            "SELECT COUNT(*) as totalUnpaid FROM Invoice WHERE Status IN ('unpaid','pending','Pending')"
        );
        const [[{ totalAmount }]] = await pool.query(
            "SELECT IFNULL(SUM(Amount),0) as totalAmount FROM Invoice"
        );
        const [[{ totalPaidAmount }]] = await pool.query(
            "SELECT IFNULL(SUM(Amount),0) as totalPaidAmount FROM Invoice WHERE Status = 'paid'"
        );
        const [[{ totalUnpaidAmount }]] = await pool.query(
            "SELECT IFNULL(SUM(Amount),0) as totalUnpaidAmount FROM Invoice WHERE Status IN ('unpaid','pending','Pending')"
        );
        res.json({
            totalFines,
            totalUnpaid,
            totalPaid,
            totalAmount: parseFloat(totalAmount),
            totalUnpaidAmount: parseFloat(totalUnpaidAmount),
            totalPaidAmount: parseFloat(totalPaidAmount),
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "internal server error" });
    }
}

module.exports = {
    listFines,
    myFines,
    getFine,
    payFine,
    waiveFine,
    finesStatistics,
};
