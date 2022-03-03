const express = require("express")
const app = express()
const routes = require("./controllers/routes")





app.set("view engine", "ejs")


app.get("/", (req, res) => res.render("index"))

routes(app)

app.listen(3000, () => console.log("Now listening..."))