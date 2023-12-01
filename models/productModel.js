const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'A product must have a name'],
        unique:true,
    },
    price:{
        type:Number,
        required:[true,'A product must have a price'],
        validate:{
            validator:function(){
                return this.price>0
            },
            message:'Price must be greater than 0'
        }
    },
    categories:{
        required:[true,'A product must have a category'],
        type:[String],
    },
    images:{
        type:[String]
    },
    discount:{
       type:Number, 
       validate:{
              validator:function(){
                return this.discount<this.price
              },
              message:'Discount must be less than price'
       }
    }
})

const Product = mongoose.model('Product',productSchema)

module.exports = Product