// src/components/AdminPanel.js
import React, { useState, useEffect } from 'react';
import { Table, Button } from 'antd';
import axios from 'axios';

const AdminPanel = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('https://your-backend-api.com/quotations');
      setData(result.data);
    };
    fetchData();
  }, []);

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Requirements', dataIndex: 'requirements', key: 'requirements' },
    { title: 'Action', key: 'action', render: (_, record) => (
      <Button type="link" onClick={() => handleDelete(record.key)}>Delete</Button>
    )}
  ];

  const handleDelete = async key => {
    await axios.delete(`https://your-backend-api.com/quotations/${key}`);
    setData(data.filter(item => item.key !== key));
  };

  return (
    <Table columns={columns} dataSource={data} rowKey="key" />
  );
};

export default AdminPanel;
