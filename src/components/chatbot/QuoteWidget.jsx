// src/components/QuoteWidget.js
import React, { useState } from 'react';
import { Form, Input, Button, Select, DatePicker, } from 'antd';
import { UserOutlined, MailOutlined, EnvironmentOutlined, CalendarOutlined, MessageOutlined, PhoneOutlined } from '@ant-design/icons';
import { submitQuotation } from '../../utils/api'; // Import the API function
import './quoteWidget.css';

const { Option } = Select;
const { TextArea } = Input

const QuoteWidget = () => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const onFinish = async (values) => {
        form.resetFields()
        setLoading(true)
        await submitQuotation(values)
        setLoading(false)
    };

    // const onFinishFailed = (errorInfo) => {
    //     console.log('Failed:', errorInfo);
    // };

    return (
        <Form
            name="quote_form"
            layout="vertical"
            onFinish={onFinish}
            form={form}
            // onFinishFailed={onFinishFailed}
            className="quote-form"
        >
            <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: 'Please input your name!' }]}
            >
                <Input prefix={<UserOutlined />} placeholder="Name" />
            </Form.Item>

            <Form.Item
                name="email"
                label="Email address"
                rules={[
                    { type: 'email', message: 'The input is not valid E-mail!' },
                    { required: true, message: 'Please input your E-mail!' },
                ]}
            >
                <Input prefix={<MailOutlined />} placeholder="Email address" />
            </Form.Item>

            <Form.Item name="phone" label="Phone Number" rules={[{ required: true, message: "Please input your phone number!" }]}>
              <Input prefix={<PhoneOutlined />} placeholder="Enter your phone number" />
            </Form.Item>

            <Form.Item
                name="location"
                label="Location"
                rules={[{ required: true, message: 'Please input your location!' }]}
            >
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
                <Button type="primary" htmlType="submit" loading={loading} block>
                    Send
                </Button>
            </Form.Item>
        </Form>
    );
};

export default QuoteWidget;
