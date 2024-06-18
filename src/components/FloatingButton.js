import React, { useState } from 'react';
import { Button, Tooltip } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import bot from '../icons/bot.svg';
import ChatbotComponent from './Chatbot';
import '../styles/FloatingButton.css';

const FloatingButton = () => {
  const [visible, setVisible] = useState(false);

  const showPanel = () => {
    setVisible(true);
  };

  const hidePanel = () => {
    setVisible(false);
  };

  const Bot = () => {
    return (
      <img src={bot} alt="bot" style={{ width: 30, height: 30 }} />
    );
  };

  return (
    <div>
      <Tooltip placement='left' color='blue' title="Chat with SolarBot">
        <Button
          type="primary"
          shape="circle"
          icon={<Bot />}
          size="large"
          className="floating-button"
          onClick={showPanel}
        />
      </Tooltip>
      <div className={`slide-panel ${visible ? 'visible' : ''}`}>
        <div className="slide-panel-header">
          <span>Chat with SolarBot</span>
          <Button type="text" onClick={hidePanel} className="close-button">
            &times;
          </Button>
        </div>
        <div className="slide-panel-content">
          <ChatbotComponent />
        </div>
      </div>
      {visible && <div className="overlay" onClick={hidePanel}></div>}
    </div>
  );
};

export default FloatingButton;
