const express = require("express")
const router = express.Router();
// const mongoose = require("mongoose")
const user = require("../Schemas/users.js")
const bcrypt = require('bcrypt');
// const passport = require("passport")

router.post("/logging", async (req,res) => {
    // passport.authenticate("local", {
    //     successRedirect: "/products/home",
    //     failureRedirect: "/",
    //     session: true
    // })(req,res);
    const userName = req.body.username;
    const Password = req.body.password;
    const id = await user.findOne({username:userName}, "_id")
    const pass = await user.findById(id)
    if(id && pass.password == Password){
        res.redirect("/products/home")
    }else{
        console.log("Please Check for correct input")
        res.redirect("/")
    }
})

router.get("/", async (req,res) => {
    const users = await user.find()
    res.render("../Views/index.pug",{users})
})

router.get("/signUp", async (req,res) => {
    const users = await user.find()
    res.render("../Views/signUp.pug",{users})
})

router.post("/SIGNUP", async (req,res) => {
    const body = req.body;
    const newUser = new user({
        name:      body.name,
        privleage: body.level,
        password:  body.password,
        username:  body.username,
        Mobile:    body.mobile
    })

    bcrypt.hash(newUser.password,10, (err,hash) =>{
        if(err){
            console.error(err)
        }else{
            newUser.password = hash
        }
    })

    // console.log(await user.exists({username: newUser.username}))
    if(await user.exists({username: newUser.username})){
        res.send("Sorry is an exist username")
    }else{
        const response = await newUser.save().catch( (e) => {console.log(e)} )
        res.send(response)
    }
})

router.get("/listUsers", async (req,res) => {
    const users = await user.find()
    res.render("../Views/users.pug",{users})
})


router.get("/edit/:id" , async (req,res) => {
    const id = req.params.id
    const users = await user.findById(id)
    res.render("../Views/editUser.pug",{users})
})
//update after editting
router.post("/:id", async (req,res) => {
    const id = req.params.id
    const body = req.body
    console.log(body)
    const result = await user.findOneAndUpdate({_id:id},body, {new:true})
    console.log(result)
    res.redirect("/listUsers")
})

router.post("/del/:id", async (req,res) => {
    const id = req.params.id
    const response = await user.deleteOne({_id : id})
    res.redirect("/listUsers")
})





// router.post("/add", async (req,res) => {
//     const body = req.body
//     const newusers = new users({
//         name:  body.name,
//         price: body.price,
//         store: body.store,
//         description: body.description,
//         createdAt: body.createdAt
//     })
//     const response = await newusers.save().catch( (e) => {console.log(e)} )
//     res.redirect("/users/home")
// })

module.exports = router;


// let auto = () => {
//     bcrypt.hash("123456", 10, function(err, hash) {
//         // Store hash in your password DB.
//         console.log(hash)
//     });
// }