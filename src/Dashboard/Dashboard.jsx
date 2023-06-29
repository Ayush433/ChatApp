import React from "react";
import Avatar from "/image.png";
import { FcVideoCall } from "react-icons/fc";
import { FiSend } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchConversations,
  fetchMessages,
} from "../Redux/Actions/messageAction";
import { fetchAllUsers } from "../Redux/Actions/userActions";
import { useState } from "react";

const Dashboard = () => {
  const [newMessage, setNewMessage] = useState("");
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.signIn);
  const conversations = useSelector((state) => state.message.conversations);
  const { users } = useSelector((state) => state.users);
  console.log("users", users);
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  console.log("con", conversations);
  const messages = useSelector((state) => state.message.messages);
  console.log("messages", messages);

  useEffect(() => {
    dispatch(fetchConversations(userInfo?.data?.id));
  }, [dispatch, userInfo]);

  const handleUserClick = (conversationId) => {
    dispatch(fetchMessages(conversationId));
  };

  // api of send Message
  const handleSendMessage = async (conversationId) => {
    try {
      const response = await fetch("http://localhost:4000/api/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          conversationId,
          senderId: userInfo?.data?.id,
          message: newMessage,
        }),
      });

      if (response.ok) {
        // Message sent successfully, you can update the messages or fetch updated messages
        dispatch(fetchMessages(conversationId));
        setNewMessage("");
      } else {
        // Handle error response
        const data = await response.json();
        console.log("Error:", data.message);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="w-screen flex">
      <div className="w-[25%] h-screen bg-secondary">
        <div className="flex items-center my-8 flex-col md:flex-row">
          <img
            className="w-[75%] h-[20%] md:w-[20%] md:h-[20%] md:flex-row md:ml-[40px]"
            src={Avatar}
            alt="logo"
          />
          <div className="">
            <h1 className="text-sm font-semibold ml-4 md:text-xl">
              {userInfo?.data?.fullName}
            </h1>
            <h3 className="text-sm font-light md:ml-7">My Account</h3>
          </div>
        </div>
        <hr />
        <div className="text-blue-500">Messages</div>
        <div>
          {conversations.length === 0 ? (
            <div>No conversations found.</div>
          ) : (
            conversations.map((conversation) => (
              <div key={conversation.conversationId}>
                <div className="flex items-center my-8 mr-7 border-b border-b-gray-300">
                  <div
                    className="cursor-pointer flex items-center flex-col md:flex-row md:mb-[20px]"
                    onClick={() => handleUserClick(conversation.conversationId)}
                  >
                    <img
                      className="w-[65%] h-[30%] md:w-[15%] md:h-[30%]"
                      src={Avatar} // Replace with actual image source
                      alt="logo"
                    />
                    <div className="ml-4">
                      <h1 className="text-xl font-semibold">
                        {conversation.user.fullName}
                      </h1>
                      <h3 className="text-lg font-light text-gray-400">
                        {conversation.user.email}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="text-blue-500">All Users</div>
        {users && Array.isArray(users) && users.length === 0 ? (
          <div>No conversations found.</div>
        ) : (
          users &&
          Array.isArray(users) &&
          users.map((user) => (
            <div
              key={user.id}
              className="flex items-center my-8 mr-7 border-b border-b-gray-300"
            >
              <div
                className="cursor-pointer flex items-center flex-col md:flex-row md:mb-[20px]"
                onClick={() => handleUserClick(user.id)}
              >
                <img
                  className="w-[65%] h-[30%] md:w-[15%] md:h-[30%]"
                  src={Avatar} // Replace with actual image source
                  alt="logo"
                />
                <div className="ml-4">
                  <h1 className="text-xl font-semibold">{user.fullName}</h1>
                  <h3 className="text-lg font-light text-gray-400">
                    {user.email}
                  </h3>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="w-[75%] bg-white h-screen  flex flex-col items-center ">
        <div className="w-[100%] md:w-[62%] md:mb-8 rounded-full flex item-center bg-secondary mt-11">
          <div className="w-[30%] h-[20%] md:w-[10%] md:ml-10 cursor-pointer">
            <img src={Avatar} alt="" />
          </div>
          <div className="ml-3 md:ml-6">
            <h3 className="text-sm mt-2 md:text-lg">
              {conversations[0]?.user?.fullName}
            </h3>
            <p className="text-sm font-light text-green-600">Online</p>
          </div>
          <div className="ml-[40px] mt-4 pr-5 md:ml-[300px] cursor-pointer">
            <FcVideoCall size={30} />
          </div>
        </div>
        <div className="h-[75%] border w-full overflow-y-auto">
          <div className="h-[1000px] md:px-10 py-14 px-2 overflow-hidden">
            {messages.length ? (
              messages.map(({ message, user: { id } = {} } = {}) => {
                if (id === userInfo?.data?.id) {
                  return (
                    <div className="w-[200px] md:w-[300px] md:h-[80px] bg-primary rounded-b-xl rounded-tr-xl p-4 mb-4">
                      <p className="text-white">{message}</p>
                    </div>
                  );
                } else {
                  return (
                    <div className="w-[200px] md:w-[300px] md:h-[80px] bg-secondary rounded-b-xl rounded-tr-xl ml-auto text-white p-4">
                      <p className="text-black">{message}</p>
                    </div>
                  );
                }
              })
            ) : (
              <div className="text-center text-lg font-semibold">
                No Message
              </div>
            )}
          </div>
        </div>
        <div className="md:p-14 w-full flex items-center">
          <input
            placeholder="Type a message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="md:w-[70%]  border-0 p-3 shadow-mg rounded-full bg-light focus:ring-0"
          />
          <div
            className=" ml-3 md:ml-[90px] text-blue-600 cursor-pointer"
            onClick={() => handleSendMessage(conversations[0]?.conversationId)}
          >
            <FiSend size={25} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
