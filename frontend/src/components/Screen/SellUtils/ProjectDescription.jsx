 import React from 'react'; 
 
 const ProjectDescription = ({description,setDescription}) =>{
return (
  <>
  <div className=' flex  flex-col p-4 h-[95%]'>
  <h1 className='font-nunito text-2xl text-center mb-6 font-extrabold  '>Enter Your Project Detailed Description</h1>
  <div class="mb-4">
          <label class="block text-black text-md font-nunito font-bold mb-2" for="project-description">
            Project Description
          </label>
          <textarea class="shadow appearance-none border rounded w-full h-[20rem] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="project-description" value = {description} onChange = {(e)=> setDescription(e.target.value)} placeholder="Enter project description"></textarea>
        </div>
  </div>
  
  </>
)
};
 
export default ProjectDescription