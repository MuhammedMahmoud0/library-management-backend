const pool = require("../db/connection");

async function popularBooks(req, res) {
    const requester = req.user;
    if (!requester || requester.role !== "admin")
        return res.status(403).json({ error: "forbidden" });
    try {
        const [rows] = await pool.execute(
            "SELECT Books.BookID as BookID, Books.Title as Title, Books.Author as Author, COUNT(*) as times FROM Borrowing JOIN Books ON Borrowing.BookID = Books.BookID GROUP BY Books.BookID, Books.Title, Books.Author ORDER BY times DESC LIMIT 10"
        );
        res.json({ popular: rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "internal server error" });
    }
}

async function borrowingsReport(req, res) {
    const requester = req.user;
    if (!requester || requester.role !== "admin")
        return res.status(403).json({ error: "forbidden" });
    try {
        const [rows] = await pool.execute(
            "SELECT * FROM Borrowing ORDER BY BorrowDate DESC"
        );
        res.json({ borrowings: rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "internal server error" });
    }
}

async function reservationsReport(req, res) {
    const requester = req.user;
    if (!requester || requester.role !== "admin")
        return res.status(403).json({ error: "forbidden" });
    try {
        const [rows] = await pool.execute(
            "SELECT * FROM Reservation ORDER BY ReservationDate DESC"
        );
        res.json({ reservations: rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "internal server error" });
    }
}

async function overdueBooks(req, res) {
    const requester = req.user;
    if (!requester || requester.role !== "admin")
        return res.status(403).json({ error: "forbidden" });
    try {
        const [rows] = await pool.execute(
            "SELECT * FROM Borrowing WHERE DueDate < CURDATE() AND ReturnDate IS NULL"
        );
        res.json({ overdue: rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "internal server error" });
    }
}

async function memberActivity(req, res) {
    const requester = req.user;
    if (!requester || requester.role !== "admin")
        return res.status(403).json({ error: "forbidden" });
    try {
        const [rows] = await pool.execute(
            "SELECT CusID, COUNT(*) as borrow_count FROM Borrowing GROUP BY CusID ORDER BY borrow_count DESC"
        );
        res.json({ activity: rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "internal server error" });
    }
}

module.exports = {
    popularBooks,
    borrowingsReport,
    reservationsReport,
    overdueBooks,
    memberActivity,
};
