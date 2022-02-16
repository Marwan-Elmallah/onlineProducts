require("dotenv").config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const port = process.env.PORT || 6096
const productRoute = require("./Routes/product.js")
const userRoute = require("./Routes/user.js")
//to read JSON file from input
app.use(express.json())
app.use(express.urlencoded({extended:true}))
//to use passport
// const passport = require("passport")
// app.use(passport.initialize());
// app.use(passport.session());
// const passportConfig = require("./config/passport")
// passportConfig(passport)
// const session = require("express-session")
// app.use(session({secret:"any text"}))

app.set("views","./Views")
app.set("view engine","pug")
app.use("/",userRoute)
app.use("/products",productRoute)
app.use(express.static('Views'))


mongoose.connect(
    process.env.CONNECTION_STRING,
    {useNewUrlParser:true, useUnifiedTopology:true},
    () => {
        console.log("Conected to DB")
    }
)



app.listen(port, ()=> {console.log(`http://localhost:${port}`)})