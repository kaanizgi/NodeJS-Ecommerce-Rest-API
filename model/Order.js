const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    products:[
        {
        productId:{
            type:String
        },
        quantity:{
            type:Number,
            default:1
        }
    }],
    amaunt:{
        type:Number,
        required:true
    },
    adress:{type:Object,required:true},
    status:{type:String,default:"pending"}
  
    
    
},{timestamps:true});

module.exports = mongoose.model("Order",orderSchema)