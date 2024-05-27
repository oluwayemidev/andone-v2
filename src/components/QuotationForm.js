// src/components/QuotationForm.js
import React from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';

const QuotationForm = () => {
  const onFinish = async values => {
    await axios.post('https://andonesolar.onrender.com/api/quotations', values);
    alert('Quotation submitted');
  };

  return (
    <div>
      <Form onFinish={onFinish}>
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="requirements" label="Requirements" rules={[{ required: true }]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Get Quotation</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default QuotationForm;
