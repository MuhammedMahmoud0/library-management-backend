const swaggerSpec = {
    openapi: "3.0.0",
    info: {
        title: "Library Management API",
        version: "1.0.0",
        description: "Auth endpoints for the Library Management backend",
    },
    servers: [{ url: process.env.API_URL || "/" }],
    components: {
        securitySchemes: {
            BearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
        },
        schemas: {
            UserPublic: {
                type: "object",
                properties: {
                    UserID: { type: "integer" },
                    UserFirstName: { type: "string" },
                    UserLastName: { type: "string" },
                    UserName: { type: "string" },
                    UserRole: { type: "string" },
                },
            },
            Book: {
                type: "object",
                properties: {
                    BookID: { type: "integer" },
                    Category: { type: "string" },
                    Title: { type: "string" },
                    Author: { type: "string" },
                    Price: { type: "number", format: "decimal" },
                    Quantity: { type: "integer" },
                    Available_Copies: { type: "integer" },
                    Pub_Year: { type: "integer" },
                    Pub_Name: { type: "string" },
                    Cover: {
                        type: "string",
                        format: "uri",
                        description: "URL or path to the book cover image",
                    },
                    Rating: { type: "number" },
                    Availability: { type: "boolean" },
                },
            },
            Borrowing: {
                type: "object",
                properties: {
                    BorrowID: { type: "integer" },
                    BookID: { type: "integer" },
                    CusID: { type: "integer" },
                    BorrowDate: { type: "string", format: "date" },
                    DueDate: { type: "string", format: "date" },
                    ReturnDate: { type: ["string", "null"], format: "date" },
                    Status: { type: "string" },
                    BookTitle: { type: "string" },
                    BookCover: { type: "string", format: "uri" },
                },
            },
            Reservation: {
                type: "object",
                properties: {
                    ReservationID: { type: "integer" },
                    BookID: { type: "integer" },
                    CusID: { type: "integer" },
                    ReservationDate: { type: "string", format: "date" },
                    ReservationExpiryDate: {
                        type: ["string", "null"],
                        format: "date",
                    },
                    Status: { type: "string" },
                    BookTitle: { type: "string" },
                    BookCover: { type: "string", format: "uri" },
                },
            },
            Member: {
                type: "object",
                properties: {
                    UserID: { type: "integer" },
                    UserFirstName: { type: "string" },
                    UserLastName: { type: "string" },
                    UserName: { type: "string" },
                    UserRole: { type: "string" },
                },
            },
            ReportSummary: {
                type: "object",
                properties: {
                    title: { type: "string" },
                    count: { type: "integer" },
                },
            },
        },
    },
    paths: {
        "/api/auth/register": {
            post: {
                summary: "Register a new customer",
                tags: ["Auth"],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    firstName: { type: "string" },
                                    lastName: { type: "string" },
                                    birthDate: {
                                        type: "string",
                                        format: "date",
                                    },
                                    username: { type: "string" },
                                    password: { type: "string" },
                                },
                                required: ["username", "password"],
                            },
                        },
                    },
                },
                responses: {
                    201: {
                        description: "Created",
                        content: {
                            "application/json": { schema: { type: "object" } },
                        },
                    },
                    400: { description: "Bad Request" },
                    409: { description: "Username already exists" },
                },
            },
        },
        "/api/auth/login": {
            post: {
                summary: "Login and receive a JWT token",
                tags: ["Auth"],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    username: {
                                        type: "string",
                                        default: "Muhammed_Mahmoud",
                                    },
                                    password: {
                                        type: "string",
                                        default: "admin123",
                                    },
                                },
                                required: ["username", "password"],
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "OK",
                        content: {
                            "application/json": { schema: { type: "object" } },
                        },
                    },
                    401: { description: "Invalid credentials" },
                },
            },
        },
        "/api/auth/me": {
            get: {
                summary: "Get current token payload",
                tags: ["Auth"],
                security: [{ BearerAuth: [] }],
                responses: {
                    200: { description: "OK" },
                    401: { description: "Unauthorized" },
                },
            },
        },
        "/api/auth/users": {
            get: {
                summary: "List users (admin only)",
                tags: ["Admin"],
                security: [{ BearerAuth: [] }],
                parameters: [
                    {
                        name: "page",
                        in: "query",
                        schema: { type: "integer", default: 1 },
                    },
                    {
                        name: "limit",
                        in: "query",
                        schema: { type: "integer", default: 20 },
                    },
                    { name: "q", in: "query", schema: { type: "string" } },
                ],
                responses: {
                    200: {
                        description: "OK",
                        content: {
                            "application/json": { schema: { type: "object" } },
                        },
                    },
                    403: { description: "Forbidden" },
                },
            },
        },
        "/api/auth/admins": {
            post: {
                summary: "Create an admin (admin only)",
                tags: ["Admin"],
                security: [{ BearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    username: { type: "string" },
                                    password: { type: "string" },
                                    firstName: { type: "string" },
                                    lastName: { type: "string" },
                                },
                                required: ["username", "password"],
                            },
                        },
                    },
                },
                responses: {
                    201: { description: "Created" },
                    403: { description: "Forbidden" },
                    409: { description: "Duplicate" },
                },
            },
        },
        "/api/auth/users/{id}": {
            delete: {
                summary: "Delete a user (admin only)",
                tags: ["Admin"],
                security: [{ BearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "integer" },
                    },
                ],
                responses: {
                    200: { description: "Deleted" },
                    403: { description: "Forbidden" },
                    404: { description: "Not found" },
                },
            },
        },
        "/api/books": {
            get: {
                summary: "List books",
                tags: ["Books"],
                parameters: [
                    { name: "q", in: "query", schema: { type: "string" } },
                    {
                        name: "page",
                        in: "query",
                        schema: { type: "integer", default: 1 },
                    },
                    {
                        name: "limit",
                        in: "query",
                        schema: { type: "integer", default: 20 },
                    },
                ],
                responses: {
                    200: {
                        description: "OK",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        $ref: "#/components/schemas/Book",
                                    },
                                },
                            },
                        },
                    },
                },
            },
            post: {
                summary: "Create a book (admin)",
                tags: ["Books"],
                security: [{ BearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Book" },
                        },
                    },
                },
                responses: {
                    201: { description: "Created" },
                    403: { description: "Forbidden" },
                },
            },
        },
        "/api/books/{id}": {
            get: {
                summary: "Get book by id",
                tags: ["Books"],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "integer" },
                    },
                ],
                responses: {
                    200: {
                        description: "OK",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/Book" },
                            },
                        },
                    },
                    404: { description: "Not found" },
                },
            },
            put: {
                summary: "Update a book (admin)",
                tags: ["Books"],
                security: [{ BearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "integer" },
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Book" },
                        },
                    },
                },
                responses: {
                    200: { description: "Updated" },
                    403: { description: "Forbidden" },
                },
            },
            delete: {
                summary: "Delete a book (admin)",
                tags: ["Books"],
                security: [{ BearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "integer" },
                    },
                ],
                responses: {
                    200: { description: "Deleted" },
                    403: { description: "Forbidden" },
                },
            },
        },
        "/api/borrowings": {
            post: {
                summary: "Create a borrowing (customer)",
                tags: ["Borrowings"],
                security: [{ BearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    BookID: { type: "integer" },
                                    DueDate: {
                                        type: "string",
                                        format: "date-time",
                                        description:
                                            "Desired due date for the borrowing (ISO 8601)",
                                    },
                                    BorrowDate: {
                                        type: "string",
                                        format: "date-time",
                                        description:
                                            "Optional borrow date; if omitted server will set now",
                                    },
                                },
                                required: ["BookID", "DueDate"],
                            },
                        },
                    },
                },
                responses: {
                    201: { description: "Created" },
                    400: { description: "Bad Request" },
                },
            },
            get: {
                summary: "(Admin) List borrowings",
                tags: ["Borrowings"],
                security: [{ BearerAuth: [] }],
                parameters: [
                    {
                        name: "page",
                        in: "query",
                        schema: { type: "integer", default: 1 },
                    },
                    {
                        name: "limit",
                        in: "query",
                        schema: { type: "integer", default: 20 },
                    },
                ],
                responses: {
                    200: {
                        description: "OK",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        $ref: "#/components/schemas/Borrowing",
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/api/borrowings/my": {
            get: {
                summary: "Get current user's borrowings",
                tags: ["Borrowings"],
                security: [{ BearerAuth: [] }],
                responses: {
                    200: {
                        description: "OK",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        $ref: "#/components/schemas/Borrowing",
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/api/borrowings/{id}/return": {
            post: {
                summary: "Return a borrowed book",
                tags: ["Borrowings"],
                security: [{ BearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "integer" },
                    },
                ],
                responses: {
                    200: { description: "Returned" },
                    400: { description: "Bad Request" },
                },
            },
        },
        "/api/borrowings/{id}/renew": {
            post: {
                summary: "Renew a borrowing",
                tags: ["Borrowings"],
                security: [{ BearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "integer" },
                    },
                ],
                responses: {
                    200: { description: "Renewed" },
                    400: { description: "Bad Request" },
                },
            },
        },
        "/api/reservations": {
            post: {
                summary: "Create a reservation (customer)",
                tags: ["Reservations"],
                security: [{ BearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: { BookID: { type: "integer" } },
                                required: ["BookID"],
                            },
                        },
                    },
                },
                responses: { 201: { description: "Created" } },
            },
            get: {
                summary: "(Admin) List reservations",
                tags: ["Reservations"],
                security: [{ BearerAuth: [] }],
                responses: {
                    200: {
                        description: "OK",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        $ref: "#/components/schemas/Reservation",
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/api/reservations/my": {
            get: {
                summary: "Get current user's reservations",
                tags: ["Reservations"],
                security: [{ BearerAuth: [] }],
                responses: {
                    200: {
                        description: "OK",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        $ref: "#/components/schemas/Reservation",
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/api/reservations/{id}": {
            delete: {
                summary: "Delete a reservation",
                tags: ["Reservations"],
                security: [{ BearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "integer" },
                    },
                ],
                responses: {
                    200: { description: "Deleted" },
                    403: { description: "Forbidden" },
                },
            },
        },
        "/api/reservations/{id}/pickup": {
            post: {
                summary: "Mark reservation as picked up (admin)",
                tags: ["Reservations"],
                security: [{ BearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "integer" },
                    },
                ],
                responses: { 200: { description: "Picked up" } },
            },
        },
        "/api/history/borrowings": {
            get: {
                summary: "Borrowings history",
                tags: ["History"],
                security: [{ BearerAuth: [] }],
                responses: {
                    200: {
                        description: "OK",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        $ref: "#/components/schemas/Borrowing",
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/api/history/reservations": {
            get: {
                summary: "Reservations history",
                tags: ["History"],
                security: [{ BearerAuth: [] }],
                responses: {
                    200: {
                        description: "OK",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        $ref: "#/components/schemas/Reservation",
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/api/members": {
            get: {
                summary: "List members (admin)",
                tags: ["Members"],
                security: [{ BearerAuth: [] }],
                parameters: [
                    {
                        name: "page",
                        in: "query",
                        schema: { type: "integer", default: 1 },
                    },
                    {
                        name: "limit",
                        in: "query",
                        schema: { type: "integer", default: 20 },
                    },
                ],
                responses: {
                    200: {
                        description: "OK",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        $ref: "#/components/schemas/Member",
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/api/members/{id}": {
            get: {
                summary: "Get member by id (admin)",
                tags: ["Members"],
                security: [{ BearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "integer" },
                    },
                ],
                responses: {
                    200: {
                        description: "OK",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/Member" },
                            },
                        },
                    },
                },
            },
            put: {
                summary: "Update a member (admin)",
                tags: ["Members"],
                security: [{ BearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "integer" },
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Member" },
                        },
                    },
                },
                responses: { 200: { description: "Updated" } },
            },
            delete: {
                summary: "Delete a member (admin)",
                tags: ["Members"],
                security: [{ BearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "integer" },
                    },
                ],
                responses: { 200: { description: "Deleted" } },
            },
        },
        "/api/reports/popular-books": {
            get: {
                summary: "Get popular books report",
                tags: ["Reports"],
                security: [{ BearerAuth: [] }],
                responses: {
                    200: {
                        description: "OK",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        $ref: "#/components/schemas/ReportSummary",
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/api/reports/borrowings": {
            get: {
                summary: "Borrowings report",
                tags: ["Reports"],
                security: [{ BearerAuth: [] }],
                responses: { 200: { description: "OK" } },
            },
        },
        "/api/reports/reservations": {
            get: {
                summary: "Reservations report",
                tags: ["Reports"],
                security: [{ BearerAuth: [] }],
                responses: { 200: { description: "OK" } },
            },
        },
        "/api/reports/overdue": {
            get: {
                summary: "Overdue books report",
                tags: ["Reports"],
                security: [{ BearerAuth: [] }],
                responses: { 200: { description: "OK" } },
            },
        },
        "/api/reports/member-activity": {
            get: {
                summary: "Member activity report",
                tags: ["Reports"],
                security: [{ BearerAuth: [] }],
                responses: { 200: { description: "OK" } },
            },
        },
        "/api/dashboard/user": {
            get: {
                summary: "User dashboard",
                tags: ["Dashboard"],
                security: [{ BearerAuth: [] }],
                responses: { 200: { description: "OK" } },
            },
        },
        "/api/dashboard/admin": {
            get: {
                summary: "Admin dashboard",
                tags: ["Dashboard"],
                security: [{ BearerAuth: [] }],
                responses: { 200: { description: "OK" } },
            },
        },
    },
};

// Generate base HTML from swagger-ui-express then inject a small script
// that intercepts fetch responses from /api/auth/login and automatically
// pre-authorizes the Swagger UI with the returned token so the user doesn't
// have to copy/paste it into the Authorize dialog.
const swaggerHtml = swaggerUi.generateHTML(swaggerSpec);

const autoAuthScript = `
<script>
(function(){
    // Small fetch wrapper that looks for login responses and pulls token
    const _fetch = window.fetch;
    window.fetch = function(input, init) {
        return _fetch(input, init).then(function(res) {
            try {
                const url = (typeof input === 'string') ? input : (input && input.url) || '';
                // Adjust path check if your login path differs
                if (url && url.endsWith('/api/auth/login') && res && res.ok) {
                    res.clone().json().then(function(data){
                        if (data && data.token) {
                            // Swagger UI exposes 'ui' global; preauthorize the bearer token
                            try {
                                if (window.ui && typeof window.ui.preauthorizeApiKey === 'function') {
                                    window.ui.preauthorizeApiKey('BearerAuth', data.token);
                                    console.info('Swagger: auto-authorized from login response');
                                }
                            } catch(e) { console.warn('auto-auth failed', e); }
                        }
                    }).catch(()=>{});
                }
            } catch(e){}
            return res;
        });
    };
})();
</script>
`;

// Serve swagger static assets with the provided middleware
router.use("/", swaggerUi.serve);

// Serve the Swagger UI HTML at the root and inject our auto-auth script
router.get("/", (req, res) => {
    const html = swaggerHtml.replace("</body>", autoAuthScript + "</body>");
    res.send(html);
});

module.exports = router;
