const db = require('../db'); 

const TicketModel = {
   
    bookTicket: ({ flightId, passengerName }, callback) => {
        const checkCapacitySql = 'SELECT capacity FROM flights WHERE id = ?';
        db.query(checkCapacitySql, [flightId], (err, results) => {
            if (err) return callback(err);

            if (results[0].capacity <= 0) {
                return callback(null, { error: 'No available seats' });
            }

            const insertTicketSql = 'INSERT INTO tickets (flight_id, passenger_name) VALUES (?, ?)';
            const updateCapacitySql = 'UPDATE flights SET capacity = capacity - 1 WHERE id = ?';

            db.query(insertTicketSql, [flightId, passengerName], (err, ticketResults) => {
                if (err) return callback(err);

                db.query(updateCapacitySql, [flightId], (err) => {
                    if (err) return callback(err);

                    callback(null, { ticketId: ticketResults.insertId });
                });
            });
        });
    },

    checkIn: (ticketId, callback) => {
        const sql = 'UPDATE tickets SET status = "checked-in" WHERE id = ?';
        db.query(sql, [ticketId], (err, results) => {
            if (err) return callback(err);

            if (results.affectedRows === 0) {
                return callback(null, { error: 'Ticket not found' });
            }

            callback(null, { message: 'Check-in successful' });
        });
    },
};

module.exports = TicketModel;

