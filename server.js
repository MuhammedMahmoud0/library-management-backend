require("dotenv").config();

const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const booksRoutes = require("./routes/books");
const borrowingsRoutes = require("./routes/borrowings");
const reservationsRoutes = require("./routes/reservations");
const historyRoutes = require("./routes/history");
const membersRoutes = require("./routes/members");
const reportsRoutes = require("./routes/reports");
const dashboardRoutes = require("./routes/dashboard");

const app = express();
const swaggerRouter = require("./swagger");

// Configure CORS with a dynamic allowlist so Swagger UI (served from the backend)
// and the frontend can both call the API.
const FRONTEND_ORIGIN =
    process.env.FRONTEND_ORIGIN || "https://comfy-custard-cf161e.netlify.app";
const DEPLOYED_BACKEND =
    process.env.BACKEND_URL ||
    "https://library-management-backend-production.up.railway.app";
const LOCAL_ORIGIN = process.env.LOCAL_ORIGIN || "http://localhost:3000";

const allowlist = [
    FRONTEND_ORIGIN,
    DEPLOYED_BACKEND,
    LOCAL_ORIGIN,
    "https://library-management-backend-production.up.railway.app/api/docs",
    "*",
];

const corsOptions = {
    origin: function (origin, callback) {
        // allow requests with no origin (like curl or server-to-server)
        if (!origin) return callback(null, true);
        if (allowlist.indexOf(origin) !== -1) {
            return callback(null, true);
        }
        return callback(
            new Error("CORS policy: This origin is not allowed"),
            false
        );
    },
    credentials: true,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
// enable preflight across-the-board
app.options("*", cors(corsOptions));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/docs", swaggerRouter);
app.use("/api/books", booksRoutes);
app.use("/api/borrowings", borrowingsRoutes);
app.use("/api/reservations", reservationsRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/members", membersRoutes);
app.use("/api/reports", reportsRoutes);
app.use("/api/dashboard", dashboardRoutes);

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
