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
        },
        bio : String
    })

    const users = mongoose.model("users", userSchema)


    //creating new user
    app.post("/add", urlencodedParser, (req, res) => {
        let name = req.body.name

        let newUser = new users({username : name})
        newUser.save((err, data) => {
            if(err) throw err
            res.json(data)
        })
    })


    //getting a user's info using id
    app.get("/getUser/:id", (req, res) => {
        let id = req.params.id

        users.findById({_id : id}, (err, data) => {
            if(err) throw err

            res.json(data)
        })
            
      
    })


    //getting the list of users in a database
    app.get("/getUsers", (req, res) => {
        users.find({}, (err, data) => {
            if(err) throw err
            res.json(data)
        })
    })


    //deleting a user based on id input
    app.get("/delete/:id", (req, res) => {
        let id = req.params.id
        
        users.findByIdAndDelete({_id : id}, (err, data) => {
            if(err) res.json("Error")
            res.json(`deleted user : ${data._id} successfully`)
        })
    })


    //updating a user bio based on the id input
    app.post("/updateUser", urlencodedParser, (req, res) => {
        const {userid, update} = req.body

        users.findByIdAndUpdate({_id : userid}, {bio : update}, {upsert : true}, (err, data) => {
            if(err) throw err
            res.json(`updated user by id : ${userid}`)
        })
    })
        

}