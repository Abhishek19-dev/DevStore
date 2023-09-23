const ErrorHandler = require("../utils/errorhandler")
const catchasyncerror = require("../middleware/catchasyncerror")

const User = require('../model/usermodel');
const sendToken = require("../utils/jwtToken");
const {sendEmail , buyProjectMail} = require("../utils/sendEmail.js")

const crypto = require('crypto');
const { getDataUri } = require("../utils/dataUrl");

const cloudinary = require('cloudinary').v2
//Register a User:-
exports.registerUser = catchasyncerror(async(req,res,next)=>{


    const {name , email , password} = req.body;
    const file = req.file
//   console.log("file",file)
    // console.log(file)
    const fileUri = getDataUri(file)
 
    const myCloud = await cloudinary.uploader.upload(fileUri.content,{
        folder:"avatars",
        width:150,
        crop:"scale"
    })

    const user = await User.create({
         name,email,password,
         avatar :{
             public_id : myCloud.public_id,
             url : myCloud.secure_url,

            // public_id : "my_profile",
            //  url : "ProfilePioUrl",
         }
    })
    // const token = user.getJWTToken();
    // res.status(200).json({
    //     success : true,
    //     token
    // })
    sendToken(user , 200 , res)
})


//Login User:-
exports.loginUser = catchasyncerror(async(req,res,next)=>{

    const {email,password} = req.body;

    //checking if user has given both email and password:-
    if(!email && !password)
    return (next(new ErrorHandler("please enter email and password",400)));

    const user = await User.findOne({"email":email}).select("+password")//include password //password findOne ke andr issiliye nhi likha kyunki wo select = false hai
   //user has email and password
    if(!user){
        return (next(new ErrorHandler("Invalid email and password",401)));
    }
    
    const isPasswordMatched = await user.comparePassword(password)
    if(!isPasswordMatched){
        return (next(new ErrorHandler("Invalid email and password",401)));
    }
    // ye cookie mei store krdiya
    // const token = user.getJWTToken();
    // res.status(200).json({
    //     success : true,
    //     token
    // })
   sendToken(user,200,res)  
  
})

//LogOut User
exports.logout = catchasyncerror(async(req,res,user)=>{
     
    
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true
    }),

    
    user={}
    res.status(200).json({
        success:true,
        message : "LOGGED_OUT Successfully",
        user
    })
})


//Forgot Password:-
exports.forgotPassword = catchasyncerror(async(req,res,next)=>{

    const user = await User.findOne({"email":req.body.email})

    if(!user){
        return next(new ErrorHandler("User Not found ",404))
    }

    //Get ResetPasswordToken
    const resetToken = user.getResetPasswordToken()

    //reset password hogya ab usko save kro 
   await user.save({validateBeforeSave:false})

   //mail ke through link bhejna
//    const resetPasswordUrl = `http://localhost/api/v1/password/reset/${resetToken}`//kya pta host aur http kya hai
   const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`

    const message = `Your Password reset Token is :- \n ${resetPasswordUrl} \n\n If you have not requested this email , Please ignore this`;

    try {
        
        await sendEmail({
           email : user.email,
           subject : `Ecommerce password Recovery`,
           message
        })
       res.status(200).json({
           success:true ,
           message : `Email sent to ${user.email} successfully`
       })
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({validateBeforeSave:false})
        return (next(new ErrorHandler(error.message),500))
    }
})

//Reset Password
exports.resetPassword = catchasyncerror(async(req,res,next)=>{

    //creating token hash
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex")

    const user = await User.findOne({"resetPasswordToken":resetPasswordToken , resetPasswordExpire : {$gt : Date.now()}})

    if(!user){
        return next(new ErrorHandler("Reset Token is invalid and has been expired",404))
    }

    if(req.body.password != req.body.confirmPassword)
    {
        return next(new ErrorHandler("Password doesnt match",404))
    }

    user.password = req.body.password
    user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();
        sendToken(user , 200 , res)
})


//Get User Details:-
exports.getUserDetails = catchasyncerror(async(req,res,next)=>{
           const user =  await User.findById(req.user._id)

           if(!user)
           {
               return next(new ErrorHandler("user id is wrong",400))
           }

           res.status(200).json({
               success:true,
               user
           })
})


//Get Change Password:-
exports.updatePassword = catchasyncerror(async(req,res,next)=>{
    const user =  await User.findOne({_id:req.user.id}).select("+password")
    if(!user)
    {
        return next(new ErrorHandler("user id is wrong",400))
    }
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword)

    if(!isPasswordMatched){
        return (next(new ErrorHandler("Old password is incorrect",401)));
    }
    
    if(req.body.newPassword !== req.body.confirmNewPassword){
        return (next(new ErrorHandler(" New Password Doesnt Match",400)))
    }
    user.password = req.body.newPassword
    await user.save()
    
    res.status(201).json({
        success:true,
        message:"Password Updated Successfully"
    })
    
})

//update profile :-
exports.updateProfile = (catchasyncerror(async(req,res,next)=>{

    const newUser = {
        name : req.body.name,
        email : req.body.email,
        phoneNo : req.body.phoneNo,
        whatsAppNo : req.body.whatsAppNo,
        address : req.body.address,
        bio : req.body.bio,
        gender : req.body.gender,
    }
    const user = await User.findByIdAndUpdate(req.user.id,newUser,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    })
   
    sendToken(user,200,res)

}))





//Get all Users -- admin
exports.getAllUsers = catchasyncerror(async(req,res,next)=>{
    const users = await User.find()
    res.status(200).json({
        success:true,
        users,
    })
    // sendToken(users,200,res)
})

//Get single user  --admin 
exports.getOneUser = catchasyncerror(async(req,res,next)=>{
    const user = await User.findById(req.user._id)
    if(!user)
    {
        return next(new ErrorHandler("user id is wrong",400))
    }
    res.status(200).json({
        success:true,
        user
    })
    // sendToken(user,200,res)
})

// updating role :- admin
exports.updateUserRole = (catchasyncerror(async(req,res,next)=>{

    const newUser = {
        role: req.body.role,
    }
    const user = await User.findByIdAndUpdate(req.params.id,newUser,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    })
    res.status(200).json({
        success:true,
        user
    })
}))



//Deleting a User - admin
exports.deleteUser = (catchasyncerror(async(req,res,next)=>{

    const user= await User.findByIdAndDelete(req.params.id)
   
    if(!user)
    {
        return next(new ErrorHandler(`user does not exist with id : ${req.params.id} `,400))
    }
    res.status(200).json({
        success:"true",
        message : "User delted Successfully"
    })
}))



//send mail for intrested in buying projects:-
exports.sendInterestedUserEmail = (catchasyncerror(async(req,res,next)=>{
    const options = {
        buyerEmail : req.body.buyerEmail,
        sellerEmail : req.body.sellerEmail,
        subject : req.body.subject,
        description : req.body.description
    }


    try {
       await buyProjectMail(options)
       res.status(200).json({
        success:true ,
        message : `Email sent to ${options.sellerEmail} successfully`
    })
    } catch (error) {
        return (next(new ErrorHandler(error.message),500))
    }
}))



