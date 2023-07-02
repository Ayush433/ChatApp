import { useEffect, useRef, useState } from "react";
import Img1 from "../../assets/image.png";
import Input from "../../Components/Input";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user:detail")) || {}
  );
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState({});
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [socket, setSocket] = useState(null);
  const messageRef = useRef(null);
  console.log("conversatation", conversations);

  useEffect(() => {
    setSocket(io("http://localhost:8080"));
  }, []);

  useEffect(() => {
    if (user && user.id) {
      socket?.emit("addUser", user.id);
    }
    socket?.on("getUsers", (users) => {
      console.log("activeUsers :>> ", users);
    });
    socket?.on("getMessage", (data) => {
      setMessages((prev) => ({
        ...prev,
        messages: [
          ...prev.messages,
          { user: data.user, message: data.message },
        ],
      }));
    });
  }, [socket]);

  useEffect(() => {
    messageRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages?.messages]);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user:detail"));
    const fetchConversations = async () => {
      const res = await fetch(
        `https://chatapp-gj54.onrender.com/api/conversations/${loggedInUser?.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const resData = await res.json();
      setConversations(resData);
    };
    fetchConversations();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(
        `https://chatapp-gj54.onrender.com/api/users/${user?.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const resData = await res.json();
      setUsers(resData);
    };
    fetchUsers();
  }, []);

  const fetchMessages = async (conversationId, receiver) => {
    const res = await fetch(
      `https://chatapp-gj54.onrender.com/api/message/${conversationId}?senderId=${user?.id}&&receiverId=${receiver?.receiverId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const resData = await res.json();
    setMessages({ messages: resData, receiver, conversationId });
  };

  const sendMessage = async (e) => {
    setMessage("");
    socket?.emit("sendMessage", {
      senderId: user?.id,
      receiverId: messages?.receiver?.receiverId,
      message,
      conversationId: messages?.conversationId,
    });
    const res = await fetch(`https://chatapp-gj54.onrender.com/api/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        conversationId: messages?.conversationId,
        senderId: user?.id,
        message,
        receiverId: messages?.receiver?.receiverId,
      }),
    });
  };
  const logout = () => {
    localStorage.removeItem("user:detail");
    localStorage.removeItem("user:token");
    window.location.reload();
  };

  return (
    <div className="w-screen flex">
      <div className="w-[30%] h-screen bg-secondary overflow-scroll md:w-[25%]">
        <div className="flex items-center my-5 flex-col md:flex-row">
          <img
            src=""
            width={55}
            height={55}
            className="w-[75%] h-[20%] md:w-[20%] md:h-[20%] md:flex-row md:ml-[40px]"
          />

          <div className="">
            <h1 className="text-sm font-semibold  md:text-xl">
              {user?.fullName}
            </h1>
            <h3 className="text-sm font-light md:ml-7">My Account</h3>
          </div>
        </div>
        <hr />
        <div className="">
          <div className="text-primary mr-10">Messages</div>
          <div>
            {conversations.length > 0 ? (
              conversations.map(({ conversationId, user }) => {
                return (
                  <div className="flex items-center my-8 mr-7 border-b border-b-gray-300">
                    <div
                      className="cursor-pointer flex items-center flex-col md:flex-row md:mb-[20px]"
                      onClick={() => fetchMessages(conversationId, user)}
                    >
                      <div>
                        <img
                          src={Img1}
                          className="w-[65%] h-[30%] md:w-[15%] md:h-[30%] rounded-full"
                        />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold">
                          {user?.fullName}
                        </h3>
                        <p className="text-sm font-light text-gray-600">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center text-sm mr-6 font-semibold pb-4 pt-4">
                No Conversations
              </div>
            )}
          </div>
        </div>
        <div className="text-primary text-lg">All Users</div>
        <div>
          {users.length > 0 ? (
            users.map(({ userId, user }) => {
              return (
                <div className="flex items-center my-8 mr-7 border-b border-b-gray-300">
                  <div
                    className="cursor-pointer flex items-center flex-col md:flex-row md:mb-[20px]"
                    onClick={() => fetchMessages("new", user)}
                  >
                    <div>
                      <img
                        src={Img1}
                        className="w-[65%] h-[30%] md:w-[45%] md:h-[40%] rounded-full"
                      />
                    </div>
                    <div className="ml-4 md:mr-[90px]">
                      <h3 className="text-lg font-semibold ">
                        {user?.fullName}
                      </h3>
                      <p className="text-sm font-light text-gray-600">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center text-sm font-semibold mt-24">
              No Conversations
            </div>
          )}
          <button
            class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-[100%] h-full mb-5 md:w-[70%] md:ml-9"
            onClick={logout}
          >
            LogOut
          </button>
        </div>
      </div>
      <div className="w-[70%] h-screen bg-white flex flex-col items-center">
        {messages?.receiver?.fullName && (
          <div className="w-[75%] bg-secondary h-[80px] my-14 rounded-full flex items-center px-14 py-2">
            <div className="cursor-pointer w-[100%] h-[100%] md:w-[20%] md:ml-10">
              <img src={Img1} width={60} height={20} className="rounded-full" />
            </div>
            <div className="">
              <h3 className="text-sm mt-2 md:text-lg">
                {messages?.receiver?.fullName}
              </h3>
              <p className="text-sm font-light text-gray-600">
                {messages?.receiver?.email}
              </p>
            </div>
            <div className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-phone-outgoing"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="black"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                <line x1="15" y1="9" x2="20" y2="4" />
                <polyline points="16 4 20 4 20 8" />
              </svg>
            </div>
          </div>
        )}
        <div className="h-[75%] w-full overflow-scroll shadow-sm">
          <div className="p-14">
            {messages?.messages?.length > 0 ? (
              messages.messages.map(({ message, user: { id } = {} }) => {
                return (
                  <>
                    <div
                      className={`w-[200px] md:w-[300px] md:h-[80px] bg-primary rounded-b-xl rounded-tr-xl p-4 mb-4 ${
                        id === user?.id
                          ? "bg-primary text-white rounded-tl-xl ml-auto"
                          : "bg-secondary rounded-tr-xl"
                      } `}
                    >
                      {message}
                    </div>
                    <div ref={messageRef}></div>
                  </>
                );
              })
            ) : (
              <div className="text-center text-lg font-semibold mt-24">
                No Messages or No Conversation Selected
              </div>
            )}
          </div>
        </div>
        {messages?.receiver?.fullName && (
          <div className="md:p-14 w-full flex items-center">
            <Input
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-[75%]"
              inputClassName="p-4 border-0 shadow-md rounded-full bg-light focus:ring-0 focus:border-0 outline-none"
            />
            <div
              className={`ml-4 p-2 cursor-pointer bg-light rounded-full ${
                !message && "pointer-events-none"
              }`}
              onClick={() => sendMessage()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-send"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#2c3e50"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <line x1="10" y1="14" x2="21" y2="3" />
                <path d="M21 3l-6.5 18a0.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a0.55 .55 0 0 1 0 -1l18 -6.5" />
              </svg>
            </div>
            <div
              className={`ml-4 p-2 cursor-pointer bg-light rounded-full ${
                !message && "pointer-events-none"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-circle-plus"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#2c3e50"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <circle cx="12" cy="12" r="9" />
                <line x1="9" y1="12" x2="15" y2="12" />
                <line x1="12" y1="9" x2="12" y2="15" />
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;