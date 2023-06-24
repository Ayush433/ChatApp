import React from "react";
import Avatar from "/image.png";
import { FcVideoCall } from "react-icons/fc";

const Dashboard = () => {
  const Contact = [
    {
      name: "John",
      status: "Available",
      image: Avatar,
    },
    {
      name: "Harry",
      status: "Available",
      image: Avatar,
    },
    {
      name: "Tommy",
      status: "Available",
      image: Avatar,
    },
  ];
  return (
    <div className="w-screen flex ">
      <div className="w-[25%] h-screen bg-secondary">
        <div className=" flex items-center my-8 flex-col md:flex-row">
          <img
            className="w-[75%] h-[20%] md:w-[20%] md:h-[20%] md:flex-row md:ml-[40px]"
            src={Avatar}
            alt="logo"
          />

          <div className="">
            <h1 className="text-sm font-semibold ml-4 md:text-xl">Ayush</h1>
            <h3 className="text-sm font-light">My Account</h3>
          </div>
        </div>
        <hr />
        <div className="text-blue-500">Messages</div>
        <div>
          {Contact.map(({ name, status, image }) => {
            return (
              <div>
                <div className=" flex items-center my-8 mr-7 border-b border-b-gray-300">
                  <div className="cursor-pointer flex items-center flex-col md:flex-row md:mb-[20px]">
                    <img
                      className="w-[65%] h-[30%] md:w-[20%] md:h-[30%]"
                      src={image}
                      alt="logo"
                    />

                    <div className="ml-4">
                      <h1 className="text-xl font-semibold">{name}</h1>
                      <h3 className="text-lg font-light text-gray-400">
                        {status}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-[65%] bg-white h-screen  flex flex-col items-center ">
        <div className="w-[100%] md:w-[75%] rounded-full flex item-center bg-secondary mt-11">
          <div className="w-[30%] h-[20%] md:w-[10%] md:ml-10 cursor-pointer">
            <img src={Avatar} alt="" />
          </div>
          <div className="ml-3 md:ml-6">
            <h3 className="text-sm mt-2 md:text-lg">Alexndar</h3>
            <p className="text-sm font-light text-gray-600">Online</p>
          </div>
          <div className="ml-[40px] mt-4 pr-5 md:ml-[300px] cursor-pointer">
            <FcVideoCall size={30} />
          </div>
        </div>
        <div className="h-[75%] border w-full overflow-y-auto">
          <div className="h-[1000px] md:px-10 py-14 px-2 overflow-hidden">
            <div className="w-[200px] md:w-[300px] md:h-[80px] bg-secondary rounded-b-xl rounded-tr-xl p-4 mb-4">
              <p>malai baal nai xaina .</p>
            </div>
            <div className="w-[200px] md:w-[300px] md:h-[80px] bg-primary rounded-b-xl rounded-tr-xl ml-auto text-white p-4">
              <p>hahah sai ho kei vako nai xaina k kna ho rw.</p>
            </div>
            <div className="w-[200px] md:w-[300px] md:h-[80px] bg-secondary rounded-b-xl rounded-tr-xl p-4 mb-4">
              <p>malai baal nai xaina .</p>
            </div>
            <div className="w-[200px] md:w-[300px] md:h-[80px] bg-primary rounded-b-xl rounded-tr-xl ml-auto text-white p-4">
              <p>hahah sai ho kei vako nai xaina k kna ho rw.</p>
            </div>
            <div className="w-[200px] md:w-[300px] md:h-[80px] bg-secondary rounded-b-xl rounded-tr-xl p-4 mb-4">
              <p>malai baal nai xaina .</p>
            </div>
            <div className="w-[200px] md:w-[300px] md:h-[80px] bg-primary rounded-b-xl rounded-tr-xl ml-auto text-white p-4">
              <p>hahah sai ho kei vako nai xaina k kna ho rw.</p>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="w-[25%] border border-black h-screen"></div> */}
    </div>
  );
};

export default Dashboard;
