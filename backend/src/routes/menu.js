const util = require("util");
const express = require("express");

const router = express.Router();

const conn = require("../sql");
const query = util.promisify(conn.query).bind(conn);

router.post("/:restaurantId", async (req, res) => {
    try {
        const { restaurantId } = req.params
        const { item, price } = req.body;

        if (!restaurantId || !item || !price)
            return res.status(422).send({ message: "All fields are required!" });

        await query(
            `INSERT INTO menus VALUES (?, ?, ?, ?)`,
            [null, restaurantId, item, price]
        );

        res.status(200).send({ message: "Successfully Added Menu Item!" });
    } catch (err) {
        return res.status(500).send({ message: "Something went wrong!" });
    }
});


router.get("/:restaurantId", async (req, res) => {
    try {
        const { restaurantId } = req.params;

        const restaurants = await query(
            `SELECT * FROM menus WHERE restaurantId = ?;`, [restaurantId]
        );

        res.status(200).send({ data: restaurants });
    } catch (err) {
        return res.status(500).send({ message: "Something went wrong!" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { item, price } = req.body;

        await query(
            'UPDATE menus SET item = ?, price = ? WHERE id = ?',
            [item, price, id]
        );

        res.status(200).send({ message: 'Meny Item Updated!' });
    } catch (err) {
        return res.status(500).send({ message: "Something went wrong!" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        await query(
            `DELETE FROM menus WHERE id = ?`, [id]
        );

        res.status(200).send({ message: 'Menu Item Deleted!' });
    } catch (err) {
        return res.status(500).send({ message: "Something went wrong!" });
    }
});

module.exports = router;
