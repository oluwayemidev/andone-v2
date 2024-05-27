// src/pages/MessagesPage.js
import React, { useState, useEffect } from 'react';
import { Card,Table } from 'antd';
import axios from 'axios';

const MessagesPage = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const response = await axios.get('https://andonesolar.onrender.com/api/messages');
    setMessages(response.data);
  };

  return (
    <Card title="Messages" bordered={false}>
    <Table dataSource={messages} rowKey="_id">
      <Table.Column title="User" dataIndex={['user', 'username']} key="user" />
      <Table.Column title="Content" dataIndex="content" key="content" />
      <Table.Column title="Timestamp" dataIndex="timestamp" key="timestamp" />
    </Table>
    </Card>
  );
};

export default MessagesPage;
