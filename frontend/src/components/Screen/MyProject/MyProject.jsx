import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getMyProjects } from "../../../Redux/Actions/ProjectAction";
import SingleProject from "./SingleProject";
import noProjectsFound from "../../../images/projectNotFound.jpg";
import { Link } from "react-router-dom";
import ProjectLoader from "../../Layout/Projects/ProjectLoader";
import MyProjectLoader from "./MyProjectLoader";

const MyProject = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyProjects());
  }, [dispatch]);

  const { projects , loading:MyProjectsLoading } = useSelector((state) => state.myProject);

  return (
    <>
      <div className=" bg-gradient-to-t from-slate-70 to-blue-35 pt-[5vh]">

       
        <div className="">
          {projects.length > 0 ? (
            <div className="flex mt-[5vh]">
              <h2 class="text-5xl mb-11  text-center ml-[35rem] font-nunito font-semibold  text-color7">
                Your Projects
              </h2>
              <div class="flex justify-center">
                <div class="mb-3 xl:w-120">
                </div>
              </div>
            </div>
          ) : (
            ""
          )}

          <hr className="bg-color9 font-bold"></hr>
           {
             MyProjectsLoading ? <MyProjectLoader />:  <div className="grid grid-cols-1 gap-1">
             {projects.length > 0 ? (
               projects.map((project) => (
                 <SingleProject key={project._id} project={project} />
               ))
             ) : (
               <div class="flex flex-col items-center  h-fit">
                 <img
                   src={noProjectsFound}
                   alt="No Projects"
                   class=" w-[60vh] h-[50vh]"
                 />
                 <span class="text-3xl font-nunito  font-bold mb-2">
                   Whoops! No Projects Found
                 </span>
                 <p class="text-md font-nunito font-medium">
                   Ready to Kickstart Your Sales Journey? Sell Your First Project
                   and Earn Today!
                 </p>
                 <Link to="/sell">
                   <button class="bg-indigo-500 text-white px-4 py-2 rounded-md mt-4 mb-4">
                     Sell Now
                   </button>
                 </Link>
               </div>
             )}
           </div>
           }
        </div>
      </div>
    </>
  );
};

export default MyProject;
