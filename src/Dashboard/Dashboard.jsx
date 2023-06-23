import React from "react";
import Avatar from "../../public/image.png";

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
      <div className="w-[25%] border border-black h-screen bg-secondary">
        <div className=" flex justify-center items-center my-8">
          <img className="w-[35%] h-[30%]" src="/image.png" alt="logo" />

          <div className="ml-4">
            <h1 className="text-2xl">Ayush Adhikari</h1>
            <h3 className="text-lg font-light">My Account</h3>
          </div>
        </div>
        <hr />
        <div>Messages</div>
        <div>
          {Contact.map(({ name, status, image }) => {
            return (
              <div>
                <div className=" flex justify-center items-center my-8">
                  <img className="w-[20%] h-[30%]" src={image} alt="logo" />

                  <div className="ml-4">
                    <h1 className="text-2xl">{name}</h1>
                    <h3 className="text-lg font-light">{status}</h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-[50%] border border-black h-screen"></div>
      <div className="w-[25%] border border-black h-screen"></div>
    </div>
  );
};

export default Dashboard;
