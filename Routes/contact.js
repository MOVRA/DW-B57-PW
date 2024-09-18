const express = require("express");
const session = require("express-session");
const env = require("dotenv");

const router = express.Router();

env.config();

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


router.get("/contact", (req, res) => {
    res.render("contact.hbs", {
        user : req.session.user,
        style: "/styles/contact.css",
        jscript: "/js/func-contact.js"
    });
})

module.exports = router;