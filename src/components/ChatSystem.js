// src/components/ChatSystem.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, Input, Button } from 'antd';

const ChatSystem = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await axios.get('http://localhost:5000/api/chat');
      setMessages(response.data);
    };
    fetchMessages();
  }, []);

  const sendMessage = async () => {
    await axios.post('http://localhost:5000/api/chat', { text: input });
    setInput('');
    const response = await axios.get('http://localhost:5000/api/chat');
    setMessages(response.data);
  };

  return (
    <div>
      <List
        dataSource={messages}
        renderItem={item => <List.Item>{item.text}</List.Item>}
      />
      <Input
        value={input}
        onChange={e => setInput(e.target.value)}
        onPressEnter={sendMessage}
        placeholder="Type a message"
      />
      <Button type="primary" onClick={sendMessage}>Send</Button>
    </div>
  );
};

export default ChatSystem;
