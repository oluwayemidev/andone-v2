import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMessages, sendMessage } from '../actions/chatActions';
import { useParams } from 'react-router-dom';
import { List, Input, Button, Spin } from 'antd';

const AdminChat = () => {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const { userId } = useParams();

  const chatMessages = useSelector((state) => state.chatMessages);
  const { loading, error, messages } = chatMessages;

  useEffect(() => {
    dispatch(getMessages(userId));
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
                title={msg.sender === userId ? 'User' : 'Admin'}
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

export default AdminChat;
