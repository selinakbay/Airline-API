const express = require('express');
const TicketModel = require('../models/TicketModel');
const router = express.Router();

router.post('/', (req, res) => {
    const { flightId, passengerName } = req.body;

    if (!flightId || !passengerName) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    TicketModel.bookTicket({ flightId, passengerName }, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (results.error) {
            return res.status(400).json({ error: results.error });
        }
        res.status(201).json({ ticketId: results.ticketId, message: 'Ticket booked successfully' });
    });
});

router.post('/checkin', (req, res) => {
    const { ticketId } = req.body;

    if (!ticketId) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    TicketModel.checkIn(ticketId, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (results.error) {
            return res.status(404).json({ error: results.error });
        }
        res.json({ message: results.message });
    });
});

module.exports = router;
