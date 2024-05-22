import axios from 'axios';
import {
  CHAT_FETCH_MESSAGES_REQUEST,
  CHAT_FETCH_MESSAGES_SUCCESS,
  CHAT_FETCH_MESSAGES_FAIL,
  CHAT_SEND_MESSAGE_REQUEST,
  CHAT_SEND_MESSAGE_SUCCESS,
  CHAT_SEND_MESSAGE_FAIL,
  RECEIVE_MESSAGE,
} from '../constants/chatConstants';
import { io } from 'socket.io-client';

let socket;

export const getMessages = (userId) => async (dispatch, getState) => {
  try {
    dispatch({ type: CHAT_FETCH_MESSAGES_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`http://localhost:5000/api/chat/${userId}`, config);

    dispatch({ type: CHAT_FETCH_MESSAGES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CHAT_FETCH_MESSAGES_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const sendMessage = (receiverId, content) => async (dispatch, getState) => {
  try {
    dispatch({ type: CHAT_SEND_MESSAGE_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`http://localhost:5000/api/chat/${receiverId}`, { content }, config);

    dispatch({ type: CHAT_SEND_MESSAGE_SUCCESS, payload: data });

    if (socket) {
      socket.emit('sendMessage', data);
    }
  } catch (error) {
    dispatch({
      type: CHAT_SEND_MESSAGE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const initializeSocket = (userId) => (dispatch) => {
  socket = io('http://localhost:5000');

  socket.on('connect', () => {
    socket.emit('join', { userId });
  });

  socket.on('message', (newMessage) => {
    dispatch({ type: RECEIVE_MESSAGE, payload: newMessage });
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected');
  });
};
