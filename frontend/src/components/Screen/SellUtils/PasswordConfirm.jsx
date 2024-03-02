 import React from 'react'; 
 
 const PasswordConfirm = ({password,setPassword}) =>{
return (
    <>
    <div className=' flex  flex-col justify-center p-4 h-[95%]'>
  <h1 className='font-nunito text-2xl text-center mb-6 font-extrabold  '>Please Confirm Your Password !</h1>
  <div class="mb-4 relative">
                  <label
                   class="block text-black text-md font-nunito font-bold mb-2"
                    for="password"
                  >
                    Password
                  </label>
                  <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                  />
                  </div>
  </div>
     
    </>
)
};
 
export default PasswordConfirm