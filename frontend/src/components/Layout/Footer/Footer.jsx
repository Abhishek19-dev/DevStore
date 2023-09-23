 import React from 'react'; 
 import instagram from '../../../images/instagram.svg'
 import facebook from '../../../images/facebook.svg'
 import twitter from '../../../images/twitter.svg'
 const Footer = () =>{
return (
    <>

    <footer class="bg-color14 text-white">
        <hr />
  <div class="container mx-auto py-8 flex flex-col md:flex-row justify-between">
    <div class="md:w-1/2">
      <h3 class="text-4xl  mb-4 text-black font-nunito font-semibold ">DevStore</h3>
      <p class="mb-2 text-color4 font-nunito">Jaypee Institute Of Information Tecnhnology , sec 62 , noida</p>
      <p class="mb-2 text-color4 font-nunito font-medium"><span className="text-color7 font-900 font-nunito font-medium">Phone No:</span> 63953650</p>
      <p class="mb-2 text-color4 font-nunito font-medium"><span className="text-color7 font-nunito font-medium">Email: ab</span>hishekpadiyar6395@gmail.com</p>
      <div class="flex space-x-2">
        <a href="#" class="text-blue-500 hover:text-blue-400">
        <img src= {instagram} alt="" />
        </a>
        <a href="#" class="text-blue-500 hover:text-blue-400">
         <img src= {facebook} alt="" />
        </a>
        <a href="#" class="text-blue-500 hover:text-blue-400">
        <img src= {twitter} alt="" />
        </a>
      </div>
      <h3 class="text-2xl  mb-4 text-color7 font-nunito font-semibold ">Follow Us:-</h3>
    </div>
    <div class="md:w-1/2 mt-4 md:mt-0">
      <h3 class="text-4xl font-bold mb-4 text-color7 font-nunito-900">Contact Us :</h3>
      <form class="flex flex-col">
        <input type="email" placeholder="Type your Doubt Here" class=" text-black text-font-nunito bg-gradient-to-t from-slate-100 to-blue-50 hover:border-cyan-100 mb-4 outline-none pl-10 rounded-md w-[70vh] h-28" />
        <button type="submit" class="bg-blue-500 w-[12vh] hover:bg-blue-400 text-white px-4 py-2 rounded">Send</button>
      </form>
    </div>
  </div>
</footer>
    </>
)
};
 
export default Footer