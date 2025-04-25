const mysql2 = require('mysql2');
const dotenv = require('dotenv');

dotenv.config()

const connection = mysql2.createConnection({
    host: process.env.HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})





module.exports = connection