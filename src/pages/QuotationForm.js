// src/pages/QuotationForm.js
import React from "react";
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Card,
  notification,
  Layout,
  Typography,
} from "antd";
import axios from "axios";
import "../styles/QuotationForm.css";

const { Header, Content } = Layout;
const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const QuotationForm = () => {
  const onFinish = async (values) => {
    try {
      // const response = await axios.post(
      //   "http://localhost:5000/api/quotations",
      //   values
      // );
      notification.success({
        message: "Success",
        description: "Quotation request submitted successfully!",
      });
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to submit quotation request. Please try again.",
      });
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="header">
        <Title
          level={2}
          style={{ color: "white", lineHeight: "64px", textAlign: "center" }}
        >
          Quotation
        </Title>
      </Header>
      <Content
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
        }}
      >
        <Card title="Request a Quotation" className="quotation-form-card">
          <Form
            name="quotation_form"
            layout="vertical"
            onFinish={onFinish}
            className="quotation-form"
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[
                { required: true, message: "Please input your phone number!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="product"
              label="Product"
              rules={[{ required: true, message: "Please select a product!" }]}
            >
              <Select placeholder="Select a product">
                <Option value="solar_panel">Solar Panel</Option>
                <Option value="battery">Battery</Option>
                <Option value="inverter">Inverter</Option>
                <Option value="accessory">Accessory</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="installation_date"
              label="Preferred Installation Date"
              rules={[{ required: true, message: "Please select a date!" }]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item name="message" label="Additional Message">
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Content>
    </Layout>
  );
};

export default QuotationForm;
