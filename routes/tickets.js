const express = require('express');
const router = express.Router();
const db = require('../db'); 

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
router.post('/buy', (req, res) => {
    const { flightId, passengerName } = req.body;

    if (!flightId || !passengerName) {
        return res.status(400).json({ error: 'Flight ID and passenger name are required' });
    }

    db.query('SELECT capacity FROM flights WHERE id = ?', [flightId], (err, results) => {
        if (err || results.length === 0) {
            return res.status(500).json({ error: 'Error checking flight' });
        }

        const capacity = results[0].capacity;
        if (capacity <= 0) {
            return res.status(400).json({ error: 'No available seats on this flight' });
        }

        const insertTicket = 'INSERT INTO tickets (flight_id, passenger_name) VALUES (?, ?)';
        const updateCapacity = 'UPDATE flights SET capacity = capacity - 1 WHERE id = ?';

        db.query(insertTicket, [flightId, passengerName], (err, ticketResult) => {
            if (err) {
                return res.status(500).json({ error: 'Error booking ticket' });
            }

            db.query(updateCapacity, [flightId], (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Error updating flight capacity' });
                }

                res.status(201).json({
                    message: 'Ticket booked successfully',
                    ticketId: ticketResult.insertId,
                });
            });
        });
    });
});

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
router.post('/checkin', (req, res) => {
    const { ticketId } = req.body;

    if (!ticketId) {
        return res.status(400).json({ error: 'Ticket ID is required' });
    }

    const sql = 'UPDATE tickets SET status = "checked-in" WHERE id = ?';
    db.query(sql, [ticketId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error checking in' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Ticket not found' });
        }

        res.json({ message: 'Check-in successful' });
    });
});

module.exports = router;
