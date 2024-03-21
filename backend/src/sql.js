const mysql = require("mysql");

const pool = mysql.createPool({
    host: "food-reservation-system.cs9cryjspw3r.us-east-2.rds.amazonaws.com",
    user: "admin",
    password: "root12345",
    database: "food_reservation_system",
});

module.exports = pool;
