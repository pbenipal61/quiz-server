const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'Quiz',
    password: 'Theprodigyclub1'
});

module.exports = pool.promise();