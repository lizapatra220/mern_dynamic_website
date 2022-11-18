const express = require("express");
require("./db/conn");
const path = require("path");
const User = require("./models/usermessage");
const hbs = require("hbs");
const app = express();
const port = process.env.PORT || 3000;

//setting path
const static_path = path.join(__dirname, "../public");
const templatepath = path.join(__dirname, "../templates/views");
const partialpath = path.join(__dirname, "../templates/partials");

//middleware
app.use(
  "/css",
  express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js"))
);
app.use(
  "/jq",
  express.static(path.join(__dirname, "../node_modules/jquery/dist"))
);

app.use(express.static(static_path));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "hbs");
app.set("views", templatepath);
hbs.registerPartials(partialpath);

//routing
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/contact", (req, res) => {
  res.render("contact");
});
app.post("/contact", async (req, res) => {
  try {
    // res.send(req.body);
    const Userdata = new User(req.body);
    await Userdata.save();
    res.status(201).render("index");
  } catch (error) {
    res.status(404).send(error);
  }
});
//server create
app.listen(port, () => {
  console.log(`our connection at port no ${port}`);
});
