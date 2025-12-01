const pool = require("../db/connection");

async function listBooks(req, res) {
    const page = Math.max(1, parseInt(req.query.page || "1", 10));
    const limit = Math.min(
        100,
        Math.max(1, parseInt(req.query.limit || "20", 10))
    );
    const offset = (page - 1) * limit;
    const q = req.query.q ? `%${req.query.q}%` : null;
    const category = req.query.category || null;
    const author = req.query.author ? `%${req.query.author}%` : null;

    try {
        let where = [];
        let params = [];
        if (q) {
            where.push("(Title LIKE ? OR Author LIKE ?)");
            params.push(q, q);
        }
        if (category) {
            where.push("Category = ?");
            params.push(category);
        }
        if (author) {
            where.push("Author LIKE ?");
            params.push(author);
        }

        const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";
        const sql = `SELECT * FROM Books ${whereSql} ORDER BY BookID DESC LIMIT ${limit} OFFSET ${offset}`;
        const [rows] = await pool.query(sql, params);
        const [[{ cnt }]] = await pool.query(
            `SELECT COUNT(*) as cnt FROM Books ${whereSql}`,
            params
        );
        res.json({ page, limit, total: cnt, books: rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "internal server error" });
    }
}

async function getBook(req, res) {
    const id = parseInt(req.params.id, 10);
    if (!id) return res.status(400).json({ error: "invalid id" });
    try {
        const [rows] = await pool.execute(
            "SELECT * FROM Books WHERE BookID = ?",
            [id]
        );
        const book = rows[0];
        if (!book) return res.status(404).json({ error: "not found" });
        res.json(book);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "internal server error" });
    }
}

async function createBook(req, res) {
    const {
        Category,
        Title,
        Author,
        Price,
        Quantity,
        Available_Copies,
        Pub_Year,
        Pub_Name,
        Cover,
        Rating,
        Availability,
    } = req.body;
    if (!Title || !Author)
        return res.status(400).json({ error: "Title and Author required" });
    try {
        const [result] = await pool.execute(
            "INSERT INTO Books (Category, Title, Author, Price, Quantity, Available_Copies, Pub_Year, Pub_Name, Cover, Rating, Availability) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
                Category || null,
                Title,
                Author,
                Price || null,
                Quantity || 0,
                Available_Copies || Quantity || 0,
                Pub_Year || null,
                Pub_Name || null,
                Cover || null,
                Rating || null,
                Availability ? 1 : 0,
            ]
        );
        res.status(201).json({ bookId: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "internal server error" });
    }
}

async function updateBook(req, res) {
    const id = parseInt(req.params.id, 10);
    if (!id) return res.status(400).json({ error: "invalid id" });
    const fields = req.body;
    const allowed = [
        "Category",
        "Title",
        "Author",
        "Price",
        "Quantity",
        "Available_Copies",
        "Pub_Year",
        "Pub_Name",
        "Cover",
        "Rating",
        "Availability",
    ];
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
        const sql = `UPDATE Books SET ${sets.join(", ")} WHERE BookID = ?`;
        const [result] = await pool.execute(sql, params);
        if (result.affectedRows === 0)
            return res.status(404).json({ error: "not found" });
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "internal server error" });
    }
}

async function deleteBook(req, res) {
    const id = parseInt(req.params.id, 10);
    if (!id) return res.status(400).json({ error: "invalid id" });
    try {
        const [result] = await pool.execute(
            "DELETE FROM Books WHERE BookID = ?",
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

module.exports = { listBooks, getBook, createBook, updateBook, deleteBook };
