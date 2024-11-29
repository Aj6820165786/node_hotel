import mongoose from "mongoose";

const menuSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required : true
    },
    taste:{
        type:String,
        enum: ['sweet','spicy','sour']
    },
    is_drink:{
        type: Boolean,
        default: false
    },
    ingredients:{
        type:[String],
        default:[]
    },
    num_sale:{
        type:Number,
        default: 0
    }
})


export const Menu = mongoose.model('Menu',menuSchema)