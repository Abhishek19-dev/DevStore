 import React, { useEffect, useState } from 'react'; 
 import Sell1 from '../../images/sell2.png'; 
 import SellPage from '../../images/sellPage.png'; 
 import SellPage2 from '../../images/sellPage2.jpg'; 
 import SellPage3 from '../../images/sellPage3.jpg'; 
import { useDispatch, useSelector } from 'react-redux';
import { getMyProjects, sellProjectAction } from '../../Redux/Actions/ProjectAction';

 
 const Sell = () =>{
  const dispatch = useDispatch()
     const [title,setTitle] = useState('')
     const [description,setDescription] = useState('')
     const [languages,setLanguages] = useState('')
     const [domain,setDomain] = useState('')
     const [phoneNo,setPhoneNo] = useState('')
     const [password,setPassword] = useState('')
     const [price,setPrice] = useState('')
     const [images,setImages] = useState([])
     const [imagesPreview,setImagesPreview] = useState([])

    //  console.log(title,description,languages,domain,phoneNo,password,images)

     const sellProjectSubmitHandler = (e) =>{
           e.preventDefault()
     }


    const createProductImagesChange = (event) => {
      const selectedFiles = event.target.files[0];
    
      const selectedImages = [];
    
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const reader = new FileReader();
    
        reader.onload = (e) => {
          // Access the loaded file data as an ArrayBuffer
          const arrayBuffer = e.target.result;
    
          // Convert the ArrayBuffer to a Uint8Array
          const uint8Array = new Uint8Array(arrayBuffer);
    
          // Now you can use the uint8Array as a Buffer-like object
          selectedImages.push({
            file: {
              name: file.name,
              type: file.type,
              size: file.size,
            },
            buffer: uint8Array, // Store the Uint8Array
          });
    
          // Update the images state with the selected images
          setImages(selectedImages);
        };
    
        reader.readAsArrayBuffer(file);
      }
    };
    

    const handleSellProject = async (e) => {
      e.preventDefault();
  
      // Convert selected images into the desired format
      const convertedImages = images.map((image) => ({
        fieldname: 'files',
        originalname: image.file.name,
        encoding: '7bit', // You can set the appropriate encoding here
        mimetype: image.file.type,
        buffer: image.buffer, // Use the stored buffer
        size: image.file.size,
      }));
  
      // Create a FormData object and append other form data
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('languages', languages);
      formData.append('domain', domain);
      formData.append('price', price);
      formData.append('phoneNo', phoneNo);
      formData.append('password', password);
  
      // Append the images to the FormData object
      // for (const image of convertedImages) {
      //   formData.append('files', image.buffer, image.originalname); // Make sure 'files' matches your server's field name
      for (const image of images) {
        formData.append('files', new Blob([image.buffer]), image.file.name);
      }
    // console.log(images)
        dispatch(sellProjectAction(formData))
        // dispatch(sellProjectAction(title,description,languages,domain,price,phoneNo,password,images))
      // }
    }  

    // useEffect(()=>{
    //   dispatch(getMyProjects())
    // })

    const {isSold} = useSelector((state)=> state.sellProject)
  
    useEffect(()=>{
     if(isSold)
     {
      console.log("inside")
      dispatch(getMyProjects())
     }
    },[isSold,getMyProjects])

return (
    <>
    <section class="bg-gradient-to-t from-slate-50 to-blue-100  py-10">
  <div class=" container mx-auto ">
  <div className = "flex mt-2 pt-0 items-center ml-[30vh] mb-[3vh]">
            <img className = "w-20 h-20" src= {Sell1} alt="" />
      <h2 class="text-4xl pt-10 font-nunito text-black font-semibold mb-6">Sell your projects and earn money</h2>
      </div>
      <div className = "flex flex-col lg:flex-row ">
    <div class="lg:w-1/2">
      <form class="bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-4" onSubmit={sellProjectSubmitHandler}>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="project-title">
            Project Title
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="project-title" type="text" value = {title} onChange = {(e)=> setTitle(e.target.value)} placeholder="Enter project title" />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="project-description">
            Project Description
          </label>
          <textarea class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="project-description" value = {description} onChange = {(e)=> setDescription(e.target.value)} placeholder="Enter project description"></textarea>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="languages">
            Languages
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="languages" type="text" value = {languages} onChange = {(e)=> setLanguages(e.target.value)} placeholder="Enter languages" />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="domain">
            Domain
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="domain" value = {domain} onChange = {(e)=> setDomain(e.target.value)} type="text" placeholder="Enter domain" />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="price">
            Price
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={price} id="price" type="number" onChange={(e)=>setPrice(e.target.value)} placeholder="Enter price" />
        </div>


        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="images">
            Images
          </label>
          <input class="shadow flex appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="images" accept="image/*" multiple onChange={createProductImagesChange} type="file" />
        </div>

        <div className = "w-full overflow-auto flex">
            {imagesPreview.map((image,index)=> (
                <img className = "w-[3vmax] mx-4 rounded-lg" src={image} key={index} alt="Products" />
            )
            )}
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="phoneNo">
            Phone Number
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="phoneNo" type="tel" value = {phoneNo} onChange = {(e)=> setPhoneNo(e.target.value)} placeholder="Enter phone number" />
        </div>
        <div class="mb-4 relative">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10" id="password" type="password" value = {password} onChange = {(e)=> setPassword(e.target.value)} placeholder="Enter password" />
          <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
            <button type="button" class="text-gray-500 hover:text-gray-700 focus:outline-none">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19c-7.18 0-10.908-4.616-12-7a39.9 39.9 0 0112-7c7.18 0 10.908 4.616 12 7-1.092 2.384-4.82 7-12 7z"></path>
              </svg>
            </button>
          </div>
        </div>
        <div class="flex items-center justify-between">
          <button onClick={handleSellProject} class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            Submit
          </button>
        </div>
      </form>
    </div>
    <div class="lg:w-1/2 mt-5">
    <p class=" text-center font-nunito py-5 ml-5 text-lg text-black"> <span className= "mt-5 ml-[11vh]  text-4xl font-semibold text-color9">Sell with Confidence  </span> <br></br> "Reach the right audience - Our secure platform ensures smooth transactions and allows you to set your project's price."</p>
      <img src= {SellPage3} alt="Sell with Confidence" class="w-[100vh] h-[90vh] mt-0 ml-10" />
     
    </div>
    </div>
  </div>
</section>
    </>
)
};
 
export default Sell