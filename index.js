const express = require("express")
const hbs = require('hbs');

const home = require("./Routes/home.js");
const contact = require("./Routes/contact.js");
const testimoni = require("./Routes/testimoni.js");
const project_detail = require("./Routes/project-detail.js");
const login = require("./Routes/login.js");
const register = require("./Routes/register.js");

const path = require("path");

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));

const viewPath = path.join(__dirname, "views");
app.set('view engine', 'hbs');
app.set("views", viewPath);
const partialsPath = path.join(__dirname, "views/partials");
hbs.registerPartials(partialsPath);

app.use(register);

app.use(login);

app.use(project_detail);

app.use(testimoni);

app.use(contact);

app.use(home);

app.use((req, res, next) => {
    res.status(404).render("404.hbs", { style: "/styles/index.css" });
})

app.listen(port, () => {
    console.log(`Server is running!`);
});