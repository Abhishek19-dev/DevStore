 import React, { Fragment } from 'react'; 
 import FirstSectionImg from "../../../images/2nd.gif"
 const FirstSection = () =>{
return (
    <Fragment>
      {/* <div className=" hidden lg:flex flex-row-reverse max-w-full max-h-[100vh] bg-gradient-to-t from-slate-50 to-blue-100 "> */}
      <div className=" hidden lg:flex flex-row-reverse max-w-full max-h-[100vh] bg-color17">
      <div>
          <img className = "w-[50vw]" src= {FirstSectionImg} alt="" />
    </div>
    <div className="flex flex-col  my-[18vh] mx-20 ">
        
      <p className="pb-5 pt-13 font-nunito-900 text-6xl">Your Ideas , Our Marketplace</p>
      <p className="font-nunito pt-[10vh] text-3xl text-bold">Discover, Buy, and Sell Web Projects and Websites - Your Platform for Creative Ventures!"
</p>

{/* <----FORM -----> */}

<div class="h-screen px-10 py-20 w-full">
  <form>
    <div class="max-w-xl">
      <div class="flex space-x-1 items-center mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="text-color4 text-lg font-nunino">Enter the project you want !</p>
      </div>
      <div class="flex space-x-4">
        <div class="flex rounded-md overflow-hidden lg:w-full w-[90%]">
          <input type="text" class="lg:w-full  rounded-md px-4 font-nunito text-1.5xl" />
          <button class="bg-indigo-600 text-white px-6 text-lg font-semibold py-4 rounded-r-md">Go</button>
        </div>
        <button class="bg-white px-6 text-lg font-semibold py-4 rounded-md">Clear</button>
      </div>
    </div>
  </form>



 



</div>
        </div>
      </div> 



{/* <---------------- MOBILE VERSION ---------------> */}
      {/* <div className=" bg-gradient-to-t from-slate-50 to-blue-100 max-h-fit flex flex-col md:h-full lg:hidden "> */}
      <div className=" bg-color17 max-h-fit flex flex-col md:h-full lg:hidden ">

    <div className="m-auto font-nunito-400">
        
      <p className="text-3xl  ml-16 pt-5 pb-5 font-nunito font-bold  md:text-5xl md:ml-18 md:mt-5">Your Ideas , Our Marketplace!</p>
      <p className=" ml-12 font-nunito text-1xl font-medium md:text-3xl md:mt-5">Discover, Buy, and Sell Web Projects and Websites - Your Platform for Creative Ventures!"
</p>


  <div >
          <img className = "max-w-[35vh] ml-7 md:max-w-[70vh] " src= {FirstSectionImg} alt="" />
    </div>
    {/* <----FORM -----> */}

<div class="">
  <form>
    <div class="max-w-xl md:max-w-xl md:ml-5">
      <div class="flex space-x-1 items-center mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="text-color4 text-lg font-nunino">Enter the project you want !</p>
      </div>
      <div class="flex space-x-4">
        <div class="flex rounded-md overflow-hidden w-[45vh] md:w-full">
          <input type="text" class="w-full rounded-md border-color4 border-1  px-4 font-nunito text-1.5xl" />
          <button class="bg-indigo-600 text-white px-6 text-lg font-semibold py-4 rounded-r-md">Go</button>
        </div>
        
      </div>
    </div>
  </form>
</div>
        </div>
      </div>
    </Fragment>
)
};
 
export default FirstSection