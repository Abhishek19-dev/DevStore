 import React, { useEffect, useState } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { getAllProjects } from '../../../Redux/Actions/ProjectAction';
import ProjectSingle from './ProjectSingle';
import Filters from './Filters';
import { useParams } from 'react-router';
import ProjectLoader from './ProjectLoader';
import { UilFilter } from '@iconscout/react-unicons'
import { IconButton } from '@chakra-ui/react';
 
 const Projects = () =>{

  const {projects , loading:ProjectsLoading} = useSelector((state)=> state.project)
  const [openFilter , setOpenFilter] = useState(false)
 
 
return (
    <>
  <section className='w-full hidden lg:flex p-6  bg-color17   h-[100vh]  flex-row'>
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

<section className='bg-color17 lg:hidden min-h-[34rem] '>
<div className='lg:h-full lg:w-[20%] w-[80%] relative'>
      <IconButton margin='2rem' onClick={() => setOpenFilter(!openFilter)} marginBottom='2rem'>
        <UilFilter />
      </IconButton>
      <div className={`transition-transform duration-300 bg-white p-4 ease-in-out absolute z-10 ${openFilter ? "transform translate-x-0" : "transform -translate-x-full"}`}>
        <Filters />
      </div>

      {
        ProjectsLoading ? <ProjectLoader /> :
          <div className='h-full pb-3 lg:w-[80%] w-full flex-wrap overflow-auto flex flex-row'>
            {
              projects && projects.map((project) => (
                <ProjectSingle project={project} />
              ))
            }
          </div>
      }
    </div>
</section>

    </>
)
};
 
export default Projects