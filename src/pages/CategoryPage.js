import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Input, Table, Popconfirm, message, Row, Col } from 'antd';
import {
  DeleteOutlined,
} from "@ant-design/icons";
import { db, collection, addDoc, getDocs, doc, deleteDoc } from './firebase';

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [form] = Form.useForm();
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'categories'));
      const categoriesList = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setCategories(categoriesList);
      setFilteredCategories(categoriesList);
    } catch (error) {
      message.error('Error fetching categories');
      console.error('Error fetching categories:', error);
    }
    setLoading(false);
  };

  const handleAddCategory = async (values) => {
    setLoading(true);
    try {
      await addDoc(collection(db, 'categories'), values);
      fetchCategories();
      form.resetFields();
      message.success('Category added successfully');
    } catch (error) {
      message.error('Error adding category');
      console.error('Error adding category:', error);
    }
    setLoading(false);
  };

  const handleDeleteCategory = async (id) => {
    setLoading(true);
    try {
      await deleteDoc(doc(db, 'categories', id));
      fetchCategories();
      message.success('Category deleted successfully');
    } catch (error) {
      message.error('Error deleting category');
      console.error('Error deleting category:', error);
    }
    setLoading(false);
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
      width: 100,
      render: (_, record) => (
        <Popconfirm
          title="Are you sure to delete this category?"
          onConfirm={() => handleDeleteCategory(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="default" danger size="small" icon={<DeleteOutlined />} />
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
            <Form.Item label="New Category" name="name" rules={[{ required: true, message: 'Please input the category name!' }]}>
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">Add Category</Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <Table loading={loading} dataSource={filteredCategories} columns={columns} rowKey="id" />
    </Card>
  );
};

export default CategoryPage;
