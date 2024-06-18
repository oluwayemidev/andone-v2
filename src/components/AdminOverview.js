import React, { useEffect, useState } from "react";
import { Card, Col, Row, Statistic, Progress, message } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../styles/AdminOverview.css'
import axios from 'axios';

const AdminOverview = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Mock fetch or perform any required data fetching here
    // For example, you can use axios to fetch real data
    // axios.get('/api/some-endpoint').then(response => setData(response.data));
    const fetchData = async () => {
      try {
        // Simulate a fetch operation
        const response = await axios.get('http://localhost:5000/api/sales'); // Replace with actual API endpoint
        setData(response.data);
      } catch (error) {
        message.error('Failed to load data');
      }
    };

    fetchData();
  }, []);

  return (
    <div className="site-statistic-demo-card">
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Active Users"
              value={1128}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
              suffix="Users"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Products"
              value={93}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
              suffix="Items"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Pending Messages"
              value={27}
              valueStyle={{ color: '#cf1322' }}
              prefix={<ArrowDownOutlined />}
              suffix="Messages"
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 24 }}>
        <Col span={12}>
          <Card title="Monthly Sales">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Task Completion">
            <Progress
              type="circle"
              percent={75}
              status="active"
            />
            <Progress
              type="circle"
              percent={50}
              status="exception"
              style={{ marginLeft: 24 }}
            />
            <Progress
              type="circle"
              percent={100}
              style={{ marginLeft: 24 }}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 24 }}>
        <Col span={24}>
          <Card title="User Growth">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#82ca9d" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminOverview;
