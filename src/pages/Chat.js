// Chat.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMessages, sendMessage, initializeSocket } from '../actions/chatActions';
import { useParams } from 'react-router-dom';
import { List, Input, Button, Spin } from 'antd';

const Chat = () => {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const { userId } = useParams();

  const chatMessages = useSelector((state) => state.chatMessages);
  const { loading, error, messages } = chatMessages;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(getMessages(userId));
    dispatch(initializeSocket());
  }, [dispatch, userId]);

  const handleSendMessage = () => {
    if (message.trim()) {
      dispatch(sendMessage(userId, message));
      setMessage('');
    }
  };

  return (
    <div>
      {loading ? (
        <Spin size="large" />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={messages}
          renderItem={(msg) => (
            <List.Item>
              <List.Item.Meta
                title={msg.sender._id === userInfo._id ? 'You' : 'Admin'}
                description={msg.content}
              />
            </List.Item>
          )}
        />
      )}
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
