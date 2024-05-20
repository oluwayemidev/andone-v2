import React, { useState, useEffect } from 'react';
import { Input, Button, List, Typography } from 'antd';
import io from 'socket.io-client';

const { Title } = Typography;

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'http://localhost:5000'; // Replace with your server endpoint
  let socket;

  useEffect(() => {
    socket = io(ENDPOINT);

    socket.on('message', (message) => {
      setMessages((messages) => [...messages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, [ENDPOINT]);

  const sendMessage = (e) => {
    e.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <Title level={2}>Chat</Title>
      <List
        size="large"
        bordered
        dataSource={messages}
        renderItem={(item) => <List.Item>{item}</List.Item>}
        style={{ marginBottom: '1rem' }}
      />
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        onPressEnter={sendMessage}
        style={{ marginBottom: '1rem' }}
      />
      <Button type="primary" onClick={sendMessage}>
        Send
      </Button>
    </div>
  );
};

export default Chat;
