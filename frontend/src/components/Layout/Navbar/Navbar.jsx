import React, { Fragment, useEffect, useState } from "react";
import Hamburger from "hamburger-react";
import Logo from "../../../images/logo.png";
import LoginSharpIcon from "@mui/icons-material/LoginSharp";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonPinSharpIcon from "@mui/icons-material/PersonPinSharp";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../../Redux/Actions/authAction";
import hi from "../../../images/hi.png";
import smiley from "../../../images/smiley.png";
import login from "../../../images/login.png";
import projects from "../../../images/projects.png";
import logout from "../../../images/logout.png";
import account from "../../../images/account.png";
import wishlist from "../../../images/wishlist.png";

const NavBar = () => {
  const [isOpen, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const handleCategoryClick = () => {
    const categorySection = document.getElementById("categories");
    categorySection.scrollIntoView({ behavior: "smooth" });
  };

  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.loginAuth);

  const handleLogOut = (e) => {
    e.preventDefault();
    dispatch(logoutAction());
  };
  const { isLoggedOut } = useSelector((state) => state.logoutAuth);
 
  <Link to="/" onClick={handleCategoryClick}>
    <li className=" lg:px-4 py-6 px-1.5">CATEGORIES</li>
  </Link>;
  return (
    <>
      {/* <----- MOBILE VERSION -------> */}
      <nav
        className=" sticky top-0  scroll-smooth z-999 flex bg-white  border-b-2 border-cyan-100 md:hidden max-w-full justify-between
     align-center h-min-10 "
      >
        <div className="my-auto">
          <h1 className="font-nunito font-bold text-xl ml-1">
            Dev<span className="font-nunito">Store</span>
          </h1>
        </div>

        <div className="flex">
          <div>
            {/* SELL BUTTON */}
            <a
              href="#"
              class="box-border mt-3 w-13 md:absolute md:right-3 md:top-3 z-30 inline-flex items-center justify-center w-auto px-8 py-3 overflow-hidden font-bold text-white transition-all duration-300 bg-indigo-600 rounded-md cursor-pointer group ring-offset-2 ring-1 ring-indigo-300 ring-offset-indigo-200 hover:ring-offset-indigo-500 ease focus:outline-none"
            >
              <span class="absolute bottom-0 right-0 w-8 h-20 -mb-8 -mr-5 transition-all duration-300 ease-out transform rotate-45 translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
              <span class="absolute top-0 left-0 w-20 h-8 -mt-1 -ml-12 transition-all duration-300 ease-out transform -rotate-45 -translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
              <span class="relative z-20 flex items-center text-sm">
                <svg
                  class="relative w-5 h-5 mr-2 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  ></path>
                </svg>
                +SELL
              </span>
            </a>
          </div>
          <div>
            {/* <-------CART-------> */}
            <button
              class="py-4 md:mx-3 md:absolute md:right-[14rem] md:top-0.5 md:bottom-0.3 ml-3 px-1 mt-2 mr-3 relative border-2 border-transparent text-gray-800 rounded-full hover:text-gray-400 focus:outline-none focus:text-gray-500 transition duration-150 ease-in-out"
              aria-label="Cart"
            >
              <svg
                class="h-6 w-6"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              <span class="absolute inset-0 object-right-top -mr-6">
                <div class="inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-red-500 text-white">
                  0
                </div>
              </span>
            </button>
          </div>
          <div className="my-auto mr-1">
            <div>
              <Hamburger toggled={isOpen} toggle={setOpen} />
            </div>
            {isOpen && (
              <div className=" transnform translate-x-2 transition-transform  ease-in duration-700 ">
                <ul className="absolute antialiased top-[1rem] right-[2rem] ">
                  <a>{isAuthenticated && <li className="py-2">Login</li>}</a>
                  <hr />
                  <a>
                    <li className="py-2"> My Profile</li>
                  </a>
                  <a>
                    <li className="py-2">Categories</li>
                  </a>
                  <a>
                    <li className="py-2">My Orders</li>
                  </a>
                  <a>
                    <li className="py-2">Contact</li>
                  </a>
                  ̀
                  <a>
                    <hr />
                    <li className="py-2">Logout</li>
                  </a>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* <-------- DESKTOP VERSION -------> */}
      <nav className=" sticky scroll-smooth   bg-white top-0 hidden border-b-2 border-cyan-100 md:flex max-w-full h-fit align-center justify-between  z-999">
        <div className="flex">
          <img
            className="w-10 h-10 my-auto md:hidden lg:block lg:mx-2"
            src={Logo}
          ></img>
          <h2 className="my-auto font-serif font-bold text-3xl md:p-3 lg:p-0 lg:4xl">
            Dev<span className="">Store</span>
          </h2>
        </div>
        <div>
          <ul className="flex align-center my-auto">
            <Link to="/">
              <li className="lg:px-4  py-6 px-1.5">HOME</li>
            </Link>
            <Link to="#categories">
              <li className=" lg:px-4 py-6 px-1.5">CATEGORIES</li>
            </Link>
            <a>
              <li className="lg:px-4  py-6 px-1.5">ABOUTUS</li>
            </a>
            <Link to="/projects">
              <li className="lg:px-4  py-6 px-1.5">PROJECTS</li>
            </Link>
          </ul>
        </div>
        <div className="flex items-center">
          <div>
            <div
              data-open="false"
              onMouseEnter={() => {
                setProfileOpen(true);
              }}
              onMouseLeave={() => {
                setProfileOpen(false);
              }}
            >
             
              <img
                className=" w-8 h-8 lg:w-10  rounded-full object-cover lg:h-10 lg:mr-2"
                //   onClick={openProfile}
                src={isAuthenticated ? user.avatar.url :"https://cdn3.iconfinder.com/data/icons/essential-rounded/64/Rounded-31-512.png"}
                alt=""
              />
              <div
                className={
                  profileOpen
                    ? "absolute right-[18vh] w-30 bg-white opacity-100 transition-opacity duration-10000 ease-in-out rounded-md top-[9.5vh]  border-t  border-blue-500"
                    : "opacity-0 transition-opacity duration-10000 ease-in-out hidden"
                }
              >
                <div>
                  <hr className="" />
                  <ul className="antialiased font-medium top:[4rem] border-black-300 border-2 w-[35vh]bg-gradient-to-t from-slate-150 to-blue-50">
                    <hr></hr>
                    {isAuthenticated ? (
                      <li className="py-1 px-2 flex items-center mx-auto">
                        <span className="text-xl font-nunito font-bold pl-5">
                          Hi {user.name.split(" ")[0]}!
                        </span>
                        <img className="w-16 h-16" src={smiley} alt="" />
                      </li>
                    ) : (
                      <Link to="/login">
                        <li className="py-2 px-[1vh] flex my-3">
                          <img className="w-12 h-12 mx-4" src={login} alt="" />
                          <a
                            href="#_"
                            class="inline-flex items-center w-full px-5 py-3 mb-3 mr-1 text-base font-normal text-white no-underline align-middle bg-blue-600 border border-transparent border-solid rounded-md cursor-pointer select-none sm:mb-0 sm:w-auto hover:bg-blue-700 hover:border-blue-700 hover:text-white focus-within:bg-blue-700 focus-within:border-blue-700"
                          >
                            Login
                            <svg
                              class="w-4 h-4 ml-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                              ></path>
                            </svg>
                          </a>
                        </li>
                      </Link>
                    )}
                    <hr />
                    {isAuthenticated &&  <Link to = "/myProfile">
                      <li className="py-1 px-[1vh] flex">
                        <img
                          className="w-6 h-6 mx-2 mt-2"
                          src={account}
                          alt=""
                        />
                        <span className="font-nunito font-normal text-md pt-2 text-black">
                          {" "}
                          My Profile{" "}
                        </span>
                      </li>
                      </Link>}
                   
                      
                   <Link to = "/myProjects">
                      <li className="py-1 px-[1vh] flex">
                        <img
                          className="w-6 h-6 mx-2 mt-2"
                          src={projects}
                          alt=""
                        />
                        <span className="font-nunito font-normaltext-md pt-2 text-black">
                          {" "}
                          My Projects{" "}
                        </span>
                      </li>
                      </Link>
                    <a href="#">
                      <li className="py-1 px-[1vh] flex">
                        <img
                          className="w-6 h-6 mx-2 mt-2"
                          src={wishlist}
                          alt=""
                        />
                        <span className="font-nunit0 font-normal text-md pt-2 text-black">
                          {" "}
                          Wishlist{" "}
                        </span>
                      </li>
                    </a>
                    <hr />
                    <a href="#">
                      <li
                        onClick={handleLogOut}
                        className={
                          !isAuthenticated ? "hidden" : "py-2 px-[1vh]"
                        }
                      >
                        <li className="flex">
                          <img className="w-16 h-12 mx-3" src={logout} alt="" />
                          <a
                            href="#_"
                            class="inline-flex items-center w-full px-5 py-3 mb-3 mr-1 text-base font-semibold text-white no-underline align-middle bg-blue-600 border border-transparent border-solid rounded-md cursor-pointer select-none sm:mb-0 sm:w-auto hover:bg-blue-700 hover:border-blue-700 hover:text-white focus-within:bg-blue-700 focus-within:border-blue-700"
                          >
                            Logout
                            <svg
                              class="w-4 h-4 ml-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                              ></path>
                            </svg>
                          </a>
                        </li>
                      </li>
                    </a>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div>
            <button
              class="lg:mr-8 py-4 ml-3 px-1 mt-2 mr-3 relative border-2 border-transparent text-gray-800 rounded-full hover:text-gray-400 focus:outline-none focus:text-gray-500 transition duration-150 ease-in-out"
              aria-label="Cart"
            >
              <svg
                class="h-6 w-6"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              <span class="absolute inset-0 object-right-top -mr-6">
                <div class="inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-red-500 text-white">
                  0
                </div>
              </span>
            </button>
          </div>
          <div>
           
           <Link to = "/sell">
            <div  class="box-border lg:mr-8 z-30 inline-flex items-center justify-center w-auto px-8 py-3 overflow-hidden font-bold text-white transition-all duration-300 bg-indigo-600 rounded-md cursor-pointer group ring-offset-2 ring-1 ring-indigo-300 ring-offset-indigo-200 hover:ring-offset-indigo-500 ease focus:outline-none">
              <span class="absolute bottom-0 right-0 w-8 h-20 -mb-8 -mr-5 transition-all duration-300 ease-out transform rotate-45 translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
              <span class="absolute top-0 left-0 w-20 h-8 -mt-1 -ml-12 transition-all duration-300 ease-out transform -rotate-45 -translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
              <span class="relative z-20 flex items-center text-sm">
                <svg
                  class="relative w-5 h-5 mr-2 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  ></path>
                </svg>
                +SELL
              </span>
              </div>
              </Link>

              
          </div>
        </div>
      </nav>
    </>
  );
};
export default NavBar;
