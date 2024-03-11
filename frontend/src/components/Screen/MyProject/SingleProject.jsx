import React, { useEffect, useState } from "react";
import myCode from "../../../images/code.png";
import myDomainimg from "../../../images/domain.png";
import cashIconImg from "../../../images/cash.png";
import { Link } from "react-router-dom";
import deleteIcon from "../../../images/delete1.svg";
import { useDispatch, useSelector } from "react-redux";
import { deleteProjectUser } from "../../../Redux/Actions/ProjectAction";
import { getMyProjects } from "../../../Redux/Actions/ProjectAction";
import { useToast } from "@chakra-ui/react";
import { DELETE_PROJECT_USER_RESET } from "../../../Redux/ActionType";

const SingleProject = ({ project }) => {
  const dispatch = useDispatch();

  const [deleteProject, setDeleteProject] = useState(false);
  const [confirmDeleteProject, setConfirmDeleteProject] = useState(false);
  const [successDeleteProject, setSuccessDeleteProject] = useState(false);
  const toast = useToast();
  const [password, setPassword] = useState("");

  const handleDeleteProject = (e) => {
    setDeleteProject(!deleteProject);
  };

  const handleCancelDeleteBox = (e) => {
    setDeleteProject(false);
  };

  const handleConfirmDeleteBox = (e) => {
    setConfirmDeleteProject(true);
    setDeleteProject(false);
  };

  const handleCancelPasswordDeleteBox = (e) => {
    setConfirmDeleteProject(false);
  };

  const handleConfirmPasswordBox = () => {
    dispatch(deleteProjectUser(project._id, password));
  };

  const { isDeleted, error: DeleteProjectError } = useSelector(
    (state) => state.deleteProject
  );

  useEffect(() => {
    if (DeleteProjectError) {
      toast({
        title: DeleteProjectError,
        status: "error",
        isClosable: true,
      });
      dispatch({
        type: DELETE_PROJECT_USER_RESET,
      });
    }
  }, [DeleteProjectError]);

  useEffect(() => {
    if (isDeleted) {
      dispatch(getMyProjects());
      setConfirmDeleteProject(false); // Set it to false to close the modal
      // setSuccessDeleteProject(true)
      dispatch({
        type: DELETE_PROJECT_USER_RESET,
      });
    }
  }, [isDeleted]);

  useEffect(() => {
    if (isDeleted) {
      toast({
        title: "Project Deleted Successfully !",
        status: "success",
        isClosable: true,
      });
    }
  }, [isDeleted]);

  return (
    <>
      {/* <Link to = {`/project/${project._id}`}> */}
      <div className=" relative container ml-[20vh] z-5 mt-4 mb-4">
        <div class="border w-[150vh] bg-white rounded-lg shadow-md p-4 ">
          <div class="flex">
            <img
              src={project.images[0].url}
              alt="Project Image"
              class="w-[40vh] h-[35vh]"
            />

            <div class="w-2/3 pl-10">
              <h3 class="text-4xl font-nunito text-color9 font-bold mb-2">
                {project.title}
              </h3>
              <p class="text-md font-medium font-nunito text-black overflow-hidden line-clamp-2 my-4">
                {project.description}
              </p>

              <div class="flex items-center mb-4">
                <img src={myCode} className="w-5  border rounded-full" alt="" />
                <span class="text-sm pl-2 text-md font-bold font-sans truncate overflow-hidden text-black ">
                  {project.languages}
                </span>
              </div>

              <div class="flex items-center mb-4">
                <img
                  src={myDomainimg}
                  className="w-6  border rounded-full"
                  alt=""
                />
                <span class="text-sm pl-2 text-md font-bold font-sans truncate overflow-hidden text-black ">
                  {project.domain}
                </span>
              </div>

              <div className="mr-4 flex items-center ">
                <img
                  src={cashIconImg}
                  className="w-10 h-8 rouunded-lg  mr-2"
                  alt=""
                />
                <span className="text-2xl font-nunito font-bold pl-1">
                  ₹{project.price}
                </span>
              </div>

              <div class="flex justify-end">
                <Link to={`/editProject/${project._id}`}>
                  <button class="bg-blue-500 inline-flex items-center justify-between hover:bg-blue-600 text-white font-semibold py-2 px-4 mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="h-4 w-4 mr-1"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                    Edit
                  </button>
                </Link>

                <button
                  onClick={handleDeleteProject}
                  className="bg-red-500 inline-flex items-center justify-between hover:bg-red-600 text-white font-semibold py-2 px-4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="h-4 w-4 mr-1"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                  Delete
                </button>

                <div
                  class={
                    deleteProject
                      ? "border border-gray-300 shadow-lg  bg-black bg-opacity-10  absolute top-[10vh] left-[70vh] flex flex-col items-center justify-center py-4 z-20"
                      : "hidden"
                  }
                >
                  <img src={deleteIcon} alt="delete" className="w-10 mb-3" />
                  <div class="font-bold text-xl text-black font-nunito mb-2">
                    Delete Project
                  </div>
                  <div class=" text-md font-nunito text-center mb-4 px-5">
                    You're going to delete this project. Are you sure?
                  </div>
                  <div class="flex justify-center">
                    <button
                      onClick={handleCancelDeleteBox}
                      class="border rounded-lg font-semibold font-nunito px-4 py-2 mr-2 bg-gray-200 text-black"
                    >
                      No, Keep it
                    </button>
                    <button
                      onClick={handleConfirmDeleteBox}
                      class="border font-semibold cons font-nunito rounded-lg px-4 py-2 bg-red-500 text-white"
                    >
                      Yes, Delete!
                    </button>
                  </div>
                </div>

                {/* confirmation dialog box:- */}
                <div
                  id="confirmDeleteModal"
                  class={
                    confirmDeleteProject
                      ? "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center "
                      : "hidden"
                  }
                >
                  <div class="bg-white rounded-lg p-8">
                    <div class="text-red-600 text-xl font-bold mb-4">
                      Confirm Delete !
                    </div>
                    <div class="text-black font-nunito text-md mb-4">
                      Please enter your password:
                    </div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      class="border border-gray-300 rounded-lg px-4 py-2 mb-4"
                    />

                    <div class="flex justify-center">
                      <button
                        onClick={handleCancelPasswordDeleteBox}
                        id="cancelDeleteBtn"
                        class="border rounded-lg px-4 py-2 mr-2 bg-gray-200 text-gray-700"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleConfirmPasswordBox}
                        id="deleteBtn"
                        class="border rounded-lg px-4 py-2 bg-red-500 text-white"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProject;

export const SingleProjectForUserProfile = ({ project }) => {
  console.log("project inside", project);
  return (
    <>
      <Link to={`/project/${project._id}`}>
        <div className="w-[100%]">
          <div class="border w-[90%]  bg-white rounded-lg  p-4 ">
            <div class="flex">
              <img
                src={project && project.images[0].url}
                alt="Project Image"
                class="w-[40vh] h-[35vh]"
              />
              <div class="w-2/3 pl-10">
                <h3 class="text-4xl font-nunito text-color9 font-bold mb-2">
                  {" "}
                  {project && project.title}
                </h3>
                <p class="text-md font-medium font-nunito text-black overflow-hidden line-clamp-2 my-4">
                  {project && project.description}
                </p>
                <div class="flex items-center mb-4">
                  <img
                    src={myCode}
                    className="w-5  border rounded-full"
                    alt=""
                  />
                  <span class="text-sm pl-2 text-md font-bold font-sans truncate overflow-hidden text-black ">
                    {project && project.languages}
                  </span>
                </div>
                <div class="flex items-center mb-4">
                  <img
                    src={myDomainimg}
                    className="w-6  border rounded-full"
                    alt=""
                  />
                  <span class="text-sm pl-2 text-md font-bold font-sans truncate overflow-hidden text-black ">
                    {project && project.domain}
                  </span>
                </div>
                <div className="mr-4 flex items-center ">
                  <img
                    src={cashIconImg}
                    className="w-10 h-8 rouunded-lg  mr-2"
                    alt=""
                  />
                  <span className="text-2xl font-nunito font-bold pl-1">
                    {project && project.price}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};
