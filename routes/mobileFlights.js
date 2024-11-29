const express = require('express');
const FlightModel = require('../models/FlightModel');
const router = express.Router();

router.get('/', (req, res) => {
    const { from, to, startDate, endDate, offset, limit } = req.query;

    FlightModel.getFlights({ from, to, startDate, endDate, offset, limit }, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json({ flights: results });
    });
});

module.exports = router;
