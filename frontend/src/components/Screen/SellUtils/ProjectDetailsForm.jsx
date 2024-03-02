 import React from 'react'; 
 
 const ProjectDetailsForm = ({title , setTitle , description , setDescription , languages , setLanguages , domain , setDomain , price , setPrice}) =>{
return (
  <>
  <div className=' flex  flex-col p-4 h-[95%]'>
    <h1 className='font-nunito text-2xl text-center mb-6 font-extrabold  '>Enter Your Project Details</h1>
   <div class="mb-8">
          <label class="block text-black text-md font-nunito font-bold mb-2" for="project-title">
            Project Title
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="project-title" type="text" value = {title} onChange = {(e)=> setTitle(e.target.value)} placeholder="Enter project title" />
        </div>
      
        <div class="mb-8">
          <label class="block text-black text-md font-nunito font-bold mb-2"  for="languages">
            Languages
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="languages" type="text" value = {languages} onChange = {(e)=> setLanguages(e.target.value)} placeholder="Enter languages" />
          <h1 className='font-nunito text-sm ml-3 mt-1'>Enter Languages used seperated by comma</h1>
        </div>
        <div class="mb-8">
          <label class="block text-black text-md font-nunito font-bold mb-2"  for="domain">
            Domain
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="domain" value = {domain} onChange = {(e)=> setDomain(e.target.value)} type="text" placeholder="Enter domain" />
          <h1 className='font-nunito text-sm ml-3 mt-1'>Enter Domain seperated by comma</h1>
        </div>
        <div class="mb-6">
          <label class="block text-black text-md font-nunito font-bold mb-2"  for="price">
            Price
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={price} id="price" type="number" onChange={(e)=>setPrice(e.target.value)} placeholder="Enter price" />
        </div>
        </div>
  </>
)
};
 
export default ProjectDetailsForm