// src/components/Chatbot.js
import React from 'react';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import config from './ChatbotConfig';
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';
import '../styles/Chatbot.css';

const ChatbotComponent = () => {
  return (
    <div className="chatbot-container">
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
    </div>
  );
};

export default ChatbotComponent;
