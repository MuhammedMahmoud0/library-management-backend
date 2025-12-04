# 📚 Library Management Backend

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](#license)
[![Node.js](https://img.shields.io/badge/Platform-Node.js-green)](#)
[![MySQL](https://img.shields.io/badge/Database-MySQL-blue)](#)
[![Status](https://img.shields.io/badge/Status-Development-orange)](#)

A lightweight library management backend built with Node.js, Express and MySQL. It provides authentication, book borrowing/reservation workflows, invoice/fine management, and administrative reporting endpoints.

---

## ✨ Highlights

-   JWT-based authentication with `admin` and `customer` roles
-   Borrowing lifecycle: borrow, due date, return
-   Reservations with expiry
-   Invoice & Fine management with pay/waive endpoints
-   Admin reports: popular books, overdue books, member activity
-   Swagger/OpenAPI documentation in `swagger.js`

---

## 🧭 Quick Start

### Requirements

-   Node.js 18+
-   MySQL 5.7+

### 1) Clone

```bash
git clone https://github.com/<your-org>/library-management-backend.git
cd library-management-backend
```

### 2) Install

```bash
npm install
```

### 3) Database

-   Run `SQL/Creation.sql` to create the schema.
-   Optionally run `SQL/Insert.sql` to populate sample data.

### 4) Environment

Create a `.env` file with:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=library_db
JWT_SECRET=changeme
DEFAULT_FINE_AMOUNT=100
```

### 5) Start

```bash
npm start
# or
node server.js
```

Server runs at `http://localhost:3000` by default.

---

## 🧩 API Overview

Main endpoints (see `routes/`):

-   `POST /api/auth/login` - login & get JWT
-   `POST /api/auth/register` - register new customer
-   `GET /api/books` - list/search books
-   `POST /api/borrowings` - create borrowing (creates Invoice automatically)
-   `GET /api/fines` - admin list fines
-   `GET /api/fines/my` - current user's fines
-   `POST /api/fines/:id/pay` - pay a fine
-   `POST /api/fines/:id/waive` - admin waive
-   `GET /api/reports/member-activity` - admin member activity report

Full OpenAPI spec is available in `swagger.js`.

---

## 🛠 Development Notes

-   DB access via `mysql2` promise pool (`db/connection.js`).
-   Controllers in `controllers/`, routes in `routes/`, middlewares in `middlewares/`.
-   Default fine amount via `DEFAULT_FINE_AMOUNT` environment variable.

---

## 🧪 Example Requests

Pay a fine (admin token):

```bash
curl -X POST 'http://localhost:3000/api/fines/1/pay' \
	-H 'Authorization: Bearer <ADMIN_TOKEN>' \
	-H 'Content-Type: application/json' \
	-d '{}'
```

Get member activity (admin token):

```bash
curl -H "Authorization: Bearer <ADMIN_TOKEN>" http://localhost:3000/api/reports/member-activity
```

---

## ✅ Contributing

PRs welcome. Please open issues for bugs or feature requests. Keep changes focused and add tests where possible.

---

## 📜 License

MIT

---

If you want, I can also add:

-   Dockerfile + docker-compose for local dev
-   GitHub Actions CI workflow
-   Postman collection or Swagger UI hosting instructions
