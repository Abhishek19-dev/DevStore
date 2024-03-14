 import React, { useEffect, useState } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import code from "../../../images/code.png";
import domainimg from "../../../images/domain.png";
import sendMailGif from "../../../images/sendMail.gif"

// import SendIcon from '@material-ui/icons/Send'; // Import SendIcon from Material Icons
// import CheckIcon from '@material-ui/icons/Check'; 
//  import "./sendbutton.scss"
import sendMailImg from "../../../images/sendMailImg.png"
import { buyProjectAction } from '../../../Redux/Actions/ProjectAction';
import { useNavigate } from 'react-router-dom';


 const BuyProject = () =>{

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [subject , setSubject] = useState("")
    const [description , setDescription] = useState("")
  
   
    const {project} = useSelector((state)=> state.projectDetails)
    const {user} = useSelector((state)=> state.userDetails)
    const {isSent} = useSelector((state)=>state.buyProject)


    console.log("project user and is sent",project,project.user,user)


    useEffect(()=>{
      if(isSent)
      {
         navigate("/thankYou")
      }
      },[isSent,navigate])

      useEffect(()=>{
        if(user.length == 0)
        {
          navigate("/login")
        }
      },[user,navigate])


    // if(!project || !project.user || !user)
    if(!project || !user)
   {
    console.log("Inside conditional check");
    return null
   }
    
    const {email:buyerEmail} = user
    // const {email : sellerEmail} = project.user

    const handleSendEmailButton = (e) =>{
      e.preventDefault()
      if(subject != "" && description != "")
      {
        // dispatch(buyProjectAction(buyerEmail,sellerEmail,subject,description))
        dispatch(buyProjectAction(buyerEmail,subject,description))
      }
    }
    
    let languages = project.languages.split(",");
    let domain = project.domain.split(",");

return (
   <>

   <div class="flex container">
  <div class="lg:ml-12 ml-1  lg:w-[120vh] w-full  mr-5 mt-8 mb-[10vh]">
    <div class="flex lg:flex-row p-2 flex-col border lg:h-[35vh] h-fit lg:w-[100vh] w-full rounded-lg  border-gray-400">
      <div class="lg:w-[40vh] w-full ">
        <img className='h-full w-[40vh] rounded-lg' src={project.images[0].url} alt="Project Image" /> 
      </div>
      <div class=" bg-white flex flex-col justify-between lg:w-3/4 w-full lg:ml-10 ml-3 border-gray-400">
        <h2 className='lg:text-3xl text-2xl font-nunito font-bold lg:mt-2 mt-[2rem]'>{project.title}</h2>
        <p class="overflow-auto font-nunito lg:text-md text-lg font-medium mt-[1rem] ">{project.description}</p>
        <div className="flex mt-[1rem] lg:mt-[0rem] items-center">
                      <img src={code} alt="Python" className="w-6 h-6 mr-2" />
                      <span className="text-sm text-black font-medium font-nunito ">
                        {languages.map((language) => (
                          <span className="mr-3 border p-2 bg-gradient-to-t from-slate-100 to-blue-50 ">
                            {language}
                          </span>
                        ))}
                      </span>
                    </div>
                    <div className="flex mt-[2rem] lg:mt-[0rem] items-center ">
                      <img
                        src={domainimg}
                        alt="Web Development"
                        className="w-6 h-6 mr-2"
                      />
                      <span className="text-sm text-black font-medium font-nunito ">
                        {domain.map((dom) => (
                          <span className="mr-3 border p-2 bg-gradient-to-t from-slate-100 to-blue-50 ">
                            {dom}
                          </span>
                        ))}
                      </span>
                    </div>
        <p className='mb-2 mt-[2rem] lg:mt-[0rem]'><span className='font-bold  font-nunito text-lg mb-4'>Asking Price: </span>{`$ ${project.price}`}</p>
      </div>
    </div>
    <div class="flex lg:flex-row flex-col lg:w-[150vh] w-full mt-5 border border-rounded">
  <div class="lg:w-1/2 w-full  flex flex-col items-center justify-center border border-rounded bg-color15 bg-opacity-30">
    <img src= {sendMailGif} class="lg:w-[60vh] w-[full] lg:h-[60vh] h-[14rem]" alt="Icon" />
    <p class="mt-2 text-center mb-4 font-nunito font-semibold text-color16">Please describe your request in a nutshell!</p>

  </div>
  <div class="lg:w-1/2 w-full">
    <h2 class="text-center py-2 mt-[1rem] font-nunito text-xl font-bold">Send Request</h2>
    <form class="mt-4 pl-8">
      <div className='mr-4'>
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
        Subject
      </label>
      <input value = {subject} onChange={(e)=>setSubject(e.target.value)} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Write a subject." />
      </div>
      <div className='mr-4'>
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
        Description
      </label>
      <textarea value={description} onChange={(e)=> setDescription(e.target.value)} class="appearance-none block w-full lg:h-[40vh] h-[12rem] bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Write a good request proposal for project" />
      </div>
      

<button onClick = {handleSendEmailButton} class="flex lg:ml-[48vh] ml-[8rem] mb-5 items-center h-10 px-5 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800">
  <img className='w-7 h-7 pr-1 pl-1' src= {sendMailImg} alt="" />
  <span>Send Mail</span>
</button>
    </form>
  </div>
</div>
  </div>
</div>
   </>
)
};
 
export default BuyProject