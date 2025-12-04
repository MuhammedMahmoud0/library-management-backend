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
        // Aggregate per-customer activity in a single query using LEFT JOINs and conditional aggregation
        const sql = `
                SELECT
                    c.UserID as id,
                    CONCAT(IFNULL(c.UserFirstName,''), ' ', IFNULL(c.UserLastName,'')) as name,
                    c.UserName as email,
                    IFNULL(b.totalBorrowings,0) as totalBorrowings,
                    IFNULL(b.activeBorrowings,0) as activeBorrowings,
                    IFNULL(r.totalReservations,0) as totalReservations,
                    IFNULL(b.returnedBooks,0) as \`Returned Books\`,
                    IFNULL(b.overdueBooks,0) as overdueBooks
                FROM Users c
                LEFT JOIN (
                    SELECT
                        CusID,
                        COUNT(*) as totalBorrowings,
                        SUM(CASE WHEN ReturnDate IS NULL THEN 1 ELSE 0 END) as activeBorrowings,
                        SUM(CASE WHEN ReturnDate IS NOT NULL THEN 1 ELSE 0 END) as returnedBooks,
                        SUM(CASE WHEN ReturnDate IS NULL AND DueDate < CURDATE() THEN 1 ELSE 0 END) as overdueBooks
                    FROM Borrowing
                    GROUP BY CusID
                ) b ON b.CusID = c.UserID
                LEFT JOIN (
                    SELECT CusID, COUNT(*) as totalReservations FROM Reservation GROUP BY CusID
                ) r ON r.CusID = c.UserID
                ORDER BY totalBorrowings DESC
                LIMIT 1000
                `;

        const [rows] = await pool.execute(sql);
        // Return the requested JSON shape
        res.json({ success: true, data: rows });
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
