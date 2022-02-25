const express = require("express")
const app = express()
app.set("view engine", "ejs")
require("dotenv").config()

app.get("/", (req, res) => res.render("index"))


app.listen(3000, () => console.log("Listening at PORT 3000"))