import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import ReactStars from 'react-rating-stars-component'
import {addReviewAction, getAllReviews, getProjectDetails } from "../../../Redux/Actions/ProjectAction";
import cartIcon from "../../../images/cart.png";
import heartIcon from "../../../images/heart (1).png";
import cashIcon from "../../../images/cash.png";
import code from "../../../images/code.png";
import domainimg from "../../../images/domain.png";
import messenger from "../../../images/messenger.png";
import moment from "moment";
import ReviewSingle from "../Review/ReviewSingle";
import { Link, useParams } from "react-router-dom";


const ProjectDetails = () => {
  
const {id} = useParams()


  const [comment , setComment] = useState('')

  const dispatch =  useDispatch();
  useEffect(()=>{
  dispatch(getProjectDetails(id))
  dispatch(getAllReviews(id))
  },[dispatch,id])
 
 const rating = 1;

  

  const handleSubmitReview = (e)=>{
  
      dispatch(addReviewAction(comment,rating,id))
      setComment('')

  }

  const { project } = useSelector((state)=> state.projectDetails)
  
  const {reviews} = useSelector((state)=> state.getAllReviews)



  if (!project || !project.images || project.images.length === 0) {
    return null; // You can return a loading indicator or handle this case as needed
  }
  let languages = project.languages.split(",");
  let domain = project.domain.split(",");

  //convert it into mm/dd/yr:-
  const timestamp = `${project.createdAt}`;
  const momentObj = moment(timestamp);
  const formattedDate = momentObj.format("MMMM DD, YYYY");

  return (
    <>
      <div className="container ml-20">
        <section className="pt-12 pb-1">
          <div className=" mx-auto ">
            <div className="flex">
              <div className="w-1/2 pr-8">
                <div className="mb-2">
                  <img
                    src={project.images[0].url}
                    alt={project.images[0].public_id}
                    className="w-full"
                  />
                </div>
              </div>
              <div className="w-1/2">
                <div className="mb-6 border border-400 h-[70vh]">
                  <h2 className="text-3xl font-nunito text-white font-semibold bg-indigo-500 mb-4 py-3 text-center">
                    Project Information
                  </h2>
                  <h1 className="text-3xl font-nunito-600 text-black-500 font-medium mb-10 ml-8 ">
                    {project.title}
                  </h1>
                  <div className="flex items-center justify-between mb-4">
                    <div className="mr-4 flex items-center ">
                      <img
                        src={cashIcon}
                        className="w-10 h-8 rouunded-lg ml-10 mr-2"
                        alt=""
                      />
                      <span className="text-2xl font-nunito font-bold pl-1">
                        ₹{project.price}
                      </span>
                    </div>
                  </div>
                  <div className="mb-2 mt-8">
                    <h3 className="text-lg font-semibold ml-10 mb-4">
                      Languages Used:
                    </h3>
                    <div className="flex items-center ml-10">
                      <img src={code} alt="Python" className="w-6 h-6 mr-2" />
                      <span className="text-sm text-black font-medium font-nunito ">
                        {languages.map((language) => (
                          <span className="mr-3 border p-2 bg-gradient-to-t from-slate-100 to-blue-50 ">
                            {language}
                          </span>
                        ))}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold ml-10 mb-4 mt-6">
                      Domain:
                    </h3>
                    <div className="flex items-center  ml-10">
                      <img
                        src={domainimg}
                        alt="Web Development"
                        className="w-6 h-6 mr-2"
                      />
                      <span className="text-sm text-black font-medium font-nunito ">
                        {domain.map((dom) => (
                          <span className="mr-3 border p-2 bg-gradient-to-t from-slate-100 to-blue-50 ">
                            {dom}
                          </span>
                        ))}
                      </span>
                    </div>
                  </div>
                  <div className="ml-10 mt-10 flex">
                    <Link to = "/buy">
                    <button className="bg-indigo-600 text-white flex items-center px-4 py-2 mx-5  rounded">
                      <img
                        src={cartIcon}
                        className="w-6 rounded-lg h-6 pr-1"
                        alt=""
                      />
                      Buy Now
                    </button>
                    </Link>
                    <button className="bg-indigo-600 text-white px-4 py-2 flex items-center rounded">
                      <span>
                        <img
                          src={heartIcon}
                          className="w-6 rounded-lg h-6 pr-1"
                          alt=""
                        />
                      </span>
                      Add to Favorites
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-2 ">
          <div class=" flex justify-between">
            <div class="w-1/3  flex flex-col  h-fit">
              <div class="border border-gray-300 ">
                <h2 className="text-3xl font-nunito text-white font-semibold bg-indigo-500 w-full py-3 text-center">
                  Developer
                </h2>
                <div class="flex flex-col items-center mt-2">
                  <img
                    src="https://cdn3.iconfinder.com/data/icons/essential-rounded/64/Rounded-31-512.png"
                    class="w-[16vh] h-[16vh] mt-3"
                    alt=""
                  />
                  <span class="ml-2 mt-4 text-xl font-nunito text-color9 ">
                    Abhishek
                  </span>
                </div>
                <div class=" mt-2 text-center text- font-nunito  font-medium">
                  {formattedDate}
                </div>
                <button class="mt-4 mb-3 border border-1 border-color6 flex text-blue-500 py-2 px-4 mx-auto rounded">
                  <img class="w-6 h-6 mr-2 " src={messenger} alt="" />
                  Message
                </button>
              </div>

              <div class="border border-gray-300 mt-4">
                <h2 className="text-3xl font-nunito text-white font-semibold bg-indigo-500 w-full py-3 text-center">
                  Reviews
                </h2>
                <div class=" pt-4 px-2 rounded-lg">
                  <div class="flex items-center mb-4">

                    <img
                      src="https://cdn3.iconfinder.com/data/icons/essential-rounded/64/Rounded-31-512.png"
                      alt="User Avatar"
                      class=" hidden lg:block w-10 h-10 rounded-full mr-4"
                    />

                    <input
                      type="text"
                      placeholder="Write a review"
                      class="border  border-gray-300 py-2 px-2 rounded-lg w-[35vh]"
                      value = {comment}
                      onChange = {(e)=> setComment(e.target.value)}
                    />
                   
                    <button  onClick = {handleSubmitReview} class="hidden lg:inline-block bg-indigo-500 text-white py-2 px-4 rounded-lg ml-4">
                      Submit
                    </button>
                  </div>
                </div>
                {reviews.length > 0 ? (reviews.map((review)=>{
                  return(
                    <ReviewSingle review = {review} />
                  )
                }))
               : <h1 className = "text-center text-2xl my-2 font-nunito font-normal">No reviews Yet </h1> }
                
              </div>
            </div>
            {/* <a href="mailto:abhishekpadiyar6395@gmail.com?subject=Purchase Inquiry">Buy Now</a> */}
            <div class="w-2/3 ml-3 border border-gray-300 rounded-r h-fit ">
              <h2 className="text-3xl font-nunito text-white font-semibold bg-indigo-500 w-full py-3 text-center">
                Project Description
              </h2>
              <p class="mt-2 p-3">{project.description}</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ProjectDetails;
