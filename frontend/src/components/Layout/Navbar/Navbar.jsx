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
import { UilFacebookMessenger } from "@iconscout/react-unicons";
import { Button, IconButton } from "@chakra-ui/react";
import { UilPlus } from "@iconscout/react-unicons";

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
      {/* <nav className=" sticky scroll-smooth pt-[1rem] md:hidden w-[23rem] flex bg-black h-[4.5rem]  border-b-2 border-cyan-100  z-999"> */}
      <div className=" pt-[1rem] md:hidden w-[23rem] flex bg-white h-[4.5rem]  border-b-2 border-cyan-100  z-999">
        <div className="w-full h-full flex items-center flex-row">
          <Link to='/'>
          <h1 className=" ont-nunito font-bold text-xl ml-1">
            Dev<span className="font-nunito">Store</span>
          </h1>
          </Link>
      <Link to='/sell'>
          <div className="flex ml-[2rem] w-full h-full items-center">
            <div>
              <Button
                marginRight={{base:'0.1rem',md:"1rem"}}
                w={{base:'7rem',md:"8rem"}}
                leftIcon={<UilPlus />}
                colorScheme="blue"
                variant="solid"
              >
                Sell
              </Button>
            </div>
            <div>
            <Link to="/chats">
              <button
                class="lg:mr-8 py-4 ml-3 px-1 mt-2 mr-3 relative border-2 border-transparent text-gray-800 rounded-full hover:text-gray-400 focus:outline-none focus:text-gray-500 transition duration-150 ease-in-out"
                aria-label="Cart"
              >
                <IconButton>
                  <UilFacebookMessenger colorScheme="blue" />
                </IconButton>

                <span class="absolute inset-0 object-right-top-[-1rem] -mr-6">
                  <div class="inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-red-500 text-white">
                    0
                  </div>
                </span>
              </button>
            </Link>
          </div>
            <div className="my-auto mr-1">
              <div>
                <Hamburger toggled={isOpen} toggle={setOpen} />
              </div>
              {isOpen && (
                <div className=" transnform  translate-x-2 transition-transform  ease-in duration-700 ">
                  <ul className="absolute bg-white w-[12rem] p-[2rem] antialiased top-[1rem] right-[2rem] ">
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
        </Link>
        </div>
      {/* </nav> */}
      </div>


      {/* <-------- DESKTOP VERSION -------> */}
      <nav className=" sticky scroll-smooth mt-[1rem] hidden lg:mt-[0rem] ml-[1rem] lg:ml-[0rem]  bg-white top-0  border-b-2 border-cyan-100 md:flex max-w-full h-fit align-center justify-between  z-999">
        <div className="flex">
          <img
            className="w-10 h-10 my-auto hidden lg:block lg:mx-2"
            src={Logo}
          ></img>
          <h2 className="my-auto  font-serif font-bold text-3xl md:p-3 lg:p-0 lg:4xl">
            Dev<span className="">Store</span>
          </h2>
        </div>
        <div>
          <ul className="lg:flex hidden align-center my-auto">
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
          <div className="lg:flex hidden">
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
                src={
                  isAuthenticated
                    ? user.avatar.url
                    : "https://cdn3.iconfinder.com/data/icons/essential-rounded/64/Rounded-31-512.png"
                }
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
                    {isAuthenticated && (
                      <Link to="/myProfile">
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
                      </Link>
                    )}

                    <Link to="/myProjects">
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
            <Link to="/chats">
              <button
                class="lg:mr-8 py-4 ml-3 px-1 mt-2 mr-3 relative border-2 border-transparent text-gray-800 rounded-full hover:text-gray-400 focus:outline-none focus:text-gray-500 transition duration-150 ease-in-out"
                aria-label="Cart"
              >
                <IconButton>
                  <UilFacebookMessenger colorScheme="blue" />
                </IconButton>

                <span class="absolute inset-0 object-right-top-[-1rem] -mr-6">
                  <div class="inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-red-500 text-white">
                    0
                  </div>
                </span>
              </button>
            </Link>
          </div>

          <div>
            <Link to="/sell">
              <Button
                marginRight="1rem"
                w="8rem"
                leftIcon={<UilPlus />}
                colorScheme="blue"
                variant="solid"
              >
                Sell
              </Button>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};
export default NavBar;
