 import React, { useEffect, useState } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
 import loginGif from "../../../images/login.gif"
 import { Link, useNavigate } from "react-router-dom";
import { registerAction } from '../../../Redux/Actions/authAction';

 const Register = () =>{
    
    const [name , setName] = useState('')
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const [avatar,setAvatar] = useState(null)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // console.log(avatar)

    const handleNameChange = (e)=>{
        e.preventDefault()
        setName(e.target.value)
    }
    const handleEmailChange = (e)=>{
        e.preventDefault()
        setEmail(e.target.value)
    }
    const handlePasswordChange = (e)=>{
        e.preventDefault()
        setPassword(e.target.value)
    }
    const handleFileChange = (e) => {
      const selectedAvatar = e.target.files[0];
      // setAvatar(selectedAvatar)
      const file = selectedAvatar
      const reader = new FileReader()
      reader.onload = (e)=>{
        const arrayBuffer = e.target.result
        const uint8Array = new Uint8Array(arrayBuffer)
        
        const selectedFiles = {
          file:{
            name:file.name,
            type:file.type,
            size:file.size
          },
          buffer : uint8Array,
        }
        setAvatar(selectedFiles)
      }
      reader.readAsArrayBuffer(file)
    }

    const handleRegisterButton = async(e)=>{
      e.preventDefault()

      
        const convertedAvatar = {
          fieldname: 'file',
          originalname: avatar.file.name,
          encoding: '7bit',
          mimetype: avatar.file.type,
          buffer: avatar.buffer,
          size: avatar.file.size,
        };
        // console.log("avatar file name", convertedAvatar);

     const formData = new FormData();
     
      formData.append('name',name)
     formData.append('email',email)
     formData.append('password',password)
      formData.append('file', new Blob([avatar.buffer]), avatar.file.name);

        // dispatch(registerAction(name,email,password,avatar))
        dispatch(registerAction(formData))
    }

   
    
    const {isRegistered} = useSelector((state)=> state.registerAuth)

    useEffect(()=>{
        if(isRegistered)
        {
            navigate('/login')
        }
    },[navigate,isRegistered])
return (
 <>
    <section class="bg-gradient-to-t from-slate-50 to-blue-100 h-full">
    <div class="flex ">
  <div class="w-1/2">
      <div class="h-fit flex flex-col border  bg-white rounded-lg mt-[7vh] ml-[10vh]  py-9 ">
      <div class="flex justify-center items-center">
  <span class="mr-2 font-nunito text-lg ">Already have an account?</span>
  <button class="border border-blue-500 text-blue-500 py-2 px-4 rounded-lg"><Link to = "/login">Login</Link></button>
</div>
    <h2 class="text-3xl font-nunito font-bold mb-4 text-center mt-2 ">Register</h2>
    <form>
    <div class="mb-4">
          <label class="ml-5 font-nunito font-semibold text-lg text-color6">Name </label>
        <input value = {name} onChange = {handleNameChange} type="text" id="userName" placeholder="Enter your Name" class="border bg-gradient-to-t from-slate-100 to-blue-50 border-gray-300 py-2 px-4 w-[85vh] rounded-sm mx-4 my-2" />
      </div>
      <div class="mb-4">
          <label class="ml-5 font-nunito font-semibold text-lg text-color6">Email Address </label>
        <input value = {email} onChange = {handleEmailChange} type="email" id="email" placeholder="Enter your email" class="border bg-gradient-to-t from-slate-100 to-blue-50 border-gray-300 py-2 px-4 w-[85vh] rounded-sm mx-4 my-2" />
      </div>
      <div class="mb-4">
      <label class="ml-5 font-nunito font-semibold text-lg text-color6">Password </label>
        <input value = {password} onChange = {handlePasswordChange} type="password" id="password" placeholder="Enter your password" class="border bg-gradient-to-t from-slate-100 to-blue-50 border-gray-300 py-2 px-4 rounded-sm w-[85vh] mx-4 my-2" />
      </div>
      <div class="mb-4">
    <label class="ml-5 font-nunito font-semibold text-lg text-color6">
      Avatar
    </label>
    <input class="border bg-gradient-to-t from-slate-100 to-blue-50 border-gray-300 py-2 px-4  w-[85vh] mx-4 my-2 shadow appearance-none  rounded  text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange = {handleFileChange}   name="avatar" type="file" />
  </div>
      <div class="flex justify-between mb-4">
        <button onClick={handleRegisterButton} class="bg-color9 text-white font-nunito font-semibold py-2 px-8 rounded-lg ml-[25vh] ">Create Account</button>
      </div>
    </form>
    </div>
  </div>
  <div class="w-1/2 flex  flex-col justify-center items-center">
            <img src={loginGif} alt="Image" class="w-[70vh] h-[70vh]" />
            <p class="font-nunito font-semibold text-lg  mt-4 text-black">
              <span class="text-color7 font-nunito font-bold text-4xl ">
                DevStore<br />
              </span>
              <span className="font-nunito py-1  text-md text-black font-normal">
              - Create an account now and showcase your projects to a global
              audience
              </span>
            </p>
          </div>
</div>

</section>
    </>

)
};
 
export default Register