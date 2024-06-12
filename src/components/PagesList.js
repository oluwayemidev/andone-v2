// src/components/PagesList.js
import React from 'react';
import { Table, Button, Space, Typography } from 'antd';
import { EditOutlined, InfoCircleOutlined, ToolOutlined, PhoneOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title } = Typography;

const pagesData = [
  {
    key: '1',
    name: 'About',
    path: 'about',
    icon: <InfoCircleOutlined style={{ color: '#1E90FF' }} />,
    color: '#1E90FF',
  },
  {
    key: '2',
    name: 'Services',
    path: 'services',
    icon: <ToolOutlined style={{ color: '#32CD32' }} />,
    color: '#32CD32',
  },
  {
    key: '3',
    name: 'Contact',
    path: 'contact',
    icon: <PhoneOutlined style={{ color: '#FF4500' }} />,
    color: '#FF4500',
  },
  // Add more pages as needed
];

const PagesList = () => {
  const columns = [
    {
      title: 'Page Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          {record.icon}
          <span>{text}</span>
        </Space>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 100,
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/admin/pages/${record.path}`}>
            <Button type="default" icon={<EditOutlined />}>
              Edit
            </Button>
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '40px' }}>
      <Title level={2}>Manage Pages</Title>
      <Table
        columns={columns}
        dataSource={pagesData}
        pagination={false}
        rowClassName={(record) => `ant-table-row-custom-${record.key}`}
        bordered
      />
      <style jsx="true">{`
        .ant-table-row-custom-1 {
          background-color: #e6f7ff;
        }
        .ant-table-row-custom-2 {
          background-color: #f6ffed;
        }
        .ant-table-row-custom-3 {
          background-color: #fff7e6;
        }
        .ant-table-thead > tr > th {
          background-color: #fafafa;
          font-weight: bold;
        }
        .ant-table {
          border: 1px solid #f0f0f0;
        }
      `}</style>
    </div>
  );
};

export default PagesList;
