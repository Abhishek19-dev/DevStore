import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getMyProjects } from '../../../Redux/Actions/ProjectAction';
import SingleProject from './SingleProject';
import noProjectsFound from "../../../images/projectNotFound.jpg"
import { Link } from 'react-router-dom';


const MyProject = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getMyProjects())
    }, [dispatch])


    const { projects } = useSelector((state) => state.myProject)

    return (
        <>
        <div className=' bg-gradient-to-t from-slate-70 to-blue-35 pt-[5vh]'>
         <div className=''>
          {
            projects.length > 0 ?  <div className='flex text-center mt-[5vh]'>
            <h2 class="text-4xl ml-[20vh]  font-nunito font-semibold  text-color7">Your Projects</h2>
    <div class="flex justify-center">
     <div class="mb-3 xl:w-120">
       <div class="input-group  flex ml-20  items-stretch w-full mb-4">
         <input type="search" class="form-control  flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Search Your Project" aria-label="Search" aria-describedby="button-addon2" />
         <button class="btn flex px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out  items-center" type="button" id="button-addon2">
           <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" class="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
             <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
           </svg>
         </button>
       </div>
     </div>
   </div>
   </div> : ""
          }
        
<hr className="bg-color9 font-bold"></hr>
            <div className='grid grid-cols-1 gap-1'>
                {projects.length > 0 ?
                    projects.map((project) => (
                        <SingleProject key={project._id} project={project} />
                    )
                    ):
                    <div class="flex flex-col items-center  h-fit">
                    <img src={noProjectsFound} alt="No Projects" class=" w-[60vh] h-[50vh]" />
                    <span class="text-3xl font-nunito  font-bold mb-2">Whoops! No Projects Found</span>
                    <p class="text-md font-nunito font-medium">Ready to Kickstart Your Sales Journey? Sell Your First Project and Earn Today!</p>
                    <Link to = "/sell">
                    <button class="bg-indigo-500 text-white px-4 py-2 rounded-md mt-4 mb-4">Sell Now</button>
                    </Link>
                  </div>
                }
            </div>
            </div>
            </div>
        </>
    )
};

export default MyProject


