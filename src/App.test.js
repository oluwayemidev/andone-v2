import React, { useState } from "react";
import { Form, Input, Button, Select, DatePicker, Card, Layout, Typography, message } from "antd";
import { UserOutlined, MailOutlined, PhoneOutlined, CalendarOutlined, MessageOutlined, EnvironmentOutlined } from '@ant-design/icons'; // Import Ant Design icons
import { submitQuotation } from "../utils/api";
import "../styles/QuotationForm.css";
import firebase from 'firebase/app';
import 'firebase/firestore'; // Import Firestore

const { Header, Content } = Layout;
const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const QuotationForm = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const db = firebase.firestore();
      await db.collection("quotations").add(values);
      message.success('Quotation submitted successfully!');
      form.resetFields();
    } catch (error) {
      message.error('Failed to submit quotation.');
    }
    setLoading(false);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Your form JSX */}
    </Layout>
  );
};

export default QuotationForm;
