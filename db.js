const mysql = require('mysql2');

const mysql = require('mysql2');
require('dotenv').config(); 

const db = mysql.createPool({
    host: process.env.DB_HOST,         
    user: process.env.DB_USER,        
    password: process.env.DB_PASSWORD, 
    database: process.env.DB_NAME,      
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

/*const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '12Sel*N3',
    database: 'flight_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
*/

db.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
        return;
    }
    console.log('Connected to the MySQL database!');
    connection.release();
});

module.exports = db;



