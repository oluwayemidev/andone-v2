// src/components/ChatbotConfig.js
import { createChatBotMessage } from 'react-chatbot-kit';
import { Avatar } from 'antd'
import logo from '../roundLogo.png'
import Intro from './chatbot/Intro';
import SolarQuestions from './chatbot/SolarQuestions';
import QuoteWidget from './chatbot/QuoteWidget';
import Yesorno from './chatbot/Yesorno';

const botName = 'SolarBot'

const config = {
  botName: {botName},
  initialMessages: [
    createChatBotMessage(`Hi! I'm ${botName}. How can I assist you today?`),
    createChatBotMessage('We specialize in high-quality solar panels and accessories.', {
      delay: 2000,
      widget: 'productInquiry'
  })
],
  customComponents: {
    header: () => {},
    botAvatar: (props) => <Avatar><img src={logo} width='100%' alt='A' {...props} /></Avatar>,
  },
  customStyles: {
    botMessageBox: {
      backgroundColor: '#1890ff',
    },
    chatButton: {
      backgroundColor: '#1890ff',
    },
  },
  widgets: [
    {
        widgetName: 'productInquiry',
        widgetFunc: (props) => <Intro {...props} />,
    },
    {
        widgetName: 'solarquestions',
        widgetFunc: (props) => <SolarQuestions {...props} />,
    },
    {
        widgetName: 'yesorno',
        widgetFunc: (props) => <Yesorno {...props} />
    },
    {
        widgetName: 'quote',
        widgetFunc: (props) => <QuoteWidget {...props} />
    },
  ]
};

export default config;
