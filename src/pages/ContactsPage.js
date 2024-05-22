import React, { useEffect, useState } from 'react';
import { Table, Spin, message } from 'antd';
import axios from 'axios';

const ContactMessages = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/contacts');
        setData(response.data);
      } catch (error) {
        message.error('Failed to fetch messages');
      }
      setLoading(false);
    };

    fetchMessages();
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => new Date(text).toLocaleString(),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2>Contact Messages</h2>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Table scroll={{ x: 600}} dataSource={data} columns={columns} rowKey="_id" />
      )}
    </div>
  );
};

export default ContactMessages;
