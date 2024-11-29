const express = require('express');
const router = express.Router();
const db = require('../db'); 
const authenticateJWT = require('../middlewares/auth');

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
router.get('/', (req, res) => {
    const { from, to, capacity, limit = 10, offset = 0 } = req.query;

    let sql = 'SELECT * FROM flights WHERE 1=1';
    let params = [];

    if (from) {
        sql += ' AND `from` = ?';
        params.push(from);
    }
    if (to) {
        sql += ' AND `to` = ?';
        params.push(to);
    }
    if (capacity) {
        sql += ' AND capacity = ?';
        params.push(capacity);
    }

    sql += ' LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    db.query(sql, params, (err, results) => {
        if (err) {
            console.error('Error fetching flights:', err.message);
            return res.status(500).json({ error: 'Internal server error' });
        }
        results.forEach(flight => {
            flight.available_dates = JSON.parse(flight.available_dates);
            flight.days_of_week = JSON.parse(flight.days_of_week);
            flight.recurring_days = JSON.parse(flight.recurring_days);
        });
        res.json(results);
    });
});

/**
 * @swagger
 * /api/v1/flights:
 *   post:
 *     summary: Add a new flight
 *     description: Add a new flight to the database.
 */
router.post('/', authenticateJWT, (req, res) => {
    const { from, to, availableDates, daysOfWeek, recurringDays, capacity } = req.body;

    if (!from || !to || !availableDates || !daysOfWeek || !recurringDays || !capacity) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const sql = 'INSERT INTO flights (`from`, `to`, available_dates, days_of_week, recurring_days, capacity) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [from, to, JSON.stringify(availableDates), JSON.stringify(daysOfWeek), JSON.stringify(recurringDays), capacity], (err, results) => {
        if (err) {
            console.error('Error adding flight:', err.message);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(201).json({ message: 'Flight added successfully!', flightId: results.insertId });
    });
});

module.exports = router;
