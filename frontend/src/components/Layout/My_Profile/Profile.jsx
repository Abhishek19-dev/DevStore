 import React from 'react'; 
 import MyProfileJpg from '../../../images/myProfile.jpg'
 import AvatarProfilePic from '../../../images/avatar_profile_pic.jpg'
 
 const MyProfile = () =>{
    
return (
    <>
      <h1 class="text-3xl font-bold">Hi Abhishek</h1>
    <div class="flex mt-10 justify-evenly ml-20">
  {/* <!-- Left Div --> */}
  <div  class="w-[70vh] h-[70vh] border rounded-lg shadow-lg  bg-gradient-to-t from-slate-100 to-blue-50">
  <div class="absolute  bottom-[16vh] left-[55vh] transform -translate-x-1/2 -translate-y-1/2 w-[30vh] h-[30vh] bg-white rounded-full flex items-center justify-center">
    <img src={AvatarProfilePic} alt="profile_pic" class="w-[28vh] h-[28vh]  rounded-full bg-indigo-500" />
  </div>
  <img src={MyProfileJpg} alt="Background Image" class="z-1 w-full h-[40vh] object-cover " />
 
  <div class=" font-semibold text-2xl font-nunito text-black items-center flex flex-col">
  <span className="mt-[9vh]">Abhishek Padiyar</span>
    <p class="font-medium text-sm font-nunito text-black">Since 12 Aug 2023</p>
    </div>
    <p className=" w-2/3 p-3 font-lg text-md font-nunito text-black" style={{ whiteSpace: 'pre-line' }}> 
    {`🧠 Mern Stack Developer
🙋🏻 Travelling , playing sports
😊 Smile Always`}    
         </p>


    <div class=" flex mt-2">
      <a href="https://github.com" class="mr-2"><i class="fab fa-github"></i></a>
      <a href="https://linkedin.com" class="mr-2"><i class="fab fa-linkedin"></i></a>
      <a href="https://instagram.com"><i class="fab fa-instagram"></i></a>
    </div>
  
</div>

  {/* <!-- Right Div --> */}
  
</div>

    </>
)
};
 
export default MyProfile