import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Input, Table, Popconfirm, message, Row, Col } from 'antd';
import axios from 'axios';

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [form] = Form.useForm();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/categories');
      setCategories(response.data);
      setFilteredCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleAddCategory = async (values) => {
    try {
      await axios.post('http://localhost:5000/api/categories', values);
      fetchCategories();
      form.resetFields();
      message.success('Category added successfully');
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/categories/${id}`);
      fetchCategories();
      message.success('Category deleted successfully');
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    const filteredData = categories.filter(category =>
      category.name.toLowerCase().includes(value)
    );
    setFilteredCategories(filteredData);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, record) => (
        <Popconfirm
          title="Are you sure to delete this category?"
          onConfirm={() => handleDeleteCategory(record._id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="danger" size="small">Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <Card title="Categories" bordered={false}>
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={8}>
          <Input
            placeholder="Search Categories"
            value={searchTerm}
            onChange={handleSearch}
          />
        </Col>
        <Col span={16} style={{ textAlign: 'right' }}>
          <Form form={form} onFinish={handleAddCategory} layout="inline">
            <Form.Item label="New Category" name="name">
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">Add Category</Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <Table dataSource={filteredCategories} columns={columns} rowKey="_id" />
    </Card>
  );
};

export default CategoryPage;
