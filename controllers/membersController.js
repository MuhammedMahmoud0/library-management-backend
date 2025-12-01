const pool = require("../db/connection");

async function listMembers(req, res) {
    const requester = req.user;
    if (!requester || requester.role !== "admin")
        return res.status(403).json({ error: "forbidden" });
    try {
        const [rows] = await pool.execute(
            "SELECT UserID, UserFirstName, UserLastName, UserName, UserRole FROM Users"
        );
        res.json({ members: rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "internal server error" });
    }
}

async function getMember(req, res) {
    const requester = req.user;
    if (!requester || requester.role !== "admin")
        return res.status(403).json({ error: "forbidden" });
    const id = parseInt(req.params.id, 10);
    if (!id) return res.status(400).json({ error: "invalid id" });
    try {
        const [rows] = await pool.execute(
            "SELECT UserID, UserFirstName, UserLastName, UserName, UserRole FROM Users WHERE UserID = ?",
            [id]
        );
        const user = rows[0];
        if (!user) return res.status(404).json({ error: "not found" });
        res.json({ member: user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "internal server error" });
    }
}

async function updateMember(req, res) {
    const requester = req.user;
    if (!requester || requester.role !== "admin")
        return res.status(403).json({ error: "forbidden" });
    const id = parseInt(req.params.id, 10);
    if (!id) return res.status(400).json({ error: "invalid id" });
    const fields = req.body;
    const allowed = ["UserFirstName", "UserLastName", "UserName", "UserRole"];
    const sets = [];
    const params = [];
    for (const k of allowed) {
        if (Object.prototype.hasOwnProperty.call(fields, k)) {
            sets.push(`${k} = ?`);
            params.push(fields[k]);
        }
    }
    if (!sets.length)
        return res.status(400).json({ error: "no fields to update" });
    try {
        params.push(id);
        const [result] = await pool.execute(
            `UPDATE Users SET ${sets.join(", ")} WHERE UserID = ?`,
            params
        );
        if (result.affectedRows === 0)
            return res.status(404).json({ error: "not found" });
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "internal server error" });
    }
}

async function deleteMember(req, res) {
    const requester = req.user;
    if (!requester || requester.role !== "admin")
        return res.status(403).json({ error: "forbidden" });
    const id = parseInt(req.params.id, 10);
    if (!id) return res.status(400).json({ error: "invalid id" });
    try {
        const [result] = await pool.execute(
            "DELETE FROM Users WHERE UserID = ?",
            [id]
        );
        if (result.affectedRows === 0)
            return res.status(404).json({ error: "not found" });
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "internal server error" });
    }
}

module.exports = { listMembers, getMember, updateMember, deleteMember };
