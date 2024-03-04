import React from 'react'; 
import NavBar from '../../Layout/Navbar/Navbar';
import SideBar from './SideBar';
import ChatBox from './ChatBox';

const ChatScreen = () => {
    return (

        <div className="w-screen min-w-screen container min-h-screen h-screen mx-auto shadow-lg rounded-lg">
            <NavBar />
            {/* <!-- Chatting --> */}
            <div className="flex  flex-row justify-between bg-white">
                <div className='flex flex-col w-2/5 border-r-2'>
                <h1 className='text-center mt-[1.5rem] text-xl font-nunito font-bold mb-[1rem]'>All Chats</h1>
                <SideBar />
                </div>
              

                {/* <!-- message --> */}
                <div className="  w-full h-full px-5 flex flex-col justify-between">
                   <ChatBox />
                </div>
                {/* <!-- end message --> */}


                <div className="w-2/5 border-l-2 px-5">
                    <div className="flex flex-col">
                        <div className="font-semibold text-xl py-4">Mern Stack Group</div>
                        <img
                            src="https://source.unsplash.com/L2cxSuKWbpo/600x600"
                            className="object-cover rounded-xl h-64"
                            alt=""
                        />
                        <div className="font-semibold py-4">Created 22 Sep 2021</div>
                        <div className="font-light">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt,
                            perspiciatis!
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatScreen;
