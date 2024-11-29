const express = require('express');
const router = express.Router();
const db = require('../db'); 
const authenticateJWT = require('../middlewares/auth');

/**
 * @swagger
 * /api/v1/admin/reportFlights:
 *   get:
 *     summary: Get a report of flights
 *     description: Retrieve flights based on filters and pagination.
 */
router.get('/reportFlights', authenticateJWT, (req, res) => {
    const { from, to, capacity, startDate, endDate, limit = 10, offset = 0 } = req.query;

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
        sql += ' AND capacity >= ?';
        params.push(capacity);
    }
    if (startDate && endDate) {
        sql += ' AND available_dates BETWEEN ? AND ?';
        params.push(startDate, endDate);
    }

    sql += ' LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    db.query(sql, params, (err, results) => {
        if (err) {
            console.error('Error fetching report:', err.message);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(results);
    });
});

module.exports = router;
