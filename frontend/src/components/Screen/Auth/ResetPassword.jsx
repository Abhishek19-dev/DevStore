 import React, { useEffect, useState } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { resetPasswordAction } from '../../../Redux/Actions/authAction';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { RESET_PASSWORD_CHANGE } from '../../../Redux/ActionType';
 
 const ResetPassword = () =>{

    const [password , setPassword] = useState("")
    const [confirmPassword , setConfirmPassword] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const toast = useToast()
    
    const {loading : resetPasswordLoading , isReset , user:resetPasswordUser , error : resetPasswordError} = useSelector((state)=> state.resetPassword)

   const {token} = useParams()
    console.log("token " , token)

   const handleResetButton = ()=>{
    dispatch({
        type : RESET_PASSWORD_CHANGE
    })
    dispatch(resetPasswordAction(password , confirmPassword , token))
   }

    useEffect(()=>{
        if(isReset){
           navigate('/login')
           toast({
            title: "Password Changes Successfull ! Please Login with new Password" ,
            status: "success",
            isClosable: true,
          });
        }
    },[isReset])

    console.log("reset Password error",resetPasswordError&& resetPasswordError , resetPasswordError&& resetPasswordError.length > 0)

    useEffect(()=>{
        if(resetPasswordError && resetPasswordError.length > 0){
            toast({
                title: resetPasswordError ,
                status: "error",
                isClosable: true,
              });
        }
    },[resetPasswordError])


return (
    <>
      <section class="bg-color17  flex flex-col lg:justify-around items-center w-full h-[100vh]">
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
       
    <div class="w-[90vh] mx-auto  p-8 rounded-xl shadow bg-white">
        <h1 class="text-4xl font-medium">Change Password</h1>
        <p class="text-slate-500">Please Enter the new Password</p>

        <form action="" class="my-10">
            <div class="flex flex-col space-y-5">
                <label for="password">
                    <p class="font-medium text-slate-700 pb-2">New Password</p>
                    <input id="password" name="password" type="password" value={password} onChange={(e)=> setPassword(e.target.value)} class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter New Password" /> 
                </label>
                <label for="confirmPassword">
                    <p class="font-medium text-slate-700 pb-2">Confirm Password</p>
                    <input id="confirmPassword" name="confirmPassword" type="text" value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)} class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter Confirm Password" /> 
                </label>
               {
                resetPasswordLoading? <button disabled="" type="button"  class="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
                <svg aria-hidden="true" role="status" class="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"></path>
                </svg>
                Reset Password
            </button>  : <button onClick={handleResetButton} class="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                      </svg>
                      
                      <span>Reset password</span>
                </button>
               }
                
                <p class="text-center">Want New Token? <a href="#" class="text-indigo-600 font-medium inline-flex space-x-1 items-center"><a href='/forgetPassword'>
                <span>Get New Token </span> </a><span><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg></span></a></p>
            </div>
        </form>
    </div>
    


      </section>
    </>
)
};
 
export default ResetPassword