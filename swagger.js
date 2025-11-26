const swaggerUi = require("swagger-ui-express");
const express = require("express");

const router = express.Router();

const swaggerSpec = {
    openapi: "3.0.0",
    info: {
        title: "Library Management API",
        version: "1.0.0",
        description: "Auth endpoints for the Library Management backend",
    },
    // If API_URL is set (production), use it; otherwise use a relative URL ('/') so
    // Swagger UI issues requests to the same origin as the docs (avoids mixed-content / CORS issues).
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
    },
};

router.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = router;
