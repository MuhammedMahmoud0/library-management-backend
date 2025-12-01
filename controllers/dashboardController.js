const pool = require("../db/connection");

async function userDashboard(req, res) {
    const user = req.user;
    if (!user) return res.status(401).json({ error: "not authenticated" });
    try {
        const [borrowings] = await pool.execute(
            "SELECT * FROM Borrowing WHERE CusID = ? ORDER BY BorrowDate DESC LIMIT 5",
            [user.userId]
        );
        const [reservations] = await pool.execute(
            "SELECT * FROM Reservation WHERE CusID = ? ORDER BY ReservationDate DESC LIMIT 5",
            [user.userId]
        );
        res.json({ borrowings, reservations });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "internal server error" });
    }
}

async function adminDashboard(req, res) {
    const requester = req.user;
    if (!requester || requester.role !== "admin")
        return res.status(403).json({ error: "forbidden" });
    try {
        const [[{ totalBooks }]] = await pool.query(
            "SELECT COUNT(*) as totalBooks FROM Books"
        );
        const [[{ totalUsers }]] = await pool.query(
            "SELECT COUNT(*) as totalUsers FROM Users"
        );
        const [[{ totalBorrowings }]] = await pool.query(
            "SELECT COUNT(*) as totalBorrowings FROM Borrowing"
        );
        res.json({ totalBooks, totalUsers, totalBorrowings });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "internal server error" });
    }
}

module.exports = { userDashboard, adminDashboard };
