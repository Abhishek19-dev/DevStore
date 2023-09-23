const Project = require ('../model/projectModel')
const mongoose = require ('mongoose')
const ErrorHandler = require("../utils/errorhandler")
const catchasyncerror = require("../middleware/catchasyncerror")
const features = require('../utils/features')
const bcrypt = require('bcryptjs')
const { getMultipleDataUri } = require('../utils/dataUrl')


const cloudinary = require('cloudinary').v2


//Sell a Project :-
exports.createProject = catchasyncerror(async(req,res,next)=>{
    req.body.user = req.user.id
  const {password} = req.body
  

  //convert into hash the enterred password
//   const hashedPassword = await bcrypt.hash(password, 10);
  //compare password
  const isPasswordMatched = await bcrypt.compare(password, req.user.password);
   
//    const isPasswordMatched = await project.compareUserPassword(password,req.user.password)
   if(!isPasswordMatched)
   {
       return next(new ErrorHandler("Password doesn't matched",400))
   }
//    console.log("uploaded files",req.body.files)
console.log("uplaoded files",req.files)
   const dataUris = getMultipleDataUri(req.files)


   const images = []

   //learning : dont use async with forEach
//    dataUris.forEach(async(dataUri)=>{
//     const myCloud =  await cloudinary.uploader.upload(dataUri.content,{
//         folder:"ProjectImages",
//         width:150,
//         crop:"scale"
//     })
//    await images.push({
//         public_id : myCloud.public_id,
//         url : myCloud.secure_url,
//     })


//    })
// dataUris.forEach((dataUri,index)=>{
//     console.log(index,dataUri)
// })

// console.log("dataUri",dataUris)
for (const dataUriSingle of dataUris) {

//    console.log("For data uri of ",i,dataUriSingle)

    const myCloud = await cloudinary.uploader.upload(dataUriSingle.content, {
      folder: "ProjectImages",
      width: 150,
      crop: "scale",
    });
//    console.log(myCloud.secure_url)

    images.push({
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    });
  }  
//   console.log(fileUrl)
  const createdProject = {
    ...req.body,
    images
  }
//   console.log(createdProject)
   const project = await Project.create(createdProject)
   res.status(201).json({
       success:true ,
       project
   })
})


//Get all Projects
exports.getAllProjects = catchasyncerror(async(req,res,next)=>{

    const noOfProjects = await Project.countDocuments()
    const apiFeatures  = new features(Project.find(),req.query).search()
    let projects = await apiFeatures.query
    let filteredProjectCount = await projects.length
   await  res.status(200).json({
        success:true,
        projects,
        noOfProjects,
        filteredProjectCount
    })
})

//Get Project Details 
exports.getProjectById = catchasyncerror(async(req,res,next)=>{
    const project = await  Project.findById(req.params.id).populate(
        "user" ,
        "name email avatar"
    )
    if(!project){
        return next(new ErrorHandler("There is some Glitch Project cannot be shown",404))
    }

    res.status(200).json({
        success:true,
        project
    })
})


//add a review 
exports.addReview = catchasyncerror(async(req,res,next)=>{
    const project = await Project.findById(req.params.id)
    if(!project){
        return next(new ErrorHandler("There is no project ",400))
    }
    const {comment,rating} = req.body
   const user = req.user._id
    const review = [{
        user:user,
        name : req.user.name,
        rating:rating,
        comment : comment
    }]
        const s = project.reviews.find((p)=>{
         return p.user.toString() === user.toString()
        })
        console.log(s)
        if(!s)
        {
            project.reviews.push(...review)
        }
        else{
            next(new ErrorHandler("you have already reviewed that project",400))
        }
   await  project.save()
   res.status(200).json({
       success:true,
       review
   })

})


//get all review:-
exports.allProjectReview = catchasyncerror(async(req,res,next)=>{

      const project = await Project.findById(req.params.id);
      if(!project){
          next(new ErrorHandler("Project Not Found",400))
      }
      const {reviews}  = project

    res.status(200).json({
        success : true,
       reviews
    })

})


//Get all my projects 
exports.getMyProjects = catchasyncerror(async(req,res,next)=>{
    const projects = await Project.find({user:req.user._id})
    
    res.status(200).json({
        success:true,
        projects
    })
})



//Edit Details of My Project
exports.editProjectDetails = catchasyncerror(async(req,res,next)=>{
    const _id = req.params.id
    const editedProject = {
        title : req.body.title,
        description : req.body.description,
        languages : req.body.languages,
        domain:req.body.domain,
        price:req.body.price
    }
    const project =  await Project.findByIdAndUpdate(_id,editedProject,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    })
    if(!project){
        next(new ErrorHandler("Project Not Found",400))
    }
    res.status(201).json({
        success:true,
        message : "Project Edited Successfully",
        project
    })
})

//Delete a Project
exports.deleteProject = catchasyncerror(async(req,res,next)=>{
    const {password} = req.body
    
    const isPasswordMatched = await bcrypt.compare(password, req.user.password);
    if(!isPasswordMatched)
    {
        next(new ErrorHandler("Please Enter the correct password !"))
    }
    console.log(req.body.id)

    if(isPasswordMatched)
    {
        const project = await Project.findByIdAndDelete(req.body.id)
   
    }
    
     res.status(201).json({
        success:true,
        message : "Project Deleted Successfully !",
     })
})


