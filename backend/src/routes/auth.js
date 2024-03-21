const util = require("util");
const express = require("express");
const validator = require("email-validator");

const router = express.Router();

const conn = require("../sql");
const query = util.promisify(conn.query).bind(conn);

router.post("/register", async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        if (!firstName || !lastName || !email || !password)
            return res.status(422).send({ message: "All fields are required!" });

        if (!validator.validate(email))
            return res.status(422).send({ message: "Invalid Email!" });

        const users = await query(
            `SELECT * FROM users WHERE email = ?;`, [email]
        );

        if (users.length)
            return res.status(422).send({ message: "User already registered!" });

        await query(
            `INSERT INTO users VALUES (?, ?, ?, ?, ?, ?)`,
            [null, firstName, lastName, email, password, false]
        );

        res.status(200).send({ message: "Successfully registered!" });
    } catch (err) {
        return res.status(500).send({ message: "Something went wrong!" });
    }
});

router.post("/login/:type", async (req, res) => {
    try {
        const { email, password } = req.body;
        const { type } = req.params;

        if (!email || !password)
            return res.status(422).send({ message: "All fields are required!" });

        const isAdmin = type === 'admin' ? true : false;

        const users = await query(
            `SELECT * FROM users WHERE email = ? AND password = ?;`, [email, password]
        );

        if (!users.length)
            return res.status(422).send({ message: "Invalid credentials!" });

        const user = users[0];

        if (isAdmin && !user['isAdmin'])
            return res.status(422).send({ message: "Invalid credentials!" });

        delete user['password']

        res.status(200).send({ data: user, message: "Successfully logged In!" });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: err });
    }
});

module.exports = router;
