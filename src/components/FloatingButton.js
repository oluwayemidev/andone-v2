// src/components/FloatingButton.js
import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import ChatbotComponent from './Chatbot';
import '../styles/FloatingButton.css';

const FloatingButton = () => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
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
        onClick={showDrawer}
      />
      <Drawer
        title="Chat with SolarBot"
        placement="right"
        onClose={onClose}
        visible={visible}
        width={400}
      >
        <ChatbotComponent />
      </Drawer>
    </div>
  );
};

export default FloatingButton;
