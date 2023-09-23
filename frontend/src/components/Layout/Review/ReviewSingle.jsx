import React from "react";
import moment from "moment";

const ReviewSingle = ({review}) => {

//   const options ={
//     edit:false,
//     color:"rgba(20,20,20,0.1)",
//     activeColor:"tomato",
//     size:window.innerWidth <600 ? 20:25,
//     value:4,
//     isHalf:true,
// }
const {name , comment , createdAt} = review

 const timeStamp = createdAt
  const currentTime = moment()
  const inputTime = moment(timeStamp)

  const daysAgo = currentTime.diff(inputTime , 'days')
  const minutesAgo = currentTime.diff(inputTime,'minutes')
  const hoursAgo = currentTime.diff(inputTime,'hours')

  const formattedTime = daysAgo>=1 ? `${daysAgo} days ago` : minutesAgo <60 ? `${minutesAgo} minutes ago`:`${hoursAgo} hours ago`


  return (
    <>
      <div class="flex flex-col  mb-4 mt-5 ml-4 border border-1 mr-3 bg-gradient-to-t from-slate-100 to-blue-50 rounded-lg">
        <div class ="flex mt-4 mb-4">
          <img
            src="https://cdn3.iconfinder.com/data/icons/essential-rounded/64/Rounded-31-512.png"
            alt="User Avatar"
            class="w-10 h-10 rounded-full mr-2 ml-4 mt-1"
          />
          <div>
            <p class="font-semibold text-lg font-nunito">{name}</p>
            <p class="text-gray-500">{formattedTime}</p>
          </div>
        </div>

        <div>
        <p class="text-gray-700 text-md font-nunito font-normal mx-2">
        {comment}
      </p>
        </div>
      </div>
      
    </>
  );
};

export default ReviewSingle;
