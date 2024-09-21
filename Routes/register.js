const express = require("express");
const config = require("../config/config");
const { Sequelize, QueryTypes } = require("sequelize");
// const sequelize = new Sequelize(config.development);
const bodyParser = require("body-parser");
const userModel = require("../models").User
const bcrypt = require("bcrypt");
const env = require("dotenv");

const router = express.Router();

env.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: { ssl: { require: true } },
});

router.use(bodyParser.urlencoded({ extended: true }));

router.post("/register", async (req, res) => {
    console.log(req.body);
    try {

        const hashedPw = await bcrypt.hash(req.body.password, 10)

        await userModel.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPw,
        });

        console.log("Success registering user!");

        res.redirect("/login");
    } catch (error) {
        console.error(error);
        res.redirect("/register");
    }

})

router.get("/register", (req, res) => {
    res.render("register.hbs", {
        style: "/styles/register.css"
    });
});

module.exports = router;