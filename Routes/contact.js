const express = require("express");

const router = express.Router();

router.get("/contact", (req, res) => {
    res.render("contact.hbs", {
        style: "/styles/contact.css",
        jscript: "/js/func-contact.js"
    });
})

module.exports = router;