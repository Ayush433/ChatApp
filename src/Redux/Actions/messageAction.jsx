import {
  FETCH_CONVERSATIONS_FAILURE,
  FETCH_CONVERSATIONS_REQUEST,
  FETCH_CONVERSATIONS_SUCCESS,
  FETCH_MESSAGES_FAILURE,
  FETCH_MESSAGES_REQUEST,
  FETCH_MESSAGES_SUCCESS,
} from "../Constants/userConstants";

export const fetchConversations = (userId) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_CONVERSATIONS_REQUEST });

    const res = await fetch(
      `http://localhost:4000/api/conversation/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();

    dispatch({
      type: FETCH_CONVERSATIONS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_CONVERSATIONS_FAILURE,
      payload: error.message,
    });
  }
};

export const fetchMessages = (conversationId, user) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_MESSAGES_REQUEST });

    // Example API call using fetch
    const res = await fetch(
      `http://localhost:4000/api/message/${conversationId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();

    dispatch({
      type: FETCH_MESSAGES_SUCCESS,
      payload: data,
      receiver: user,
      conversationId,
    });
  } catch (error) {
    dispatch({
      type: FETCH_MESSAGES_FAILURE,
      payload: error.message,
    });
  }
};

// export const sendMessageRequest = () => ({
//   type: SEND_MESSAGE_REQUEST,
// });

// export const sendMessageSuccess = () => ({
//   type: SEND_MESSAGE_SUCCESS,
// });

// export const sendMessageFailure = (error) => ({
//   type: SEND_MESSAGE_FAILURE,
//   payload: error,
// });

// export const sendMessage =
//   (conversationId, senderId, message, receiverId = "") =>
//   async (dispatch) => {
//     dispatch(sendMessageRequest());

//     try {
//       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       const config = {
//         headers: {
//           Authorization: `Bearer ${userInfo?.data?.token}`,
//         },
//       };
//       const response = await axios.post(
//         "http://localhost:4000/api/message",

//         {
//           conversationId,
//           senderId,
//           message,
//           receiverId,
//         },
//         config
//       );

//       dispatch(sendMessageSuccess());
//       // You can perform additional actions here if needed
//     } catch (error) {
//       dispatch(
//         sendMessageFailure(
//           error.response?.data?.message || "Failed to send message"
//         )
//       );
//     }
//   };

// established Connection

//After Connection Established Message Send
