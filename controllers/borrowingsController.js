const pool = require("../db/connection");

function formatDateToSQL(d) {
    const dt = new Date(d);
    const yyyy = dt.getFullYear();
    const mm = String(dt.getMonth() + 1).padStart(2, "0");
    const dd = String(dt.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
}

async function createBorrowing(req, res) {
    const user = req.user;
    const { BookID, DueDate, BorrowDate } = req.body;
    if (!user) return res.status(401).json({ error: "not authenticated" });

    // Accept BookID === 0 as valid; only reject when undefined or null
    if (BookID === undefined || BookID === null)
        return res.status(400).json({ error: "BookID and DueDate required" });

    if (!DueDate)
        return res.status(400).json({ error: "BookID and DueDate required" });

    // Validate dates
    const due = new Date(DueDate);
    if (isNaN(due.getTime()))
        return res.status(400).json({ error: "Invalid DueDate" });

    let borrowDate = new Date();
    if (BorrowDate) {
        const bd = new Date(BorrowDate);
        if (isNaN(bd.getTime()))
            return res.status(400).json({ error: "Invalid BorrowDate" });
        borrowDate = bd;
    }

    const dueSql = formatDateToSQL(due);
    const borrowDateSql = formatDateToSQL(borrowDate);

    try {
        // Start a transaction: ensure book exists and has available copies
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();
            const [books] = await conn.execute(
                "SELECT Available_Copies FROM Books WHERE BookID = ? FOR UPDATE",
                [BookID]
            );
            const book = books[0];
            if (!book) {
                await conn.rollback();
                conn.release();
                return res.status(404).json({ error: "Book not found" });
            }
            if (book.Available_Copies <= 0) {
                await conn.rollback();
                conn.release();
                return res.status(400).json({ error: "No available copies" });
            }
            // Prevent duplicate active borrowings for same user/book
            const [existing] = await conn.execute(
                "SELECT BorrowID FROM Borrowing WHERE BookID = ? AND CusID = ? AND (Status IS NULL OR Status != 'returned')",
                [BookID, user.userId]
            );
            if (existing && existing.length > 0) {
                await conn.rollback();
                conn.release();
                return res
                    .status(400)
                    .json({
                        error: "User already has an active borrowing for this book",
                    });
            }
            const [result] = await conn.execute(
                "INSERT INTO Borrowing (BookID, CusID, BorrowDate, DueDate, Status) VALUES (?, ?, ?, ?, ?)",
                [BookID, user.userId, borrowDateSql, dueSql, "borrowed"]
            );
            await conn.execute(
                "UPDATE Books SET Available_Copies = Available_Copies - 1 WHERE BookID = ?",
                [BookID]
            );
            await conn.commit();
            conn.release();
            res.status(201).json({ borrowId: result.insertId });
        } catch (txErr) {
            await conn.rollback();
            conn.release();
            console.error(txErr);
            if (txErr && txErr.code === "ER_NO_REFERENCED_ROW_2") {
                return res.status(404).json({ error: "Book not found" });
            }
            return res.status(500).json({ error: "internal server error" });
        }
    } catch (err) {
        console.error(err);
        if (err && err.code === "ER_NO_REFERENCED_ROW_2") {
            return res.status(404).json({ error: "Book not found" });
        }
        res.status(500).json({ error: "internal server error" });
    }
}

async function myBorrowings(req, res) {
    const user = req.user;
    if (!user) return res.status(401).json({ error: "not authenticated" });
    try {
        const [rows] = await pool.execute(
            "SELECT * FROM Borrowing WHERE CusID = ? ORDER BY BorrowDate DESC",
            [user.userId]
        );
        res.json({ borrowings: rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "internal server error" });
    }
}

async function returnBorrowing(req, res) {
    const user = req.user;
    const id = parseInt(req.params.id, 10);
    if (!user) return res.status(401).json({ error: "not authenticated" });
    if (!id) return res.status(400).json({ error: "invalid id" });
    try {
        const [result] = await pool.execute(
            "UPDATE Borrowing SET ReturnDate = ?, Status = ? WHERE BorrowID = ? AND CusID = ?",
            [new Date(), "returned", id, user.userId]
        );
        if (result.affectedRows === 0)
            return res.status(404).json({ error: "not found" });
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "internal server error" });
    }
}

async function renewBorrowing(req, res) {
    const user = req.user;
    const id = parseInt(req.params.id, 10);
    if (!user) return res.status(401).json({ error: "not authenticated" });
    if (!id) return res.status(400).json({ error: "invalid id" });
    try {
        // simple renewal: extend DueDate by 7 days
        const [rows] = await pool.execute(
            "SELECT DueDate FROM Borrowing WHERE BorrowID = ? AND CusID = ?",
            [id, user.userId]
        );
        const row = rows[0];
        if (!row) return res.status(404).json({ error: "not found" });
        const newDue = new Date(row.DueDate);
        newDue.setDate(newDue.getDate() + 7);
        const newDueSql = formatDateToSQL(newDue);
        await pool.execute(
            "UPDATE Borrowing SET DueDate = ?, Status = ? WHERE BorrowID = ? AND CusID = ?",
            [newDueSql, "renewed", id, user.userId]
        );
        res.json({ success: true, DueDate: newDueSql });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "internal server error" });
    }
}

async function listBorrowingsAdmin(req, res) {
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

module.exports = {
    createBorrowing,
    myBorrowings,
    returnBorrowing,
    renewBorrowing,
    listBorrowingsAdmin,
};
