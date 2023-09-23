 import React, { useEffect, useState } from 'react'; 
import { useDispatch } from 'react-redux';
import { getAllProjects } from '../../../Redux/Actions/ProjectAction';
 
 const Filters = ({tags,domain,languages,handleTags,handleDomain,handleLanguages}) =>{
  const handleTagsSearch = (e) => {
    const newTags = e.target.value;
    handleTags(newTags);
  };
   
  // const handleDomainSearch = (newDomain) => {
  //   handleDomain(newDomain);
  // };

  // const handleLanguagesSearch = (newLanguages) => {
  //   handleLanguages(newLanguages);
  // };
 
  

  const domains = ["Artificial Intelligence","Web Development","Android Development","IOT","Machine Learning","Network Security","Cloud Computing","Blockchain"]

  const languagesCat = ["Python","c++","Java","React","Flutter","Next Js","React Native"]
 
return (
    <>
    <div class="mb-6">
          <div class="mb-8">
            <label class="block text-xl text-color7 font-nunito font-semibold mb-2" for="tag">Tags</label>
            <input value = {tags} onChange = {handleTagsSearch}  type="text" id="tag" class="w-full border border-gray-300 rounded px-3 py-2" />
          </div>
          <div class="mb-4">
            <label class="block text-xl text-color7 font-nunito font-semibold  mb-2" for="category">Domain</label>
            <input  type="text" id="category" class="w-full border border-gray-300 rounded px-3 py-2" />
          </div>


          <div class="mb-8">
            <div class="overflow-y-auto max-h-40 scrollbar-track-gray-200 scrollbar-thumb-indigo-500">
              <div class="scrollbar-line-indigo-500"></div>

              {domains.map((domain)=>{
                return(<label class="flex items-center mb-2">
                <input type="checkbox" class="form-checkbox" key={domain} onClick = {()=> handleDomain(domain)} />
                <span class="ml-2 text-sm font-semibold text-black">{domain}</span>
              </label>)
              })}
            </div>
          </div>



          <div class="mb-4 mt-4">
            <label class="block text-xl text-color7 font-nunito font-bold  mb-2" for="language">Languages</label>
            <input type="text" id="language" class="w-full border border-gray-300 rounded px-3 py-2" />
          </div>
          <div class="mb-4">

            <div class="overflow-y-auto max-h-40 scrollbar-track-gray-200 scrollbar-thumb-indigo-500">
              <div class="scrollbar-line-indigo-500"></div>
              {languagesCat.map((language)=>{
                return(
                  <label class="flex items-center mb-2">
                <input type="checkbox" class="form-checkbox" key = {language} onClick = {()=>handleLanguages(language)} />
                <span class="ml-2 text-sm font-semibold text-black">{language}</span>
              </label>
                )
              })}
            </div>
          </div>
         
        </div>
    </>
)
};
 
export default Filters