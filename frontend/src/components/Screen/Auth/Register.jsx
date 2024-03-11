import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import loginGif from "../../../images/login.gif";
import { Link, useNavigate } from "react-router-dom";
import { registerAction } from "../../../Redux/Actions/authAction";
import { useToast } from "@chakra-ui/react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const toast = useToast()

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleNameChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };
  const handleFileChange = (e) => {
    const selectedAvatar = e.target.files[0];
    const file = selectedAvatar;
    const reader = new FileReader();
    reader.onload = (e) => {
      const arrayBuffer = e.target.result;
      const uint8Array = new Uint8Array(arrayBuffer);

      const selectedFiles = {
        file: {
          name: file.name,
          type: file.type,
          size: file.size,
        },
        buffer: uint8Array,
      };
      setAvatar(selectedFiles);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleRegisterButton = async (e) => {
    e.preventDefault();

    if (!avatar || !avatar.file) {
      toast({
        title: "Please upload your avatar",
        status: "error",
        isClosable: true,
      });
      return;
    }

    const convertedAvatar = {
      fieldname: "file",
      originalname: avatar.file.name,
      encoding: "7bit",
      mimetype: avatar.file.type,
      buffer: avatar.buffer,
      size: avatar.file.size,
    };
    
    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("file", new Blob([avatar.buffer]), avatar.file.name);

    // dispatch(registerAction(name,email,password,avatar))
    dispatch(registerAction(formData));
  };

  const { isRegistered , loading:registerUserLoading , error : registerUserError } = useSelector((state) => state.registerAuth);


  useEffect(()=>{
    if(registerUserError && registerUserError.length > 0){
      toast({
        title: registerUserError,
        status: "error",
        isClosable: true,
      })
     }  
  },[registerUserError])

  useEffect(() => {
    if (isRegistered) {
      navigate("/otp");
    }
  }, [navigate, isRegistered]);
  return (
    <>
      {/* <section class="bg-gradient-to-t flex flex-col items-center from-slate-50 to-blue-100 h-full"> */}
      <section class="bg-color17 flex flex-col items-center  h-full">
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
              <div class="flex justify-center items-center">
                <span class="mr-2 font-nunito text-lg ">
                  Already have an account?
                </span>
                <Link to='/login'>
                <button class="border border-blue-500 text-blue-500 py-2 px-4 rounded-lg">
                  Login
                </button>
                </Link>
              </div>
              <form>
                <div class="mb-4">
                  <label class="ml-5 font-nunito font-semibold text-lg text-color6">
                    Name{" "}
                  </label>
                  <input
                    value={name}
                    onChange={handleNameChange}
                    type="email"
                    id="email"
                    placeholder="Enter your Name"
                    class="border bg-gradient-to-t from-slate-100 to-blue-50 border-gray-300 py-2 px-4 w-[90%] rounded-sm mx-4 my-2"
                  />
                </div>
                <div class="mb-4">
                  <label class="ml-5 font-nunito font-semibold text-lg text-color6">
                    Email Address{" "}
                  </label>
                  <input
                    value={email}
                    onChange={handleEmailChange}
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    class="border bg-gradient-to-t from-slate-100 to-blue-50 border-gray-300 py-2 px-4 w-[90%] rounded-sm mx-4 my-2"
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
                    class="border bg-gradient-to-t from-slate-100 to-blue-50 border-gray-300 py-2 px-4 rounded-sm w-[90%] mx-4 my-2"
                  />
                </div>
                <div class="mb-4">
                <label class="ml-5 font-nunito font-semibold text-lg text-color6">
                    Avatar
                  </label>
                  <input
                    class="border bg-gradient-to-t from-slate-100 to-blue-50 border-gray-300 py-2 px-4 rounded-sm w-[90%] mx-4 my-2"
                    onChange={handleFileChange}
                    name="avatar"
                    type="file"
                  />
                </div>
                {/* <div
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
                </div> */}
                <div class="flex  p-[1rem] justify-between mb-4">
                  {
                    registerUserLoading ? <button disabled="" type="button"  class="bg-color9 text-white font-nunito font-semibold mr-[2.5rem] px-8  lg:py-2 lg:px-8 rounded-lg  lg:mr-2 ml-1 md:ml-8 ">
                    <svg aria-hidden="true" role="status" class="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"></path>
                    </svg>
                    Register..
                </button> :  <button
                    onClick={handleRegisterButton}
                    class="bg-color9 text-white font-nunito font-semibold mr-[2.5rem] px-8  lg:py-2 lg:px-8 rounded-lg  lg:mr-2 ml-1 md:ml-8 "
                  >
                    Register
                  </button>
                  }

                  <a
                    href="/forgetPassword"
                    class="font-nunito font-semibold text-xl text-color6 mr-8 mt-2"
                  >
                    Forgot Password?
                  </a>
                </div>
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

export default Register;
