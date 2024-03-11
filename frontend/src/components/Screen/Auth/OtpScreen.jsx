import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { loginAction, otpVerificationAction } from "../../../Redux/Actions/authAction";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";


const OtpScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast()

  const [otp1, setOtp1] = useState("");
  const [otp2, setOtp2] = useState("");
  const [otp3, setOtp3] = useState("");
  const [otp4, setOtp4] = useState("");

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <div className="timer">Time's up!</div>;
    }

    return (
      <div className="timer">
        <div className="text">Remaining</div>
        <div className="value">{formatTime(remainingTime)}</div>
        <div className="text">minutes</div>
      </div>
    );
  };


  const { isRegistered, user } = useSelector((state) => state.registerAuth);
  const { email , password } = user;

  const handleVerifyButton = (e) => {
    e.preventDefault()
    const otp = otp1 + otp2 + otp3 + otp4;
    console.log("opt", otp);
    dispatch(otpVerificationAction(email, otp , password));
  };


  const {isVerified , loading:otpVerficationLoading , error : otpVerficationError} = useSelector((state)=> state.otpVerfication)

  useEffect(()=>{
    if(otpVerficationError && otpVerficationError.length > 0){
        toast({
            title: otpVerficationError,
            status: "error",
            isClosable: true,
          })
    }
  },[])

  useEffect(()=>{
    if(isVerified){
        toast({
            title: "User Registered Successfully",
            status: "success",
            isClosable: true,
          })
        navigate('/login')
    }
  },[isVerified])


  return (
    <>
      <section class="bg-color17  flex flex-col lg:justify-around items-center w-full h-[100vh]">
        {/* <section class="bg-black  w-[100%]  flex flex-col  h-[100vh]"> */}
        <div className="lg:pt-[3rem]">
          <p class="font-nunito  flex flex-col justify-between   h-[full] font-semibold text-lg p-[1rem]     text-black">
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
        <div class="relative flex w-[80%] h-[80%]  md:w-[100%]  flex-col  justify-center overflow-hidden">
          <div class="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
            <div class="mx-auto flex w-full max-w-md flex-col space-y-16">
              <div class="flex flex-col items-center justify-center text-center space-y-2">
                <div class="font-semibold text-3xl">
                  <p>Email Verification</p>
                </div>
                <div class="flex flex-row text-sm font-medium text-gray-400">
                  <p>We have sent a code to your email {user && user.email}</p>
                </div>
              </div>

              <div>
                <form>
                  <div class="flex flex-col space-y-16">
                    <div class="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                      <div class="w-16 h-16 ">
                        <input
                          class="w-full  h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                          maxLength={1}
                          type="text"
                          value={otp1}
                          onChange={(e) => setOtp1(e.target.value)}
                        />
                      </div>
                      <div class="w-16 h-16 ">
                        <input
                          class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                          maxLength={1}
                          type="text"
                          value={otp2}
                          onChange={(e) => setOtp2(e.target.value)}
                        />
                      </div>
                      <div class="w-16 h-16 ">
                        <input
                          class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                          type="text"
                          maxLength={1}
                          value={otp3}
                          onChange={(e) => setOtp3(e.target.value)}
                        />
                      </div>
                      <div class="w-16 h-16 ">
                        <input
                          class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                          type="text"
                          maxLength={1}
                          value={otp4}
                          onChange={(e) => setOtp4(e.target.value)}
                        />
                      </div>
                    </div>

                    <div class="flex flex-col space-y-5">
                      <div>
                        {
                            otpVerficationLoading ? <button disabled="" type="button"  class="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm">
                            <svg aria-hidden="true" role="status" class="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"></path>
                            </svg>
                            Verify Account
                        </button> :  <button
                          onClick={handleVerifyButton}
                          class="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                        >
                          Verify Account
                        </button>
                        }
                      </div>

                      <div class="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                        <div className="timer-wrapper">
                          <CountdownCircleTimer
                            isPlaying
                            duration={300}
                            colors={[
                              ["#004777", 0.33],
                              ["#F7B801", 0.33],
                              ["#A30000"],
                            ]}
                            size={120}
                            strokeWidth={6}
                            trailColor="#f0f0f0"
                          >
                            {renderTime}
                          </CountdownCircleTimer>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OtpScreen;
