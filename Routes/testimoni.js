const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const session = require("express-session");
const env = require("dotenv");

const router = express.Router();

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

router.use(bodyParser.urlencoded({ extended: true }));

router.get("/testimoni", async (req, res) => {
    try {
        const response = await axios(`https://api.npoint.io/18a92ef2894254320033`);
        const result = response.data;
        res.render("testimoni.hbs", {
            user: req.session.user,
            filter_rating: false,
            rating: "All",
            data: result,
            style: "/styles/testimoni.css",
        });
    } catch (error) {
        res.redirect("/testimoni");
    }
});

router.get("/testimoni/rating/:rating", async (req, res) => {
    const rating = req.params.rating;
    const data = [];
    try {
        const response = await axios(`https://api.npoint.io/18a92ef2894254320033`);
        const result = response.data;
        for (const item of result) {
            if (item.rating == rating) {
                data.push(item);
            }
        }
        console.log(data);
        res.render("testimoni.hbs", {
            user : req.session.user,
            filter_rating: true,
            data: data,
            style: "/styles/testimoni.css",
        });
    } catch {
        res.render("testimoni.hbs", {
            user: req.session.user,
            filter_rating: false,
            data: data,
            style: "/styles/testimoni.css",
        });
    }
});

module.exports = router;