import React, { useState } from 'react';
import axios from 'axios';
import { Layout, Table, Input, Button, Form, Typography, notification, AutoComplete } from 'antd';

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;

const suggestedItems = [
  'LED Light Bulb',
  'Refrigerator',
  'Air Conditioner',
  'Laptop',
  'Television',
  'Washing Machine',
  'Microwave Oven',
  'Ceiling Fan',
  'Water Heater',
  'Solar Inverter',
];

const SolarCalculationPage = () => {
  const [dataSource, setDataSource] = useState([
    { key: '1', item: 'Demo Item', quantity: 1, watts: 100, hours: 1, wattHour: 100 },
  ]);
  const [count, setCount] = useState(2);

  const columns = [
    {
      title: 'Item',
      dataIndex: 'item',
      key: 'item',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Watts',
      dataIndex: 'watts',
      key: 'watts',
    },
    {
      title: 'Hours',
      dataIndex: 'hours',
      key: 'hours',
    },
    {
      title: 'Watt Hour',
      dataIndex: 'wattHour',
      key: 'wattHour',
    },
  ];

  const onFinish = (values) => {
    const newData = {
      key: count.toString(),
      item: values.item,
      quantity: values.quantity,
      watts: values.watts,
      hours: values.hours,
      wattHour: values.quantity * values.watts * values.hours,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const totalWatts = dataSource.reduce((acc, item) => acc + item.watts * item.quantity, 0);
  const totalWattHours = dataSource.reduce((acc, item) => acc + item.wattHour, 0);

  const handleSubmit = async (values) => {
    try {
      // Send the data to the backend
      const response = await axios.post('http://localhost:5000/api/solarCalculations', {
        data: { dataSource, ...values },
      });

      // Display a success notification
      notification.success({
        message: 'Submission Successful',
        description: 'The data has been submitted to the admin.',
      });

      // Log the response data
      console.log('Response:', response.data);
    } catch (error) {
      // Handle errors
      console.error('Error:', error);
      notification.error({
        message: 'Submission Failed',
        description: 'There was an error while submitting the data.',
      });
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ backgroundColor: '#001529', padding: '0 50px', textAlign: 'center' }}>
        <Title level={2} style={{ color: 'white', lineHeight: '64px' }}>Solar Calculation</Title>
      </Header>
      <Content style={{ padding: '50px' }}>
        <Title level={3}>Solar Power Consumption Calculator</Title>
        <Paragraph>
          Use this calculator to estimate your solar power needs. Add items, their quantities, and power ratings below.
        </Paragraph>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          summary={() => (
            <Table.Summary.Row>
              <Table.Summary.Cell colSpan={3}><b>Total</b></Table.Summary.Cell>
              <Table.Summary.Cell><b>{totalWatts} W</b></Table.Summary.Cell>
              <Table.Summary.Cell><b>{totalWattHours} Wh</b></Table.Summary.Cell>
            </Table.Summary.Row>
          )}
          scroll={{ x: 600, y: 240 }}
        />
        <Form layout="inline" onFinish={onFinish} style={{ marginTop: '20px', gap: '20px' }}>
          <Form.Item name="item" rules={[{ required: true, message: 'Please input the item!' }]}>
            <AutoComplete
              style={{ width: '200px' }}
              options={suggestedItems.map(item => ({ value: item }))}
              placeholder="Item"
              filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
              }
            />
          </Form.Item>
          <Form.Item name="quantity" rules={[{ required: true, message: 'Please input the quantity!' }]}>
            <Input type="number" placeholder="Quantity" />
          </Form.Item>
          <Form.Item name="watts" rules={[{ required: true, message: 'Please input the watts!' }]}>
            <Input type="number" placeholder="Watts" />
          </Form.Item>
          <Form.Item name="hours" rules={[{ required: true, message: 'Please input the hours!' }]}>
            <Input type="number" placeholder="Hours" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Add Item</Button>
          </Form.Item>
        </Form>
        <Form onFinish={handleSubmit} style={{ marginTop: '40px' }}>
          <Title level={4}>Submit Your Calculation</Title>
          <Form.Item name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
            <Input placeholder="Your Name" />
          </Form.Item>
          <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
            <Input placeholder="Your Email" />
          </Form.Item>
          <Form.Item name="message">
            <Input.TextArea rows={4} placeholder="Additional Message" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};

export default SolarCalculationPage;
