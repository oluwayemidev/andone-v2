import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { List, Input, Button, Spin } from 'antd';
import { getMessages, sendMessage, initializeSocket } from '../actions/chatActions';
import '../styles/AdminChat.css';  // Ensure to create and import the CSS file

const AdminChat = () => {
  const [message, setMessage] = useState('');
  const { userId } = useParams();
  const dispatch = useDispatch();
  const chatEndRef = useRef(null);

  const chatMessages = useSelector((state) => state.chatMessages);
  const { loading, error, messages } = chatMessages;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userId && userInfo) {
      dispatch(getMessages(userId));
      dispatch(initializeSocket(userInfo._id));
    }
  }, [dispatch, userId, userInfo]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      dispatch(sendMessage(userId, message));
      setMessage('');
    }
  };

  return (
    <div className="chat-container">
      {loading ? (
        <Spin size="large" />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="chat-messages-container">
          <List
            className="chat-messages"
            itemLayout="horizontal"
            dataSource={messages}
            renderItem={(msg) => (
              <List.Item className={msg.sender._id === userInfo._id ? 'admin-message' : 'user-message'}>
                <List.Item.Meta
                  title={msg.sender._id === userInfo._id ? 'Admin' : userInfo.name}
                  description={msg.content}
                />
              </List.Item>
            )}
          />
          <div ref={chatEndRef}></div>
        </div>
      )}
      <div className="chat-input">
        <Input.TextArea
          rows={2}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button onClick={handleSendMessage} type="primary">
          Send
        </Button>
      </div>
    </div>
  );
};

export default AdminChat;
