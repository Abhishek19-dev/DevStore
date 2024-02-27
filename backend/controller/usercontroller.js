const ErrorHandler = require("../utils/errorhandler")
const catchasyncerror = require("../middleware/catchasyncerror")

const User = require('../model/usermodel');
const sendToken = require("../utils/jwtToken");
const {sendEmail , buyProjectMail, otpRegisterMail} = require("../utils/sendEmail.js")

const crypto = require('crypto');
const { getDataUri } = require("../utils/dataUrl");

const cloudinary = require('cloudinary').v2

const ejs = require('ejs');
const path = require('path');
const fs = require('fs');

//Register a User:-
exports.registerUser = catchasyncerror(async(req,res,next)=>{

    const {name , email , password} = req.body;


    console.log("name email password",name,email,password)
    const file = req.file
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
    //otp verfication
    const otp = await user.generateOTP()
    const emailTemplatePath = path.join(__dirname, 'otpVerfication.html');
    const emailTemplate = fs.readFileSync(emailTemplatePath, 'utf-8');
    
    const renderedTemplate = ejs.render(emailTemplate, { otp: otp });

    try {
        
        await otpRegisterMail({
            email : email,
            subject : `Email Verfication - DevStore`,
            message : renderedTemplate
           })
           await user.save({validateBeforeSave:false})
           res.status(200).json({
            user:user,
            success : true ,
            message : "Otp has been sent to this email , Please Verify"
        })
    } catch (error) {
        // user.otpVerfication = undefined;
        // user.otpVerficationExpire = undefined;
        // await user.save({validateBeforeSave:false})
        return (next(new ErrorHandler(error.message),500))
    }
})

// Confirm otp verification:-
exports.confirmOtpVerification = catchasyncerror(async(req,res,next)=>{
    const {email , otp} = req.body
    const user = await User.findOne({"email":email}).select("+otpVerfication +otpVerficationExpire")

    const enteredOtp = parseInt(otp);

    if(!user){
        return (next(new ErrorHandler("Invalid email! User not found",401)));
    }
    if(!otp){
        return (next(new ErrorHandler("Please enter valid OTP",401)));
    }

    if(user.otpVerfication === enteredOtp && new Date(user.otpVerficationExpire) > Date.now()) // Access user properties with user.
    {
        await user.save();
        res.status(200).json({
          success:true,
          message:"User Registered Successfully"
        })
    }
    console.log("user" , user)
    console.log("user.otpVerification",user.otpVerfication === enteredOtp)
    console.log("user.otpVerification",typeof(user.otpVerfication) , typeof(enteredOtp))
    console.log("user.otpVerificationExpire",user.otpVerficationExpire < Date.now())


    if(user.otpVerfication !== enteredOtp){
        return (next(new ErrorHandler("Invalid OTP !",401)));
    }
    if(user.otpVerficationExpire < Date.now()){
        return (next(new ErrorHandler("OTP Expired !",401)));
    }
});


// Registration controller
// exports.registerUser = catchasyncerror(async (req, res, next) => {
//     const { name, email, password } = req.body;
//     const file = req.file;
//     const fileUri = getDataUri(file);

//     // Upload file to cloudinary
//     const myCloud = await cloudinary.uploader.upload(fileUri.content, {
//         folder: "avatars",
//         width: 150,
//         crop: "scale"
//     });

//     // Generate OTP
//     const user = new User({ name, email, password });
//     user.avatar = {
//         public_id: myCloud.public_id,
//         url: myCloud.secure_url
//     };

//     const otp = user.generateOTP();
    
//     // Send OTP
//     const emailTemplatePath = path.join(__dirname, 'otpVerification.html');
//     const emailTemplate = fs.readFileSync(emailTemplatePath, 'utf-8');
//     const renderedTemplate = ejs.render(emailTemplate, { otp });
//     await otpRegisterMail({
//         email: email,
//         subject: `Email Verification - DevStore`,
//         message: renderedTemplate
//     });

//     // Send response with success message
//     res.status(200).json({
//         success: true,
//         message: "OTP has been sent to this email, Please Verify"
//     });
// });

// OTP verification controller
// exports.confirmOtpVerification = catchasyncerror(async (req, res, next) => {
//     const { email, otp } = req.body;

//     // Find user by email
//     const user = await User.findOne({ email }).select("+otpVerfication +otpVerficationExpire");
//     if (!user) {
//         return next(new ErrorHandler("Invalid email! User not found", 401));
//     }

//     // Check if OTP is correct and not expired
//     const enteredOtp = parseInt(otp);
//     if (user.otpVerfication === enteredOtp && user.otpVerficationExpire > Date.now()) {
//         // Create user if OTP is correct and not expired
//         await user.save();
//         res.status(200).json({
//             success: true,
//             message: "User Registered Successfully"
//         });
//     } else {
//         return next(new ErrorHandler("Invalid OTP or OTP expired", 401));
//     }
// });

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

console.log("host is ",req.get("host"))
//    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`
   const resetPasswordUrl = `http://localhost:3000/password/reset/${resetToken}`
//    const resetPasswordUrl = `${req.protocol}://http://localhost:3000/api/v1/password/reset/${resetToken}`

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



