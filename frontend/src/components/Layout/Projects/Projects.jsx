 import React, { useEffect, useState } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { getAllProjects } from '../../../Redux/Actions/ProjectAction';
import ProjectSingle from './ProjectSingle';
import Filters from './Filters';
import { useParams } from 'react-router';
 
 const Projects = () =>{
//    const [tags,setTags] = useState('')
//    const [domain , setDomain] = useState('')
//    const [languages,setLanguages] = useState('')

// const dispatch = useDispatch()
//   useEffect(()=>{
//    dispatch(getAllProjects(tags,languages,domain))
//   },[dispatch,tags,languages,domain])
  
//   const handleTags = (newTags)=>{
//     setTags(newTags)
//   }

//   const handleDomain = (newDomain)=>{
//     setDomain(newDomain)
//   }

//   const handleLanguages = (newLanguages)=>{
//     setLanguages(newLanguages)
//   }

  const {projects} = useSelector((state)=> state.project)
 
 
return (
    <>
  <section className='w-full p-6   h-[90.5vh] flex flex-row'>
  <div className=' h-full w-[20%]'>
    <Filters />
  </div>
  <div className='bg-green h-full w-[80%] flex-wrap overflow-auto flex flex-row'>
     {
      projects && projects.map((project)=>(
        <ProjectSingle project={project} />
      ))
     }
  </div>

</section>

    </>
)
};
 
export default Projects