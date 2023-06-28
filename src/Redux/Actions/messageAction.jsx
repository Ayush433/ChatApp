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

export const fetchMessages = (conversationId) => async (dispatch) => {
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
    });
  } catch (error) {
    dispatch({
      type: FETCH_MESSAGES_FAILURE,
      payload: error.message,
    });
  }
};
