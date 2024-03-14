 import React, {  useEffect, useState } from 'react'; 
 import editDetailsPhotos from '../../../images/editDetails.jpg'

import { useDispatch, useSelector } from 'react-redux';
import { editProjectDetailsAction, editProjectReset, getProjectDetails } from '../../../Redux/Actions/ProjectAction';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { EDIT_PROJECT_RESET } from '../../../Redux/ActionType';
import { Box ,Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react';

 
 const EditProjectDetails = () =>{
    const dispatch = useDispatch()
   const {id} = useParams()
   const toast = useToast()

   const [title , setTitle] = useState("")
  const [description , setDescription] = useState("")
  const [languages , setLanguages] = useState("")
  const [domain , setDomain] = useState("")
  const [price , setPrice] = useState("")
  const navigate = useNavigate()
   const {loading :getProjectLoading , project} = useSelector((state)=> state.projectDetails)
   useEffect(()=>{
    dispatch(getProjectDetails(id))
   },[dispatch,id])
     

   console.log("project",project)

   useEffect(()=>{
    if(project){
        setTitle(project.title)
        setDescription(project.description)
        setLanguages(project.languages)
        setDomain(project.domain)
        setPrice(project.price)
    }
   },[project])
  

  const handleUpdate = (e) =>{
    e.preventDefault()

    if(title === '' || description === '', languages === '' , domain === '' , price===''){
        toast({
            title:'Please fill all the fields',
            status:'error',
            isClosable:true
        })
    }
    else{
        dispatch(editProjectDetailsAction(title,description,languages,domain,price,id))
    }
  }

const {isEdited , loading : updateProjectLoading} = useSelector((state)=> state.editProject)

useEffect(()=>{
    if(isEdited){
        toast({
            title:"Project Updated SuccessFully",
            status:"success",
           isClosable:true
        })
        navigate("/myProjects")
        dispatch({
            type:EDIT_PROJECT_RESET
        })
    }
   },[dispatch,isEdited])


return (
    <>
     <section class="bg-color17  pt-[5vh] mb-10 flex lg:flex-row flex-col">
  <div class="lg:w-[100vh] w-[full] lg:ml-10 ml-1 mr-5 border shadow-lg rounded-lg">
  <h2 className="text-3xl font-nunito text-white w-full font-semibold bg-indigo-500 mb-4 py-3 text-center">
              Update Project
            </h2>
            {
                getProjectLoading ? <Box padding='6' boxShadow='lg' bg='white'>
                <SkeletonCircle size='10' />
                <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
              </Box> :  <form action="#">
          <div class="grid gap-4 mb-4 lg:grid-cols-2 lg:gap-6  sm:mb-5">
              <div class="sm:col-span-2">
                  <label for="name" class="block mb-2 ml-6 text-sm font-medium text-gray-900 ">Project Title</label>
                  <input type="text" name="name" id="name" class="bg-gray-50 border ml-6 border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[80%] p-2.5   dark:focus:ring-primary-500 dark:focus:border-primary-500" value= {title}
                  onChange = {(e)=> setTitle(e.target.value)} placeholder="Type Project name" required="" />
              </div>
              <div class="w-full">
                  <label for="brand" class="block mb-2 ml-6 text-sm font-medium text-gray-900 ">Languages</label>
                  <input type="text" name="brand" id="brand" class="bg-gray-50 border ml-6 border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[80%] p-2.5   dark:focus:ring-primary-500 dark:focus:border-primary-500" value={languages} onChange={(e)=> setLanguages(e.target.value)} placeholder="HTML , React , etc" required="" />
              </div>
              <div class="w-full">
                  <label for="category" class="block mb-2 ml-6 text-sm font-medium text-gray-900 ">Category</label>
                  <input type="text" name="category" id="category" class="bg-gray-50 border ml-6 border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[80%] p-2.5   dark:focus:ring-primary-500 dark:focus:border-primary-500" value={domain}
                  onChange={(e)=>setDomain(e.target.value)} placeholder="Web Dev etc" required="" />
              </div>
              <div>
                  <label for="price" class="block mb-2 ml-6 text-sm font-medium text-gray-900 ">Price</label>
                  <input type="number" name="number" id="number" class="bg-gray-50 border ml-6 border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[80%] p-2.5   dark:focus:ring-primary-500 dark:focus:border-primary-500" value={price} onChange={(e)=>setPrice(e.target.value)} placeholder="Enter Number" required="" />
              </div>
            
              <div class="sm:col-span-2">
                  <label for="description" class="block mb-2 ml-6 text-sm font-medium text-gray-900 ">Description</label>
                  <textarea id="description" rows="8" class="block w-[80%] ml-6 p-2.5  text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500  dark:focus:ring-primary-500 dark:focus:border-primary-500" value={description} 
                  onChange={(e)=>setDescription(e.target.value)} placeholder="Write a product description here..."></textarea>
              </div>
          </div>
          
          
       

          <div class="flex items-center ml-10 my-3 space-x-4">
              <button onClick={handleUpdate} type="submit" class="text-white flex items-center justify-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                {
                     updateProjectLoading ?  <svg
                     width="20"
                     height="20"
                     fill="currentColor"
                     class="mr-2 animate-spin"
                     viewBox="0 0 1792 1792"
                     xmlns="http://www.w3.org/2000/svg"
                   >
                     <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
                   </svg> : ""
                }
                  Update product
              </button>
              <Link to = "/myProjects">
              <button type="button" class="text-blue inline-flex items-center hover:text-white border border-blue-600 hover:bg-color4 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                 Back to my Projects
              </button>
              </Link>
          </div>
      </form>
            }
     
  </div>
  <img src= {editDetailsPhotos} alt="" className='lg:w-[100vh] w-[full] m-2'/>
</section>
    </>
)
};
 
export default EditProjectDetails