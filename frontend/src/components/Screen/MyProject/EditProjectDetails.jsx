 import React, {  useEffect, useState } from 'react'; 
 import editDetailsPhotos from '../../../images/editDetails.jpg'

import { useDispatch, useSelector } from 'react-redux';
import { editProjectDetailsAction, editProjectReset, getProjectDetails } from '../../../Redux/Actions/ProjectAction';
import { Link, useParams } from 'react-router-dom';
import { EDIT_PROJECT_RESET } from '../../../Redux/ActionType';
 
 const EditProjectDetails = () =>{
    const dispatch = useDispatch()
   const {id} = useParams()

   

   const {project} = useSelector((state)=> state.projectDetails)
   useEffect(()=>{
    dispatch(getProjectDetails(id))
   },[dispatch,id])
     
  const [title , setTitle] = useState(project.title)
  const [description , setDescription] = useState(project.description)
  const [languages , setLanguages] = useState(project.languages)
  const [domain , setDomain] = useState(project.domain)
  const [price , setPrice] = useState(project.price)

  const handleUpdate = (e) =>{
    e.preventDefault()
    dispatch(editProjectDetailsAction(title,description,languages,domain,price,id))
  }

const {isEdited} = useSelector((state)=> state.editProject)

useEffect(()=>{
    if(isEdited){
       
        setTimeout(()=>{
            console.log(" edithi")
            dispatch(
                {
                    type:EDIT_PROJECT_RESET
                }
            )
        },10000)   
    }
   },[dispatch,isEdited])


return (
    <>
     <section class="bg-gradient-to-t from-slate-70 to-blue-35 pt-[5vh] mb-10 flex">
  <div class="w-[100vh] ml-10 mr-5 border shadow-lg rounded-lg">
  <h2 className="text-3xl font-nunito text-white w-full font-semibold bg-indigo-500 mb-4 py-3 text-center">
              Update Project
            </h2>
      <form action="#">
          <div class="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
              <div class="sm:col-span-2">
                  <label for="name" class="block mb-2 ml-6 text-sm font-medium text-gray-900 ">Project Title</label>
                  <input type="text" name="name" id="name" class="bg-gray-50 border ml-6 border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[80vh] p-2.5   dark:focus:ring-primary-500 dark:focus:border-primary-500" value= {title}
                  onChange = {(e)=> setTitle(e.target.value)} placeholder="Type product name" required="" />
              </div>
              <div class="w-full">
                  <label for="brand" class="block mb-2 ml-6 text-sm font-medium text-gray-900 ">Languages</label>
                  <input type="text" name="brand" id="brand" class="bg-gray-50 ml-6 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[40vh] p-2.5 dark:focus:ring-primary-500 dark:focus:border-primary-500" value={languages} onChange={(e)=> setLanguages(e.target.value)} placeholder="Product brand" required="" />
              </div>
              <div class="w-full">
                  <label for="category" class="block mb-2 text-sm font-medium text-gray-900 ">Category</label>
                  <input type="text" name="category" id="category" class="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[40vh] p-2.5  dark:focus:ring-primary-500 dark:focus:border-primary-500" value={domain}
                  onChange={(e)=>setDomain(e.target.value)} placeholder="$299" required="" />
              </div>
              <div>
                  <label for="price" class="block mb-2 ml-6 text-sm font-medium text-gray-900 ">Price</label>
                  <input type="number" name="number" id="number" class=" resize-none appearance-none bg-gray-50 border ml-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[40vh] p-2.5 dark:focus:ring-primary-500 dark:focus:border-primary-500" value={price} onChange={(e)=>setPrice(e.target.value)} placeholder="Enter text" required="" />
              </div>
              {/* <div>
                  <label for="item-weight" class="block mb-2 text-sm font-medium text-gray-900 ">Item Weight (kg)</label>
                  <input type="number" name="item-weight" id="item-weight" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value="15" placeholder="Ex. 12" required="" />
              </div>  */}
              <div class="sm:col-span-2">
                  <label for="description" class="block mb-2 ml-6 text-sm font-medium text-gray-900 ">Description</label>
                  <textarea id="description" rows="8" class="block w-[80vh] ml-6 p-2.5  text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500  dark:focus:ring-primary-500 dark:focus:border-primary-500" value={description} 
                  onChange={(e)=>setDescription(e.target.value)} placeholder="Write a product description here..."></textarea>
              </div>
          </div>
          
          {isEdited ?    <div class="w-[60vh] ml-6 my-2 overflow-hidden rounded shadow-sm">
        <div class="relative flex items-center justify-between px-2 py-2 font-bold text-white bg-green-500 rounded-t">
            <div class="relative flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    class="inline w-6 h-6 mr-2 opacity-75">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Success</span>
            </div>
            <span class="relative">
                <svg class="w-5 h-5 text-green-300 fill-current hover:text-white" role="button"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <title>Close</title>
                    <path
                        d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                </svg>
            </span>
        </div>
        <div class="p-3 bg-white border border-gray-300 rounded-b shadow-lg">
            <span class="block text-gray-600">Project Edited successfully!</span>
        </div>
    </div> : "" }
       

          <div class="flex items-center ml-10 my-3 space-x-4">
              <button onClick={handleUpdate} type="submit" class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                  Update product
              </button>
              <Link to = "/myProjects">
              <button type="button" class="text-blue inline-flex items-center hover:text-white border border-blue-600 hover:bg-color4 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                 Back to my Projects
              </button>
              </Link>
          </div>
      </form>
  </div>
  <img src= {editDetailsPhotos} alt="" className='w-[100vh]'/>
</section>
    </>
)
};
 
export default EditProjectDetails