const pool = require("../db/connection");

async function borrowingsHistory(req, res) {
    const user = req.user;
    if (!user) return res.status(401).json({ error: "not authenticated" });
    try {
        const [rows] = await pool.execute(
            `SELECT b.*, bk.Title as BookTitle, bk.Cover as BookCover
             FROM Borrowing b
             LEFT JOIN Books bk ON b.BookID = bk.BookID
             WHERE b.CusID = ?
             ORDER BY b.BorrowDate DESC`,
            [user.userId]
        );
        res.json({ history: rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "internal server error" });
    }
}

async function reservationsHistory(req, res) {
    const user = req.user;
    if (!user) return res.status(401).json({ error: "not authenticated" });
    try {
        const [rows] = await pool.execute(
            `SELECT r.*, bk.Title as BookTitle, bk.Cover as BookCover
             FROM Reservation r
             LEFT JOIN Books bk ON r.BookID = bk.BookID
             WHERE r.CusID = ?
             ORDER BY r.ReservationDate DESC`,
            [user.userId]
        );
        res.json({ history: rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "internal server error" });
    }
}

module.exports = { borrowingsHistory, reservationsHistory };
