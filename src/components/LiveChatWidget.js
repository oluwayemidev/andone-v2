// src/components/LiveChatWidget.js
import React, { useState, useRef, useEffect } from 'react';
import { Card, Button, Input } from 'antd';
import { SmileOutlined, QuestionCircleOutlined, FileTextOutlined } from '@ant-design/icons';
import '../styles/LiveChatWidget.css';

const LiveChatWidget = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (text) => {
    if (text.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text, user: true },
        { text: getAutoResponse(text), user: false }
      ]);
      setInputValue('');
    }
  };

  const getAutoResponse = (text) => {
    // Simple auto-response logic (can be improved with more complex logic or API calls)
    if (text.toLowerCase().includes('price')) {
      return 'Our solar panels range from $199.99 to $499.99 depending on the model.';
    } else if (text.toLowerCase().includes('support')) {
      return 'You can reach our support team at support@andone.com or call (123) 456-7890.';
    } else {
      return 'Thank you for your message. Our team will get back to you shortly.';
    }
  };

  const handleOptionClick = (option) => {
    handleSend(option);
  };

  return (
    <Card title={<div className="chat-header">Chat with SolarBot</div>} bordered={false} className="live-chat-container">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.user ? 'user' : ''}`}>
            <div className={`message-content ${message.user ? 'user' : ''}`}>
              {message.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-options">
        <Button
          icon={<SmileOutlined />}
          className="chat-option-button"
          onClick={() => handleOptionClick('Hello!')}
        >
          Greet
        </Button>
        <Button
          icon={<QuestionCircleOutlined />}
          className="chat-option-button"
          onClick={() => handleOptionClick('I need support.')}
        >
          Support
        </Button>
        <Button
          icon={<FileTextOutlined />}
          className="chat-option-button"
          onClick={() => handleOptionClick('Request for a quote.')}
        >
          Quote
        </Button>
      </div>
      <div className="chat-input-container">
        <Input
          className="chat-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onPressEnter={() => handleSend(inputValue)}
          placeholder="Type a message..."
        />
        <Button
          type="primary"
          className="chat-send-button"
          onClick={() => handleSend(inputValue)}
        >
          Send
        </Button>
      </div>
    </Card>
  );
};

export default LiveChatWidget;
