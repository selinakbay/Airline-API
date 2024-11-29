const db = require('../db'); 

const FlightModel = {
   
    getFlights: ({ from, to, startDate, endDate, offset = 0, limit = 10 }, callback) => {
        let sql = 'SELECT * FROM flights WHERE 1=1';
        const params = [];

        if (from) {
            sql += ' AND `from` = ?';
            params.push(from);
        }
        if (to) {
            sql += ' AND `to` = ?';
            params.push(to);
        }
        if (startDate && endDate) {
            sql += ' AND `date` BETWEEN ? AND ?';
            params.push(startDate, endDate);
        }

        sql += ' LIMIT ? OFFSET ?';
        params.push(parseInt(limit), parseInt(offset));

        db.query(sql, params, callback);
    },
};

module.exports = FlightModel;
