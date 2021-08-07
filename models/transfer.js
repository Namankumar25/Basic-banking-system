const mongoose = require("mongoose")

const transferMoney = mongoose.Schema({
    senderemail:{
        type:String,
        required:true
    },
    recieveremail:{
        type:String,
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
})

const transferAmount = mongoose.model("transfer",transferMoney)
module.exports = transferAmount