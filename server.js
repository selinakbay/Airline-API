const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const flightRoutes = require('./routes/flights');
const adminRoutes = require('./routes/admin');
const ticketRoutes = require('./routes/tickets');
const db = require('./db');

const mobileFlightsRoutes = require('./routes/mobileFlights');
const mobileTicketsRoutes = require('./routes/mobileTickets');

app.use('/api/v1/mobile/flights', mobileFlightsRoutes);
app.use('/api/v1/mobile/tickets', mobileTicketsRoutes);


const swaggerDocs = require('./swagger'); 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const authRoutes = require('./routes/auth');
app.use('/api/v1/auth', authRoutes);


const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/api/flights', flightRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/tickets', ticketRoutes);

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Flight API',
            version: '1.0.0',
            description: 'API for managing flights, tickets, and admin functionalities',
        },
    },
    apis: ['./routes/flights.js', './routes/admin.js', './routes/tickets.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/', (req, res) => {
    res.send('Hello, Node.js API is running!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
