// src/components/WidgetsManager.js
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Table, Popconfirm, message, Divider, Modal } from 'antd';
import axios from 'axios';

const { Option } = Select;

const WidgetsManager = () => {
  const [form] = Form.useForm();
  const [widgets, setWidgets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingWidget, setEditingWidget] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchWidgets();
  }, []);

  const fetchWidgets = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/widgets');
      setWidgets(response.data);
    } catch (error) {
      message.error('Failed to load widgets');
    } finally {
      setLoading(false);
    }
  };

  const saveWidget = async (values) => {
    try {
      if (editingWidget) {
        await axios.put(`/api/widgets/${editingWidget.id}`, values);
        message.success('Widget updated successfully');
      } else {
        await axios.post('/api/widgets', values);
        message.success('Widget added successfully');
      }
      fetchWidgets();
      setModalVisible(false);
    } catch (error) {
      message.error('Failed to save widget');
    }
  };

  const deleteWidget = async (id) => {
    try {
      await axios.delete(`/api/widgets/${id}`);
      message.success('Widget deleted successfully');
      fetchWidgets();
    } catch (error) {
      message.error('Failed to delete widget');
    }
  };

  const openEditModal = (widget) => {
    setEditingWidget(widget);
    form.setFieldsValue(widget);
    setModalVisible(true);
  };

  const openAddModal = () => {
    setEditingWidget(null);
    form.resetFields();
    setModalVisible(true);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => openEditModal(record)}>Edit</Button>
          <Popconfirm title="Are you sure to delete this widget?" onConfirm={() => deleteWidget(record.id)}>
            <Button type="link" danger>Delete</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div>
      <h1>Manage Widgets</h1>
      <Button type="primary" onClick={openAddModal} style={{ marginBottom: 16 }}>
        Add Widget
      </Button>
      <Table
        columns={columns}
        dataSource={widgets}
        rowKey="id"
        loading={loading}
      />
      <Modal
        title={editingWidget ? "Edit Widget" : "Add Widget"}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={saveWidget}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please enter a widget name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: true, message: 'Please select a widget type' }]}
          >
            <Select>
              <Option value="text">Text</Option>
              <Option value="image">Image</Option>
              <Option value="video">Video</Option>
              {/* Add more widget types as needed */}
            </Select>
          </Form.Item>
          <Divider />
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Save Widget
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default WidgetsManager;
