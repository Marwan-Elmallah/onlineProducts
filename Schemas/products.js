const mongoose = require("mongoose")
const productSchema = new mongoose.Schema({
    name:           {type: String , required: true},
    price:          {type: Number , required: true},
    store:          {type: String , default: "NONE"},
    description:    {type: String , default: "NONE"},
    createdAt:      {type: Date , default: Date.now}
})

const product = mongoose.model("item",productSchema)

module.exports = product;