 import React, { useEffect } from 'react'; 
//  import pexels from '../../../images/pexels.jpg'
 import code  from '../../../images/code.png'
 import domainimg from '../../../images/domain.png'
 import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { getProjectDetails } from '../../../Redux/Actions/ProjectAction';
 
 const ProjectSingle = ({project}) =>{
   const {title , description , languages , domain , price , images} = project
   if (!project || !project.images || project.images.length === 0) {
    // Handle the case where there are no images
    return null;
  }
    // console.log("images",images[0].url)

return (
    <>
    {/* <section class="py-6">
  <div class="container mx-auto"> */}
     <Link to = {`/project/${project._id}`}>
      <div class=" ml-6 w-[20vh] md:ml-4 lg:ml-7 md:w-[22vh] lg:w-[40vh] bg-white border  rounded-lg   lg:mb-6">
        <img src= {images[0].url} alt={images[0].public_id}  class="z-0 w-full mb-4 border-b-none rounded-lg" />
        <h3 class=" text-black pl-4 pr-4 pt-4 font-sans-serif font-bold  mb-2 truncate overflow:hidden">{title}</h3>
        <p class=" text-black font-nunito font-light text-100  mb-4 pl-6 text-sm pr-4 truncate overflow-hidden pt-5">"{description} </p>
        <div class="flex items-center mb-2">
         <img src={code} className="w-5 ml-4 border rounded-full" alt="" />
          <span class="text-sm pl-2 text-md font-bold font-sans truncate overflow-hidden text-black ">{languages}</span>
        </div>
        <div class="flex items-center mb-4">
          <img src= {domainimg}  className="w-6 ml-4 border rounded-full" alt="" />
          <span class="text-sm pl-2 text-md font-bold font-sans truncate overflow-hidden text-black ">{domain}</span>
        </div>
       
        <p class="text-gray-600 text-sm font-sans-serif ml-4 mt-7 mb-4">added by <span className="text-color7">Abhishek</span></p>
        <div class="flex items-center justify-between">
          <button class="bg-color7 text-white px-5 py-2 rounded-lg mb-4 ml-4 w-[8vh] md:w-[10vh] lg:w-[18vh]">Buy</button>
          <span class="text-xl font-nunito font-bold text-gray-800 mr-3 md:mr-4 lg:mr-7 mb-4">₹{price}</span>
        </div>
      </div> 
      </Link>
  {/* </div>
</section> */}



    </>
)
};
 
export default ProjectSingle
