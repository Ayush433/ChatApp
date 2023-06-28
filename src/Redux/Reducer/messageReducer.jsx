import {
  FETCH_CONVERSATIONS_FAILURE,
  FETCH_CONVERSATIONS_REQUEST,
  FETCH_CONVERSATIONS_SUCCESS,
  FETCH_MESSAGES_FAILURE,
  FETCH_MESSAGES_REQUEST,
  FETCH_MESSAGES_SUCCESS,
} from "../Constants/userConstants";

const initialState = {
  conversations: [],
  messages: [],
  loadingConversations: false,
  loadingMessages: false,
  error: null,
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CONVERSATIONS_REQUEST:
      return {
        ...state,
        loadingConversations: true,
        error: null,
      };
    case FETCH_CONVERSATIONS_SUCCESS:
      return {
        ...state,
        loadingConversations: false,
        conversations: action.payload,
      };
    case FETCH_CONVERSATIONS_FAILURE:
      return {
        ...state,
        loadingConversations: false,
        error: action.payload,
      };
    case FETCH_MESSAGES_REQUEST:
      return {
        ...state,
        loadingMessages: true,
        error: null,
      };
    case FETCH_MESSAGES_SUCCESS:
      return {
        ...state,
        loadingMessages: false,
        messages: action.payload,
      };
    case FETCH_MESSAGES_FAILURE:
      return {
        ...state,
        loadingMessages: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default messageReducer;
