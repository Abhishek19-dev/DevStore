import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllProjects } from "../../../Redux/Actions/ProjectAction";
import { ProjectFilterContext } from "../../context/useContext";

const Filters = ({clearAllFilters}) => {
  const dispatch = useDispatch();
  const {reqString, setReqString ,tags, setTags ,selectedDomains, setSelectedDomains ,selectedLanguages, setSelectedLanguages ,handleChangeTags ,handleSearchProject,domains,languagesCat} = useContext(ProjectFilterContext)


  

  useEffect(() => {
    dispatch(getAllProjects(reqString));
  }, [reqString]);

  
  return (
    <>
      <div className="mb-2">
        <button onClick={clearAllFilters} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 mx-[2.4rem] mb-3 border border-blue-500 hover:border-transparent rounded">
          Clear All Filters
        </button>
        <div className="mb-8">
          <label className="block text-xl text-color7 font-nunito font-semibold mb-2" htmlFor="tag">
            Tags
          </label>
          <input
            value={tags}
            onChange={handleChangeTags}
            type="text"
            id="tag"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div className="mb-4 mt-4">
          <label className="block text-xl text-color7 font-nunito font-bold mb-2" htmlFor="language">
           Domain
          </label>
          <input
            type="text"
            id="language"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div className="mb-8">
          <div className="overflow-y-auto max-h-40 scrollbar-track-gray-200 scrollbar-thumb-indigo-500">
            <div className="scrollbar-line-indigo-500"></div>
            {domains.map((domain) => (
              <label className="flex items-center mb-2" key={domain}>
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={selectedDomains.includes(domain)}
                  onClick={(e) => handleSearchProject(domain, "domain", e.target.checked)}
                />
                <span className="ml-2 text-sm font-semibold text-black">{domain}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-4 mt-4">
          <label className="block text-xl text-color7 font-nunito font-bold mb-2" htmlFor="language">
            Languages
          </label>
          <input
            type="text"
            id="language"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <div className="overflow-y-auto max-h-40 scrollbar-track-gray-200 scrollbar-thumb-indigo-500">
            <div className="scrollbar-line-indigo-500"></div>
            {languagesCat.map((language) => (
              <label className="flex items-center mb-2" key={language}>
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={selectedLanguages.includes(language)}
                  onClick={(e) => handleSearchProject(language, "languages", e.target.checked)}
                />
                <span className="ml-2 text-sm font-semibold text-black">{language}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Filters;
