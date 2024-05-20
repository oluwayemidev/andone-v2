import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getMessages, sendMessage } from '../actions/chatActions';
import { List, Input, Button } from 'antd';
import socketIOClient from 'socket.io-client';

const Chat = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    // Connect to Socket.IO server
    const socket = socketIOClient('http://localhost:5000');

    // Join the chat room
    socket.emit('join', { userId: userInfo._id });

    // Fetch existing messages
    dispatch(getMessages(userId));

    // Listen for incoming messages
    socket.on('message', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // Clean up socket connection
    return () => {
      socket.disconnect();
    };
  }, [dispatch, userId, userInfo]);

  const handleSendMessage = () => {
    if (message.trim()) {
      // Dispatch action to send message
      dispatch(sendMessage(userId, message));
      // Clear message input
      setMessage('');
    }
  };

  return (
    <div>
      <h2>Chat with {userId}</h2>
      <List
        dataSource={messages}
        renderItem={(msg) => (
          <List.Item>
            <List.Item.Meta title={msg.sender.name} description={msg.content} />
          </List.Item>
        )}
      />
      <Input.TextArea
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button onClick={handleSendMessage} type="primary">
        Send
      </Button>
    </div>
  );
};

export default Chat;