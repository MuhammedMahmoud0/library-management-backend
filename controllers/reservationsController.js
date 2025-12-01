const pool = require("../db/connection");

function formatDateToSQL(d) {
    const dt = new Date(d);
    const yyyy = dt.getFullYear();
    const mm = String(dt.getMonth() + 1).padStart(2, "0");
    const dd = String(dt.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
}

async function createReservation(req, res) {
    const user = req.user;
    const { BookID, ReservationExpiryDate } = req.body;
    if (!user) return res.status(401).json({ error: "not authenticated" });

    if (BookID === undefined || BookID === null)
        return res.status(400).json({ error: "BookID required" });

    // If expiry date not provided, default to 3 days from now
    let expiry = ReservationExpiryDate ? new Date(ReservationExpiryDate) : null;
    if (!expiry) {
        expiry = new Date();
        expiry.setDate(expiry.getDate() + 3);
    }
    if (isNaN(expiry.getTime())) return res.status(400).json({ error: "Invalid ReservationExpiryDate" });

    const reservationDateSql = formatDateToSQL(new Date());
    const expirySql = formatDateToSQL(expiry);

    try {
        // Ensure book exists
        const [books] = await pool.execute("SELECT BookID FROM Books WHERE BookID = ?", [BookID]);
        if (!books || books.length === 0) return res.status(404).json({ error: "Book not found" });

        const [result] = await pool.execute(
            "INSERT INTO Reservation (BookID, CusID, ReservationDate, ReservationExpiryDate, Status) VALUES (?, ?, ?, ?, ?)",
            [BookID, user.userId, reservationDateSql, expirySql, "reserved"]
        );
        res.status(201).json({ reservationId: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "internal server error" });
    }
}

async function myReservations(req, res) {
    const user = req.user;
    if (!user) return res.status(401).json({ error: "not authenticated" });
    try {
        const [rows] = await pool.execute(
            "SELECT * FROM Reservation WHERE CusID = ? ORDER BY ReservationDate DESC",
            [user.userId]
        );
        res.json({ reservations: rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "internal server error" });
    }
}

async function deleteReservation(req, res) {
    const user = req.user;
    const id = parseInt(req.params.id, 10);
    if (!user) return res.status(401).json({ error: "not authenticated" });
    if (!id) return res.status(400).json({ error: "invalid id" });
    try {
        const [result] = await pool.execute(
            "DELETE FROM Reservation WHERE ReservationID = ? AND CusID = ?",
            [id, user.userId]
        );
        if (result.affectedRows === 0)
            return res.status(404).json({ error: "not found" });
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "internal server error" });
    }
}

async function pickupReservation(req, res) {
    const user = req.user;
    const id = parseInt(req.params.id, 10);
    if (!user) return res.status(401).json({ error: "not authenticated" });
    if (!id) return res.status(400).json({ error: "invalid id" });
    try {
        const [result] = await pool.execute(
            "UPDATE Reservation SET Status = ? WHERE ReservationID = ? AND CusID = ?",
            ["picked", id, user.userId]
        );
        if (result.affectedRows === 0)
            return res.status(404).json({ error: "not found" });
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "internal server error" });
    }
}

async function listReservationsAdmin(req, res) {
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

module.exports = {
    createReservation,
    myReservations,
    deleteReservation,
    pickupReservation,
    listReservationsAdmin,
};
