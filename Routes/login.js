const express = require("express");
const config = require("../config/config");
const { Sequelize, QueryTypes, where } = require("sequelize");
const sequelize = new Sequelize(config.production);
const bodyParser = require("body-parser");
const userModel = require("../models").User
const bcrypt = require("bcrypt");
const session = require("express-session");
const env = require("dotenv");

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(
    session({
        name: "my-session",
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24,
        },
    })
);

router.post("/login", async (req, res) => {
    try {
        const user = await userModel.findOne({
            where: {
                email: req.body.email
            }
        });

        if (!user) {
            return res.redirect("/");
        }

        // console.log(req.body.password);

        const validPassword = await bcrypt.compare(req.body.password, user.password);

        if (!validPassword) {
            return res.redirect("/login");
        }

        req.session.user = user;

        // console.log(req.session.user);

        res.redirect("/");
    } catch (error) {
        res.redirect("/login");
    }
});

router.get("/login", (req, res) => {
    res.render("login.hbs", {
        style: "/styles/login.css"
    });
});

module.exports = router;