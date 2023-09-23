
const ErrorHandler = require("../utils/errorhandler");
const catchasyncerror = require("./catchasyncerror");
const User = require("../model/usermodel")
const jwt = require("jsonwebtoken")

exports.isAuthenticatedUser = catchasyncerror(async(req,res,next)=>{
    const {token} =  req.cookies;
    // console.log(token)
    if(!token)
    {
        return (next(new ErrorHandler("Please login to access this result",401)))
    }
    if(token)
    {
        const JWT_SECRET = "KJGFSDJKGJFDLKGJHFOIAHJSFKAJHKAJ"
        const decodedData = jwt.verify(token,JWT_SECRET)

        req.user = await User.findById(decodedData.id)
        
        next()
    }

})

exports.authorizeRoles = (...roles) =>{
    // console.log(roles)
    return ((req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return (next(new ErrorHandler(`Role:${req.user.role} is not allowed to use this resource`,403)))
        }
        next()
    })
}
