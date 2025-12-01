const pool = require("../db/connection");

async function borrowingsHistory(req, res) {
    const user = req.user;
    if (!user) return res.status(401).json({ error: "not authenticated" });
    try {
        const [rows] = await pool.execute(
            "SELECT * FROM Borrowing WHERE CusID = ? ORDER BY BorrowDate DESC",
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
            "SELECT * FROM Reservation WHERE CusID = ? ORDER BY ReservationDate DESC",
            [user.userId]
        );
        res.json({ history: rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "internal server error" });
    }
}

module.exports = { borrowingsHistory, reservationsHistory };
