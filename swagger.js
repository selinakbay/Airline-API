const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            version: "1.0.0",
            title: "Airline API",
            description: "API for managing airline operations such as flight creation, ticket booking, and passenger check-in.",
        },
        host: "http://localhost:3000/api-docs/#/", 
        basePath: "/api/v1",
        schemes: ["https"],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        securityDefinitions: {
            Bearer: {
                type: "apiKey",
                name: "Authorization",
                in: "header",
                description: "Enter your Bearer token in the format: Bearer <token>"
            }
        },
        security: [
            {
                Bearer: []
            }
        ]
    },
    apis: [
        "/routes/flights.js", 
        "/routes/admin.js", 
        "/routes/tickets.js", 
        "/middlewares/auth.js"
    ] 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;

// Swagger documentation for retrieving all flights with filtering options
/**
 * @swagger
 * /api/v1/flights:
 *   get:
 *     summary: Get flights with optional filtering and pagination
 *     description: Retrieve a list of flights from the database with optional filters for 'from', 'to', 'capacity', and pagination.
 *     parameters:
 *       - name: from
 *         in: query
 *         description: The departure location
 *         schema:
 *           type: string
 *       - name: to
 *         in: query
 *         description: The arrival location
 *         schema:
 *           type: string
 *       - name: capacity
 *         in: query
 *         description: The capacity of the flight
 *         schema:
 *           type: integer
 *       - name: limit
 *         in: query
 *         description: Number of results to retrieve
 *         schema:
 *           type: integer
 *           default: 10
 *       - name: offset
 *         in: query
 *         description: Number of results to skip
 *         schema:
 *           type: integer
 *           default: 0
 *     responses:
 *       200:
 *         description: A list of flights based on the given filters and pagination
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */

/**
 * @swagger
 * /api/v1/flights:
 *   post:
 *     summary: Add a new flight
 *     description: Add a new flight to the database.
 */

/**
 * @swagger
 * /api/tickets/buy:
 *   post:
 *     summary: Buy a ticket
 *     description: Book a ticket for a specific flight and reduce flight capacity.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               flightId:
 *                 type: integer
 *               passengerName:
 *                 type: string
 *     responses:
 *       201:
 *         description: Ticket booked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 ticketId:
 *                   type: integer
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/tickets/checkin:
 *   post:
 *     summary: Check in to a flight
 *     description: Perform check-in for a specific ticket.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ticketId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Check-in successful
 *       400:
 *         description: Missing ticket ID
 *       404:
 *         description: Ticket not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/admin/reportFlights:
 *   get:
 *     summary: Get a report of flights
 *     description: Retrieve flights based on filters and pagination.
 */

