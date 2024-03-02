 import React from 'react'; 
 
 const ProjectImages = ({createProductImagesChange , imagesPreview}) =>{

  console.log("images preview ",imagesPreview)
return (
  <>
  <div className=' flex  flex-col p-4 h-[95%]'>
  <h1 className='font-nunito text-2xl text-center mb-6 font-extrabold  '>Enter Your Project Detailed Description</h1>
  <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="images">
            Images
          </label>
          <input class="shadow flex appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="images" accept="image/*" multiple onChange={createProductImagesChange} type="file" />
        </div>

        <div className = "ml-[8rem] mb-[3rem] w-[100%] h-[70%]  flex">
            {imagesPreview.map((image,index)=> (
                <img className = "w-[60%] h-[100%] mx-4 rounded-lg" src={image} key={index} alt="Products" />
            )
            )}
        </div>
  </div>
   
  </>
)
};
 
export default ProjectImages