const mongoose = require("mongoose")
const cashSchema = new mongoose.Schema({
    userID:     {type:String},
    products:   {type: Object},
    total:      {type: Number},
    createdAt:  {type: Date , default: Date.now , required: false}
})

const cash = mongoose.model("cash",cashSchema)

module.exports = cash;




/* 
    _id:
    userId:
    productIDs : [ id1 , id2 , id1 ]
    productInfo : [{}]
    total:
*/

/* 
    _id:
    userId:
    productIDs : { 
        id1: {
            name: P1 ,
            count:2 ,
            price:2000 
        } , 
        id2: {
            name: P2 ,
            count:1 ,
            price:1000 
        }
    }
    total: (2*2000) + (1*1000)
*/