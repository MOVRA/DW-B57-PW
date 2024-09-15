const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));

router.get("/testimoni", async (req, res) => {
    try {
        const response = await axios(`https://api.npoint.io/18a92ef2894254320033`);
        const result = response.data;
        res.render("testimoni.hbs", {
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
            filter_rating: true,
            data: data,
            style: "/styles/testimoni.css",
        });
    } catch {
        res.render("testimoni.hbs", {
            filter_rating: false,
            data: data,
            style: "/styles/testimoni.css",
        });
    }
});

module.exports = router;