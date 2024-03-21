const util = require("util");
const express = require("express");

const router = express.Router();

const conn = require("../sql");
const query = util.promisify(conn.query).bind(conn);

router.post("/", async (req, res) => {
    try {
        const { restaurantId, userId, timestamp } = req.body;

        if (!restaurantId || !userId || !timestamp)
            return res.status(422).send({ message: "All fields are required!" });

        const restaurants = await query(
            `SELECT * FROM restaurants WHERE id = ?;`, [restaurantId]
        );
        if (!restaurants.length)
            return res.status(422).send({ message: "Invalid Restaurant Id!" });

        const users = await query(
            `SELECT * FROM users WHERE id = ?;`, [userId]
        );
        if (!users.length)
            return res.status(422).send({ message: "Invalid User Id!" });

        await query(
            `INSERT INTO bookings VALUES (?, ?, ?, ?)`,
            [null, userId, restaurantId, timestamp]
        );

        res.status(200).send({ message: "Tabled Booked!" });
    } catch (err) {
        return res.status(500).send({ message: "Something went wrong!" });
    }
});


router.get("/:type/:id", async (req, res) => {
    try {
        const { id, type } = req.params;

        let bookings = null;
        if (type == 'user') {
            bookings = await query(
                `SELECT b.id, b.userId, b.restaurantId, b.timestamp, r.name, r.location, r.imageUrl, r.rating 
                FROM bookings b LEFT JOIN restaurants r ON b.restaurantId = r.id WHERE b.userId = ?`, [id]
            );
        } else if (type == 'admin') {
            bookings = await query(
                `SELECT res.*, CONCAT(u.firstname, ' ', u.lastname) as userName from (SELECT b.id, b.userId, b.restaurantId, b.timestamp, r.name, r.location, r.imageUrl, r.rating 
                FROM bookings b LEFT JOIN restaurants r ON b.restaurantId = r.id WHERE b.restaurantId = ?) as res LEFT JOIN 
                users u ON res.userId = u.id`, [id]
            );
        } else
            res.status(422).send({ message: 'Invalid User Type!' });

        res.status(200).send({ data: bookings });
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: "Something went wrong!" });
    }
});

module.exports = router;
