const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const urlencodedParser = bodyParser.urlencoded({ extended: false })

try {
    mongoose.connect(process.env.uri, (err) => console.log(err))
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

}