const util = require("util");
const express = require("express");

const router = express.Router();

const conn = require("../sql");
const query = util.promisify(conn.query).bind(conn);

router.post("/", async (req, res) => {
    try {
        const { name, location, imageUrl } = req.body;

        if (!name || !location || !imageUrl)
            return res.status(422).send({ message: "All fields are required!" });

        await query(
            `INSERT INTO restaurants VALUES (?, ?, ?, ?, ?, ?)`,
            [null, name, location, imageUrl, 0.0, 1]
        );

        res.status(200).send({ message: "Successfully Added Restaurant!" });
    } catch (err) {
        return res.status(500).send({ message: "Something went wrong!" });
    }
});


router.get("/", async (req, res) => {
    try {
        const restaurants = await query(
            `SELECT * FROM restaurants WHERE isVisible = 1;`
        );

        res.status(200).send({ data: restaurants });
    } catch (err) {
        return res.status(500).send({ message: "Something went wrong!" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, location, imageUrl } = req.body;

        await query(
            'UPDATE restaurants SET name = ?, location = ?, imageUrl = ? WHERE id = ?',
            [name, location, imageUrl, id]
        );

        res.status(200).send({ message: 'Restaurant Updated!' });
    } catch (err) {
        return res.status(500).send({ message: "Something went wrong!" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        await query(
            `UPDATE restaurants SET isVisible = ? WHERE id = ?`, [0, id]
        );

        res.status(200).send({ message: 'Restaurant Deleted!' });
    } catch (err) {
        return res.status(500).send({ message: "Something went wrong!" });
    }
});

module.exports = router;
