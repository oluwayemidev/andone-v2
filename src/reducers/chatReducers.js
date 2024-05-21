import {
  CHAT_FETCH_MESSAGES_REQUEST,
  CHAT_FETCH_MESSAGES_SUCCESS,
  CHAT_FETCH_MESSAGES_FAIL,
  CHAT_SEND_MESSAGE_REQUEST,
  CHAT_SEND_MESSAGE_SUCCESS,
  CHAT_SEND_MESSAGE_FAIL,
  RECEIVE_MESSAGE,
} from '../constants/chatConstants';

export const chatMessagesReducer = (state = { messages: [] }, action) => {
  switch (action.type) {
    case CHAT_FETCH_MESSAGES_REQUEST:
      return { loading: true, messages: [] };
    case CHAT_FETCH_MESSAGES_SUCCESS:
      return { loading: false, messages: action.payload };
    case CHAT_FETCH_MESSAGES_FAIL:
      return { loading: false, error: action.payload };
    case CHAT_SEND_MESSAGE_REQUEST:
      return { ...state, loading: true };
    case CHAT_SEND_MESSAGE_SUCCESS:
      return { ...state, loading: false, messages: [...state.messages, action.payload] };
    case CHAT_SEND_MESSAGE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case RECEIVE_MESSAGE:
      return { ...state, messages: [...state.messages, action.payload] };
    default:
      return state;
  }
};
