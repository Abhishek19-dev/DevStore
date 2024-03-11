 import React, { useEffect, useState } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { getAllProjects } from '../../../Redux/Actions/ProjectAction';
import ProjectSingle from './ProjectSingle';
import Filters from './Filters';
import { useParams } from 'react-router';
import ProjectLoader from './ProjectLoader';
 
 const Projects = () =>{

  const {projects , loading:ProjectsLoading} = useSelector((state)=> state.project)
 
 
return (
    <>
  <section className='w-full p-6  bg-color17   h-[90.5vh] flex flex-row'>
  <div className=' h-full w-[20%]'>
    <Filters />
  </div>

  {
    ProjectsLoading ? <ProjectLoader /> : <div className='bg-green h-full w-[80%] flex-wrap overflow-auto flex flex-row'>
    {
     projects && projects.map((project)=>(
       <ProjectSingle project={project} />
     ))
    }
 </div>
  }
 

</section>

    </>
)
};
 
export default Projects