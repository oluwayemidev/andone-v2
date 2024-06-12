// src/pages/QuotationForm.js
import React, { useState } from "react";
import { Form, Input, Button, Select, DatePicker, Card, Layout, Typography } from "antd";
import { UserOutlined, MailOutlined, PhoneOutlined, CalendarOutlined, MessageOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { submitQuotation } from "../utils/api";
import "../styles/QuotationForm.css";

const { Header, Content } = Layout;
const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const QuotationForm = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    form.resetFields();
    setLoading(true);

    // Convert moment object to JavaScript Date object
    const formattedValues = {
      ...values,
      installation_date: values.installation_date.toDate(),
    };

    await submitQuotation(formattedValues);
    setLoading(false);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="header">
        <Title level={2} style={{ color: "white", lineHeight: "64px", textAlign: "center" }}>
          Quotation
        </Title>
      </Header>
      <Content style={{ padding: 24, margin: 0, minHeight: 280 }}>
        <Card title="Request a Quotation" className="quotation-form-card">
          <Form form={form} name="quotation_form" layout="vertical" onFinish={onFinish} className="quotation-form">
            <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please input your name!" }]}>
              <Input prefix={<UserOutlined />} placeholder="Enter your name" />
            </Form.Item>
            <Form.Item name="email" label="Email address" rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" }
            ]}>
              <Input prefix={<MailOutlined />} type="email" placeholder="Enter your email" />
            </Form.Item>
            <Form.Item name="phone" label="Phone Number" rules={[{ required: true, message: "Please input your phone number!" }]}>
              <Input prefix={<PhoneOutlined />} placeholder="Enter your phone number" />
            </Form.Item>
            <Form.Item name="location" label="Location" rules={[{ required: true, message: 'Please input your location!' }]}>
              <Input prefix={<EnvironmentOutlined />} placeholder="Location" />
            </Form.Item>
            <Form.Item name="product" label="Product" rules={[{ required: true, message: "Please select a product!" }]}>
              <Select placeholder="Select a product">
                <Option value="solar_panel">Solar Panel</Option>
                <Option value="battery">Battery</Option>
                <Option value="inverter">Inverter</Option>
                <Option value="accessory">Accessory</Option>
              </Select>
            </Form.Item>
            <Form.Item name="installation_date" label="Preferred Installation Date" rules={[{ required: true, message: "Please select a date!" }]}>
              <DatePicker style={{ width: '100%' }} prefix={<CalendarOutlined />} />
            </Form.Item>
            <Form.Item name="message" label="Additional Message">
              <TextArea rows={4} placeholder="Enter your message" prefix={<MessageOutlined />} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>Submit</Button>
            </Form.Item>
          </Form>
        </Card>
      </Content>
    </Layout>
  );
};

export default QuotationForm;
