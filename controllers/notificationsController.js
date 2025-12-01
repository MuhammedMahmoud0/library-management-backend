const pool = require("../db/connection");

async function listNotifications(req, res) {
    const user = req.user;
    if (!user) return res.status(401).json({ error: "not authenticated" });
    try {
        const [rows] = await pool.execute(
            "SELECT * FROM Notifications WHERE UserID = ? ORDER BY CreatedAt DESC",
            [user.userId]
        );
        res.json({ notifications: rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "internal server error" });
    }
}

async function markRead(req, res) {
    const user = req.user;
    if (!user) return res.status(401).json({ error: "not authenticated" });
    const id = parseInt(req.params.id, 10);
    if (!id) return res.status(400).json({ error: "invalid id" });
    try {
        const [result] = await pool.execute(
            "UPDATE Notifications SET Read = 1 WHERE ID = ? AND UserID = ?",
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

async function markReadAll(req, res) {
    const user = req.user;
    if (!user) return res.status(401).json({ error: "not authenticated" });
    try {
        await pool.execute(
            "UPDATE Notifications SET Read = 1 WHERE UserID = ?",
            [user.userId]
        );
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "internal server error" });
    }
}

async function deleteNotification(req, res) {
    const user = req.user;
    if (!user) return res.status(401).json({ error: "not authenticated" });
    const id = parseInt(req.params.id, 10);
    if (!id) return res.status(400).json({ error: "invalid id" });
    try {
        const [result] = await pool.execute(
            "DELETE FROM Notifications WHERE ID = ? AND UserID = ?",
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

module.exports = {
    listNotifications,
    markRead,
    markReadAll,
    deleteNotification,
};
