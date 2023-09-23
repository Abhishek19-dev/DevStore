const Product = require("../model/productModel")
const ErrorHandler = require("../utils/errorhandler")
const catchasyncerror = require("../middleware/catchasyncerror")
const ApiFeatures = require("../utils/apifeatures")

//Create a product --Admin
// exports.createProduct = async(req,res,next)=>{
//     const product = await Product.create(req.body)
//     res.status(201).json({
//         success:true,
//         product
//     })
// }
exports.createProduct = catchasyncerror(async(req,res,next)=>{
    req.body.user = req.user.id
    const product = await Product.create(req.body)
    res.status(201).json({
        success:true,
        product
    })
})

//Get All Products
exports.getAllProducts = catchasyncerror(async(req,res) =>{

const resultPerPage = 8;
const productCount = await Product.countDocuments()
  const apiFeature =  new ApiFeatures(Product.find(),req.query).search().filter()
  apiFeature.pagination(resultPerPage);
  let products =  await apiFeature.query
   //http://localhost:9050/api/v1/products?keyword=samosa
    // const products =  await Product.find()
    await res.status(200).json({
    success:true,
        products,
        productCount,
        resultPerPage,
    });
})

//aisa bhi krskte hai
//get product details
// exports.getProductDetails = async(req,res)=>{
//     let product = await Product.findById(req.params.id)
//     if(!product){
//         res.status(500).json({
//             success:false,
//             message:"product not find"
//         })
//         }
//     res.status(200).json({
//         success:true,
//          product
//     })
// }

exports.getProductDetails = catchasyncerror(async(req,res,next)=>{
    let product = await Product.findById(req.params.id)
    if(!product){
        return (next(new ErrorHandler("Product Not Found",404)))
        }
    res.status(200).json({
        success:true,
         product 
    })
})

//update product --admin
exports.updateProduct = catchasyncerror(async(req,res,next) => {
    let product = await Product.findById(req.params.id)
     req.body.reviews.user = req.user._id
    if(!product)
    {
        return (next(new ErrorHandler("Product Not Found",404)))
        }
      
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
    })
    res.status(200).json({
        success:true,
        product
    })
})


exports.deleteProduct = catchasyncerror(async (req,res,next) =>{
    let product = await Product.findById(req.params.id)
    if(!product)
    {
        return (next(new ErrorHandler("Product Not Found",404)))
        }
    const id = req.params.id;
    // Product.deleteOne({_id:id})
  product = await Product.findByIdAndDelete(req.params.id)
   res.status(200).json({
    success:true,
    message :"product deleted successfully"
})
})

//Create and update the review:-
exports.createProductReview = catchasyncerror(async(req,res,next)=>{
    const {rating,comment,productId} = req.body
   
    const review = {
        user : req.user._id,
        name : req.user.name,
        rating : Number(rating),
        comment
    }
    
    const product = await Product.findById(productId)

    const isReviewed = product.reviews.find(rev=>{
       return rev.user.toString() === req.user._id.toString()
    })
//  console.log(isReviewed)
    if(isReviewed){
       product.reviews.forEach((rev)=>{
           if(rev.user.toString() == req.user._id.toString())
           {
               rev.rating = rating,
               rev.comment = comment
           }
       })
    }

    else{
        product.reviews.push(review)
        product.numofReviews = product.reviews.length
    }
     
    let avg = 0;
   product.reviews.forEach((rev)=>{
        avg = (avg+rev.rating)
    })

    product.ratings = avg/product.reviews.length;

    await product.save({validateBeforeSave:false})

    res.status(200).json({
        success:true,
    })
})


//Get all reviews of a single product 
exports.getProductReviews = catchasyncerror(async(req,res,next)=>{
   const product = await Product.findById(req.query.id)
       
   if(!product)
   {
       return (next(new ErrorHandler("Product Not Found",404)))
    }

    res.status(200).json({
        success:true,
        reviews : product.reviews
    })
})

//Delete a review
exports.deleteReview = catchasyncerror(async(req,res,next)=>{
   const product = await Product.findById(req.query.productId)

   if(!product)
   {
       return (next(new ErrorHandler("Product Not Found",404)))
    }
const reviews =  product.reviews.filter((rev)=> rev._id.toString() !== req.query.id.toString())
console.log(reviews)
//  const reviews = await Product.reviews.findByIdAndDelete(req.query.id)

//  await product.reviews.push(reviews)

//  let avg = 0;
// reviews.forEach((rev)=>{
//       avg = (avg+rev.rating)
//   })
let ratings = 0;

  let avg = 0;
  if (reviews.length > 0) {
    reviews.forEach((rev) => {
          avg = (avg + rev.rating);
      });
     product.ratings = avg / product.reviews.length;
  } else {
   product.ratings = 0; // Set a default value in case there are no reviews.
  }
  const numofReviews = reviews.length;  
// const ratings = avg/reviews.length;


product.numofReviews = reviews.length;

product.reviews = reviews;

await product.save();


  res.status(200).json({
      success:true,
      reviews
  })
})