const util = require("util");
const express = require("express");

const router = express.Router();

const conn = require("../sql");
const query = util.promisify(conn.query).bind(conn);

router.post("/:userId/:restaurantId", async (req, res) => {
    try {
        const { restaurantId, userId } = req.params;

        const { rating, message } = req.body;

        if (!restaurantId || !userId || !rating || !message)
            return res.status(422).send({ message: "All fields are required!" });

        if (rating < 1 || rating > 5)
            return res.status(422).send({ message: "Rating Scale is 1-5!" });

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

        const reviews = await query(
            `SELECT * FROM reviews WHERE userId = ? AND restaurantId = ?;`, [userId, restaurantId]
        );

        if (reviews.length)
            return res.status(422).send({ message: "Already Reviewed!" });

        await query(
            `INSERT INTO reviews VALUES (?, ?, ?, ?, ?)`,
            [null, userId, rating, message, restaurantId]
        );

        const reviewsInfo = await query(
            `SELECT SUM(rating) rating, COUNT(*) count FROM reviews WHERE restaurantId = ?;`, [restaurantId]
        );
        const review = reviewsInfo[0];

        const newRating = (review.rating) / (review.count)

        await query(
            'UPDATE restaurants SET rating = ? WHERE id = ?',
            [newRating, restaurantId]
        );

        res.status(200).send({ message: "Review Saved!" });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: "Something went wrong!" });
    }
});


router.get("/:restaurantId", async (req, res) => {
    try {
        const { restaurantId } = req.params;

        const reviews = await query(
            `SELECT * FROM reviews WHERE restaurantId = ?`, [restaurantId]
        );

        res.status(200).send({ data: reviews });
    } catch (err) {
        return res.status(500).send({ message: "Something went wrong!" });
    }
});

module.exports = router;
