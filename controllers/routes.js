const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const urlencodedParser = bodyParser.urlencoded({ extended: false })

require("dotenv").config()

try {
    mongoose.connect(process.env.URI, (err) => console.log(err))
} catch (error) {
    if(error) throw err
}

module.exports = function routes(app) {
    const userSchema = new mongoose.Schema({
        username : {
            type : String,
            required : true
        }
    })

    const users = mongoose.model("users", userSchema)

    app.post("/add", urlencodedParser, (req, res) => {
        let name = req.body.name

        let newUser = new users({username : name})
        newUser.save((err, data) => {
            if(err) throw err
            res.json(data)
        })
    })

    app.get("/getUsers", (req, res) => {
        users.find({}, (err, data) => {
            if(err) throw err
            res.json(data)
        })
    })

    app.delete("/delete/:id", (req, res) => {
        let id = req.params.id
        
        users.findByIdAndDelete({_id : id}, {new : true}, (err, data) => {
            if(err) res.json("Error")
            res.json(`deleted user : ${id} successfully`)
        })
    })
        

}