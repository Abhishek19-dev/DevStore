 import React, { useEffect } from 'react'; 
 import ThankYouJpg from "../../images/thankYou.jpg"
 import sendMailArrow from "../../images/mailArrow2.gif"
import thankYouSendMail from "../../images/thankYouSendMail.jpg"
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BUY_PROJECT_RESET } from '../../Redux/ActionType';
//  import sendMailArrow from "../../images/sent_mail2.gif"

 const ThankYou = () =>{

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {isSent} = useSelector((state)=>state.buyProject)

    // useEffect(()=>{
    //     if(!isSent)
    //     {
    //         navigate("/")
    //     }
    // },[isSent,navigate])



    const handleSentReset = ()=>{
        // dispatch({
        //     type:BUY_PROJECT_RESET
        // })
    }
   
return (
    <>
    <div class="flex py-10 bg-gradient-to-t from-slate-50 to-blue-100">
    <div class="w-[100vh] h-[100vh] bg-white ml-10 border border-color3 border-rounded flex flex-col  items-center">
     <img className='w-[40vh] h-[40vh] ml-10 ' src= {sendMailArrow} alt="" />
    <p class="text-center font-bold text-xl font-nunito mt-5">Your Request Has Been Successfully Sent!</p>
    <p class="text-center font-nunito font-semibold mr-5 mt-8">In the meantime, please keep an eye on your email for further instructions on how to connect with potential sellers or buyers.</p>
    <div class="flex justify-center mt-4">
    <Link to = "/projects"><button onClick = {handleSentReset} class="mr-2 bg-indigo-500 text-white px-6 py-3 rounded-full hover:bg-indigo-600 font-nunito font-semibold">Explore Projects</button></Link>
      <a href="#" class="bg-indigo-500 font-nunito font-semibold  text-white px-6 py-3 rounded-full hover:bg-indigo-600">Contact Us</a>
    </div>
  </div>
  <div class="w-full md:w-1/2 px-4">
    <img src= {ThankYouJpg}  alt="DevStore" class="mx-auto mb-4 w-[80vh] h-[80vh]" />
    <p class="text-center text-4xl font-nunito font-bold">Thank you for choosing DevStore</p>
    <p class="text-center mb-10 mt-3 text-xl font-nunito ">Your Connection to Opportunities Starts Here</p>
  </div>
  
</div>

    </>
)
};
 
export default ThankYou