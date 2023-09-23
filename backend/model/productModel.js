const mongoose = require('mongoose')
const {Schema} = mongoose

const productSchema = new Schema ({
    name :{
        type : String,
        required:[true ,"please enter productName"],
        trim :true
    },
    description :{
        type : String,
        required:[true ,"please enter description"],

    },
    price :{
        type : Number,
        required:[true ,"please enter product Price"],
        maxLength:[8,"price cannaot excedd 8 characters"]
    },
    ratings :{
        type : Number,
        default:0
    },
    images:[
       {
        public_id:{
            type :String,
            required:true
        },
         url:{
            type :String,
            required:true
        }
       }
    ],

    category:{
        type :String,
        required :[true,"Please enter Product Category"]
    },
    stock :{
        type : Number,
        required:[true,"please enter stock"],
        maxLength:[4,"Stock cannot excedd 4 characters"],
        default:1,

    },
    numofReviews :{
        type : Number,
         default:0
    },
    reviews:[
        {
            user:{
                type : mongoose.Schema.ObjectId,
                ref : "user",
                required:true
            },
            name : {
                type : String,
                required : true
            },
            rating :{
                type : Number,
                required : true,
            },
            comment:{
                type:String,
                required:true
            }

        }
    ],
    user:{
        type : mongoose.Schema.ObjectId,
        ref : "user",
        required:true
    },
    createdAt :{
        type : Date,
        default:Date.now(),
    }

})


module.exports = mongoose.model("Product",productSchema)