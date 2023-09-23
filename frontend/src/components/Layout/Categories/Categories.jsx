 import React, { useState } from 'react'; 
 import ArtificialIntelliegence from "../../../images/artificialIntelligence.gif"
 import MachineLearning from "../../../images/machine learning.gif"
 import WebDevelopment from "../../../images/webDevelopment.gif"
 import AndroidDevelopment from "../../../images/androidDevelopment.gif"
 const Categories = () =>{


  const [currentIndex, setCurrentIndex] = useState(0)

  const carouselItems = [
    { image: ArtificialIntelliegence, name: 'Artificial Intelligence' },
    { image: MachineLearning, name: 'Machine Learning' },
    { image: AndroidDevelopment, name: 'IOT' },
    { image: WebDevelopment, name: 'Web Development' },
    { image: AndroidDevelopment, name: 'Android Development' },
    // Add more carousel items as needed
  ];

  const showSlide = (index) => {
    setCurrentIndex(index);
  };

  const handleLeftArrowClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1));
  };

  const handleRightArrowClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1));
  };


return (
    <>
    {/* <------- DESKTOP VIEW -------> */}
   <div class="py-8 z-00" >
  <div class="container mx-auto">
    <h2 class="hidden md:block text-3xl pl-3 font-bold  md:text-4xl font-nunito mb-3  lg:text-4xl">Popular <span className="text-color6">Categories</span></h2>
    <div class="hidden md:grid  gird-cols-2    md:grid-cols-3 md:gap-2 lg:grid-cols-5 lg:gap-5">
       {/* Category 1 */}
      <div class="bg-white   p-4 border-color7  hover:scale-105 hover:z-00 transition-transform">
        <img src= {ArtificialIntelliegence} alt="Category 1" class="w-full h-52 object-cover mb-1 border-2 rounded-lg bg-gradient-to-t from-slate-50 to-blue-100" />
        <h3 class="text-lg font-bold text-gray-800 ml-4">Artificial Intelligence</h3>

      </div>
      
      {/* <!-- Category 2 --> */}
      <div class="bg-white rounded-lg p-4 hover:scale-105 transition-transform">
        <img src= {MachineLearning} alt="Category 2" class="w-full h-52 object-cover mb-1 border-2 rounded-lg bg-gradient-to-t from-slate-50 to-blue-100" />
        <h3 class="text-lg font-bold text-gray-800 ml-6">Machine Learning</h3>

      </div>
      
      {/* <!-- Category 3 --> */}
      <div class="bg-white rounded-lg p-4 hover:scale-105 transition-transform">
        <img src= {AndroidDevelopment}  alt="Category 3" class="w-full h-52 object-cover mb-1 border-2 rounded-lg bg-gradient-to-t from-slate-50 to-blue-100" />
        <h3 class="text-lg font-bold text-gray-800 ml-20">IOT</h3>

      </div>
      {/* Category 4 */}
      <div class="bg-white rounded-lg p-4 border-color7 border-1 hover:scale-105 transition-transform">
        <img src= {WebDevelopment} alt="Category 1" class="w-full h-52 object-cover mb-1 border-2 rounded-lg bg-gradient-to-t from-slate-50 to-blue-100" />
        <h3 class="text-lg  font-bold text-gray-800 ml-8">Web Development</h3>

      </div>
      {/* Category 5 */}
      <div class="bg-white rounded-lg p-4 border-color7 border-1 hover:scale-105 transition-transform">
        <img src= {AndroidDevelopment} alt="Category 1" class="w-full h-52 object-cover mb-1 border-2 rounded-lg bg-gradient-to-t from-slate-50 to-blue-100" />
        <h3 class="text-lg font-bold text-gray-800 ml-5">Android Development</h3>

      </div>
    </div>
  </div>
</div>



{/* <-------------MOBILE VIEW -----------------------> */}

<div className="container mx-auto py-8 md:hidden">
      
      <h2 class="  text-3xl pl-4 font-bold   font-nunito mb-3  ">Popular <span className="text-color6">Categories</span></h2>

      <div className="relative">
        <div className="carousel">
          {carouselItems.map((item, index) => (
            <div
              key={index}
              className={`carousel-item ${currentIndex === index ? 'block' : 'hidden'}`}
            >
              <img src={item.image} alt={`Image ${index + 1}`} className="w-full h-auto" />
              {currentIndex !== index && (
                <img
                  src={carouselItems[(index + 1) % carouselItems.length].image}
                  alt={`Next Image ${index + 1}`}
                  className="w-full h-auto absolute top-0 left-0 filter blur-sm"
                />
              )}
              <p className="mt-2 text-center text-3xl font-bold font-nunito">{item.name}</p>
            </div>
          ))}
        </div>
        <button
          className="carousel-control left-0 top-1/2 transform -translate-y-1/2 absolute bg-gray-200 p-2 rounded-full"
          onClick={handleLeftArrowClick}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7 7zm0 0v-8" />
          </svg>
        </button>
        <button
          className="carousel-control right-0 top-1/2 transform -translate-y-1/2 absolute bg-gray-200 p-2 rounded-full"
          onClick={handleRightArrowClick}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>


    </>
)
};
 
export default Categories