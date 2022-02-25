const express = require("express")
const app = express()

app.set("view engine", "ejs")
require("dotenv").config()

app.get("/", (req, res) => res.render("index"))



const routes = require("./controllers/routes")
routes(app)



app.listen(3000, () => console.log("Listening at PORT 3000"))