const express = require("express");
const config = require("../config/config.js");
const { Sequelize, QueryTypes } = require("sequelize");
const sequelize = new Sequelize(config.development);
const bodyParser = require("body-parser");
const session = require("express-session");
const fs = require('fs');

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

function trackDuration(getData) {

    let duration;

    for (let i = 0; i < getData.length; i++) {
        let { start_date, end_date } = getData[i];
        start_date = new Date(getData[i].start_date);
        end_date = new Date(getData[i].end_date);

        start_date.setHours(0, 0, 0, 0);
        end_date.setHours(0, 0, 0, 0);

        let dayInMili = 1000 * 60 * 60 * 24;
        let track = Math.round(Math.abs(start_date - end_date) / dayInMili);

        let month;
        let year;

        duration = `${track > 0 ? track : 1} day/s`;

        if (track >= 30 && track <= 31 || track >= 31) {
            month = Math.round(track / 30);
            duration = `${month} month/s`;
            if (month >= 12) {
                year = Math.round(month / 12);
                duration = `${year} year/s`;
            }
        }
    }

    return duration;
}

router.post("/delete/:id", async (req, res) => {
    try {

        const queryGet = `SELECT * FROM public."Projects" WHERE id = ${req.params.id}`;

        const getData = await sequelize.query(queryGet, { type: QueryTypes.SELECT });

        fs.stat(`./public/${getData[0].image}`, function (err, stats) {
            console.log(stats);

            if (err) {
                return console.error(err);
            }

            fs.unlink(`./public/${getData[0].image}`, function (err) {
                if (err) return console.log(err);
                console.log('file deleted successfully');
            });
        });

        const query = `DELETE FROM public."Projects" WHERE id = ${req.params.id};`

        await sequelize.query(query, { type: QueryTypes.DELETE });

        console.log("Success deleting project!");

        res.redirect("/#project");
    } catch (error) {
        console.log("Failed deleting project!");

        res.redirect("/#project");
    }
});

router.post("/edit-project/:id", async (req, res) => {
    try {
        let stack = req.body.stack;

        const query = `UPDATE public."Projects"
	SET name='${req.body.pname}', start_date='${req.body.sDate}', end_date='${req.body.eDate}', description='${req.body.desc}', technologies='${stack > 1 ? stack.join().replace(/,/g, " ") : "-" || stack <= 1 ? stack : "-"}', "createdAt"=NOW(), "updatedAt"=NOW()
	WHERE id = ${req.params.id};`

        await sequelize.query(query, { type: QueryTypes.UPDATE });

        console.log("Success updating project!");

        res.redirect("/#project");
    } catch (error) {
        console.log("Failed updating project!");

        res.redirect("/#project");
    }

})

router.get("/project-detail/:id", async (req, res) => {
    // console.log(req.session.user.id);
    // if (req.session.user) {
    // if (req.session.user.id != req.params) {
    try {
        const query = `SELECT * FROM public."Projects" WHERE id = ${req.params.id}`;

        const getData = await sequelize.query(query, { type: QueryTypes.SELECT });

        const duration = trackDuration(getData);

        for (const dur of getData) {
            dur.duration = duration;
            // dur.image = dur.replace("\\", "/");
        }

        console.log(getData);

        res.render("project-detail.hbs", {
            user: req.session.user,
            data: getData,
            style: "/styles/project-detail.css",
            jscript: "/js/func-project-detail.js"
        });
    } catch (error) {
        res.redirect("/#project");
    }
    // }
    // else {
    //     res.redirect("/nf")
    // }
})

module.exports = router;