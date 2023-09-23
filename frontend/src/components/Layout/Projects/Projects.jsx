 import React, { useEffect, useState } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { getAllProjects } from '../../../Redux/Actions/ProjectAction';
import ProjectSingle from './ProjectSingle';
import Filters from './Filters';
import { useParams } from 'react-router';
 
 const Projects = () =>{
   const [tags,setTags] = useState('')
   const [domain , setDomain] = useState('')
   const [languages,setLanguages] = useState('')

const dispatch = useDispatch()
  useEffect(()=>{
   dispatch(getAllProjects(tags,languages,domain))
  },[dispatch,tags,languages,domain])
  
  const handleTags = (newTags)=>{
    setTags(newTags)
  }

  const handleDomain = (newDomain)=>{
    setDomain(newDomain)
  }

  const handleLanguages = (newLanguages)=>{
    setLanguages(newLanguages)
  }

  
  const {projects} = useSelector((state)=> state.project)
 
 
return (
    <>
    
    <section class="py-6 ">
  <div class="ml-8 mx-auto bg-gradient-to-t from-slate-200 to-blue-150 ">
    <div class="flex">
      <div class="w-1/4 pr-8">
        <Filters tags={tags} domain={domain} languages = {languages} handleTags = {handleTags} handleDomain = {handleDomain} handleLanguages = {handleLanguages} />
      </div>
  
      <div class="w-3/4 bg-gradient-to-t from-slate-200 to-blue-150">
          <div className="flex flex-wrap gap-5 ">
            {projects.map((project)=>{
              
              return  <ProjectSingle project={project} key = {project._id}  />
            })}
       
        </div>
        <button class="bg-color7 hover:bg-black ml-[60vh] mt-9 text-white px-5 py-2 rounded-lg  w-[8vh] md:w-[10vh] lg:w-[18vh]">Load More</button>
      </div>
    </div>
  </div>
</section>
    </>
)
};
 
export default Projects