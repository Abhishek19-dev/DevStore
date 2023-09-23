const express = require('express')
const { createProject, getAllProjects, getProjectById, addReview, allProjectReview } = require('../controller/projectcontroller')
const router = express.Router()
const { isAuthenticatedUser} = require('../middleware/auth');
const { multipleUpload } = require('../middleware/multer');






router.post("/sell" , isAuthenticatedUser,multipleUpload,createProject)
router.get("/projects" , getAllProjects)
router.get("/project/:id", getProjectById)
router.put("/addReview/:id",isAuthenticatedUser,addReview)
router.get("/projectReviews/:id",isAuthenticatedUser,allProjectReview)

exports.router = router;
