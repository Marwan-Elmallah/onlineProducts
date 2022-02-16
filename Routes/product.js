const express = require("express")
const router = express.Router();
const product = require("../Schemas/products.js")
const Cash = require("../Schemas/cash.js");
const users = require("../Schemas/users.js")
// router.post("/ADD", async (req,res) => {
//     const body = req.body
//     const newProduct = new product({
//         name:  body.name,
//         price: body.price,
//         store: body.store,
//         description: body.description,
//         createdAt: body.createdAt
//     })
//     const response = await newProduct.save().catch( (e) => {console.log(e)} )
//     res.send(response)
// })

//Main Page
router.get("/home", async (req,res) => {
    const title = "Home";
    const products = await product.find()
    const user = await users.find()
    const cash = await Cash.find()
    res.render("../Views/home.pug",{products,title})
})
//add items
router.post("/add", async (req,res) => {
    const body = req.body
    const newProduct = new product({
        name:  body.name,
        price: body.price,
        store: body.store,
        description: body.description,
        createdAt: body.createdAt
    })
    const response = await newProduct.save().catch( (e) => {console.log(e)} )
    res.redirect("/products/home")
})
//add page
router.get("/Add", (req,res) => {
    const title = "Add Item";
    const products = product.find()
    res.render("../Views/add.pug",{products,title})
})
//select product to edit
router.get("/edit/:id" , async (req,res) => {
    const id = req.params.id
    const products = await product.findById(id)
    res.render("../Views/edit.pug",{products})
})
//update after editting
router.post("/:id", async (req,res) => {
    const id = req.params.id
    const body = req.body
    //await console.log(body)
    const result = await product.findOneAndUpdate({_id:id},body, {new:true})
    res.redirect("/products/home")
})

router.post("/del/:id", async (req,res) => {
    const id = req.params.id
    const response = await product.deleteOne({"_id" : id})
    res.redirect("/products/home")
})



module.exports = router;