const util = require("util");
const express = require("express");

const router = express.Router();

const conn = require("../sql");
const query = util.promisify(conn.query).bind(conn);

router.post("/:userId/:restaurantId", async (req, res) => {
    try {
        const { restaurantId, userId } = req.params;

        if (!restaurantId || !userId)
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

        const favourites = await query(
            `SELECT * FROM favourites WHERE userId = ? AND restaurantId = ?;`, [userId, restaurantId]
        );
        if (favourites.length)
            return res.status(422).send({ message: "Already Added To Favourites!" });

        await query(
            `INSERT INTO favourites VALUES (?, ?, ?)`,
            [null, userId, restaurantId]
        );

        res.status(200).send({ message: "Restaurant Added To Favourites!" });
    } catch (err) {
        return res.status(500).send({ message: "Something went wrong!" });
    }
});


router.get("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        const favourites = await query(
            `SELECT f.id, f.userId, f.restaurantId, r.name, r.location, r.imageUrl, r.rating 
            FROM favourites f LEFT JOIN restaurants r ON f.restaurantId = r.id WHERE f.userId = ? AND r.isVisible = ?`, [userId, 1]
        );

        res.status(200).send({ data: favourites });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: "Something went wrong!" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        await query(
            `DELETE FROM favourites WHERE id = ?`, [id]
        );

        res.status(200).send({ message: 'Removed From Favourites!' });
    } catch (err) {
        return res.status(500).send({ message: "Something went wrong!" });
    }
});

module.exports = router;
