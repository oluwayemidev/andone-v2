import React, { useState } from 'react';
import { Button } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
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

  return (
    <div>
      <Button
        type="primary"
        shape="circle"
        icon={<MessageOutlined />}
        size="large"
        className="floating-button"
        onClick={showPanel}
      />
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
