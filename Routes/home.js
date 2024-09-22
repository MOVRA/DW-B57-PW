const express = require("express");
const config = require("../config/config");
const { Sequelize, QueryTypes } = require("sequelize");
const sequelize = new Sequelize(config.production);
const bodyParser = require("body-parser");
const projectModel = require("../models").Project;
const session = require("express-session");
const env = require("dotenv");
const multer = require("multer");
const upload = multer({ dest: 'public/uploads/' })

const router = express.Router();

env.config();

// const sequelize = new Sequelize(process.env.DATABASE_URL_UNPOOLED, {
//     dialectOptions: { ssl: { require: true } },
// });

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

function trackDuration(getData) {

    let duration = [];

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

        duration.push(track);

        duration[i] = `${track > 0 ? track : 1} day/s`;

        if (track >= 30 && track <= 31 || track >= 31) {
            month = Math.round(track / 30);
            duration[i] = `${month} month/s`;
            if (month >= 12) {
                year = Math.round(month / 12);
                duration[i] = `${year} year/s`;
            }
        }
    }

    return duration;
}

router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                res.status(400).send('Unable to log out')
            } else {
                res.redirect("/");
            }
        });
    } else {
        res.redirect("/");
    }
})

router.post("/delete/:id", async (req, res) => {
    if (req.session) {
        try {
            let result = await projectModel.findOne({
                where: {
                    id: res.params.id,
                },
            });

            if (!result) return res.render("not-found");

            await projectModel.destroy({
                where: {
                    id: req.params.id,
                },
            });

            console.log("Success deleting project!");

        } catch (error) {
            console.log("Failed deleting project!")
            res.redirect("/#project");
        }
    }
    else {
        res.redirect("/login");
    }
});

router.post("/add-project", upload.single('file'), async (req, res) => {
    console.log(req.body, req.file);
    try {
        const stack = req.body.stack;

        await projectModel.create({
            name: req.body.pname,
            start_date: req.body.sDate,
            end_date: req.body.eDate,
            description: req.body.desc,
            technologies: stack ? stack.join().replace(/,/g, " ") : "-",
            image: req.file.path.slice(7, req.file.path.length).replaceAll("\\", "/"),
            user_id: req.session.user.id,
            username: req.body.username
        })

        console.log("Success inserting data!");

        res.redirect("/#project");
    } catch (error) {
        console.log("Failed inserting data!");

        res.redirect("/#project");
    }
})

router.get("/", async (req, res) => {
    try {
        const getData = await projectModel.findAll();

        const duration = trackDuration(getData);

        console.log(getData);

        for (let i = 0; i < getData.length; i++) {
            getData[i].duration = duration[i];
        }

        res.render("index.hbs", {
            data: getData,
            user: req.session.user,
            style: "/styles/index.css",
            jscript: "/js/func-index.js"
        });

        console.log(req.session);

    } catch (error) {
        res.render("index.hbs", {
            user: null,
            data: null,
            style: "/styles/index.css",
            jscript: "/js/func-index.js"
        });
    }
});

module.exports = router;