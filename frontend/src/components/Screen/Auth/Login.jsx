import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import loginGif from "../../../images/login.gif";
import { loginAction } from "../../../Redux/Actions/authAction";

const Login = () => {
 
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user ,error , isAuthenticated } = useSelector((state) => state.loginAuth);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleEmailChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handleLoginButton = (e) => {
    e.preventDefault();
    dispatch(loginAction(email, password));
    setPassword("");
    //   if(isAuthenticated)
    //  {
    //   navigate('/')
    //  }
  };


  return (
    <>
     {/* <section className="bg-gradient-to-t from-slate-50 to-blue-100 flex flex-col items-center h-full"> */}
     <section className="bg-color17 flex flex-col items-center h-full">
      {/* <section class="bg-'#eff3f6' h-full"> */}
      <div className="pt-[3rem]">
          <p class="font-nunito  flex flex-col justify-between  h-[full] font-semibold text-lg p-[1rem]    text-black">
            <span class="text-color7  ml-[5rem] md:ml-[20rem] lg:ml-[14rem] mb-[1.5rem]   font-nunito font-bold text-3xl md:text-5xl lg:text-7xl ">
              DevStore
              <br />
            </span>
            <span className="font-nunito py-1 lg:ml-0  text-2xl text-black font-normal">
              - Create an account now and showcase your projects to a global
              audience
            </span>
          </p>
        </div>
        <div class="flex lg:flex-row flex-col items-center">
          <div class="lg:w-1/2 w-[90%]  pr-[1rem] md:pr-[2.5rem]">
            <div class="h-fit flex flex-col border bg-white   rounded-lg  lg:ml-[10vh] ml-[1.5rem]  py-9 ">
              <h2 class="text-3xl font-nunito font-bold mb-4 text-center mt-2 ">
                Login
              </h2>
              <form>
                <div  class="mb-4">
                  <label class="ml-5 font-nunito font-semibold text-lg text-color6">
                    Email Address{" "}
                  </label>
                  <input
                    value={email}
                    onChange={handleEmailChange}
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    class="border bg-gradient-to-t from-slate-100 to-blue-50 border-gray-300 py-2 px-4 w-[85%] rounded-sm mx-4 my-2"
                  />
                </div>
                <div class="mb-4">
                  <label class="ml-5 font-nunito font-semibold text-lg text-color6">
                    Password{" "}
                  </label>
                  <input
                    value={password}
                    onChange={handlePasswordChange}
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    class="border bg-gradient-to-t from-slate-100 to-blue-50 border-gray-300 py-2 px-4 rounded-sm w-[85%] mx-4 my-2"
                  />
                </div>
                <div
                  class={error?"w-[85vh] mx-4 my-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" : "hidden"}
                  role="alert"
                >
                  <strong class="font-bold">Alert! </strong>
                  <span class="block sm:inline">
                    {error}
                  </span>
                  <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                    <svg
                      class="fill-current h-6 w-6 text-red-500"
                      role="button"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <title>Close</title>
                      <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                    </svg>
                  </span>
                </div>
                <div class="flex  p-[1rem] justify-between mb-4">
                  <button
                    onClick={handleLoginButton}
                    class="bg-color9 text-white font-nunito font-semibold mr-[2.5rem] px-8  lg:py-2 lg:px-8 rounded-lg  lg:mr-2 ml-1 md:ml-8 "
                  >
                    Login
                  </button>
                  <a
                    href="/forgetPassword"
                    class="font-nunito font-semibold text-xl text-color6 mr-8 mt-2"
                  >
                    Forgot Password?
                  </a>
                </div>
                <p class="text-center my-4 text-black font-nunito font-semibold">
                  Not a user?{" "}
                  <a
                    href="/register"
                    class="text-indigo-500 font-nunito text-xl font-bold"
                  >
                    Register
                  </a>
                </p>
              </form>
            </div>
            
          </div>
          <div class="lg:w-1/2 w-[100%] flex  flex-col justify-center items-center">
            <img src={loginGif} alt="Image" class="w-[90%] h-[95%]" />
          </div>
          
        </div>
      </section>
    </>
  );
};

export default Login;
