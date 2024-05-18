import React, { useEffect, useState } from 'react';
import { Table, Button, Card, Modal, Form, Input, Select, message } from 'antd';
import axios from 'axios';

const { Option } = Select;

const QuotationsPage = () => {
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedQuotation, setSelectedQuotation] = useState(null);

  useEffect(() => {
    fetchQuotations();
  }, []);

  const fetchQuotations = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/quotations');
      setQuotations(response.data);
      setLoading(false);
    } catch (error) {
      message.error('Failed to load quotations');
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (values) => {
    try {
      await axios.put('/api/quotations/status', {
        id: selectedQuotation._id,
        status: values.status,
      });
      message.success('Status updated successfully');
      setVisible(false);
      fetchQuotations();
    } catch (error) {
      message.error('Failed to update status');
    }
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Phone', dataIndex: 'phone', key: 'phone' },
    { title: 'Details', dataIndex: 'details', key: 'details' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Button onClick={() => { setSelectedQuotation(record); setVisible(true); }}>Update Status</Button>
      ),
    },
  ];

  return (
    <Card title="Quotations" bordered={false}>
      <Table dataSource={quotations} columns={columns} rowKey="_id" loading={loading} />
      <Modal
        title="Update Status"
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <Form onFinish={handleUpdateStatus}>
          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Select>
              <Option value="Pending">Pending</Option>
              <Option value="Approved">Approved</Option>
              <Option value="Rejected">Rejected</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Update</Button>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default QuotationsPage;
