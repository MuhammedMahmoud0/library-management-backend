require("dotenv").config();

const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");

const app = express();
const swaggerRouter = require("./swagger");

// Configure CORS for the frontend
const FRONTEND_ORIGIN =
    process.env.FRONTEND_ORIGIN || "https://comfy-custard-cf161e.netlify.app";
app.use(cors({ origin: FRONTEND_ORIGIN, credentials: true }));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/docs", swaggerRouter);

app.get("/", (req, res) => {
    res.json({ status: "ok", message: "Library management backend" });
});

const ensureAdmin = require("./scripts/ensureAdmin");
const PORT = process.env.PORT || 3000;

const start = async () => {
    await ensureAdmin();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`http://localhost:${PORT}/`);
    });
};

start();
