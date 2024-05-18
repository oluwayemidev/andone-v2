// src/components/ChatbotConfig.js
import { createChatBotMessage } from 'react-chatbot-kit';

const config = {
  botName: 'SolarBot',
  initialMessages: [createChatBotMessage(`Hi! I'm SolarBot. How can I assist you today?`)],
  customStyles: {
    botMessageBox: {
      backgroundColor: '#1890ff',
    },
    chatButton: {
      backgroundColor: '#1890ff',
    },
  },
};

export default config;
