import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Input, Table, Popconfirm, message, Row, Col, Modal } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { db, collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from './firebase';

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  const handleEditCategory = async (values) => {
    setLoading(true);
    try {
      const categoryDoc = doc(db, 'categories', editingCategory.id);
      await updateDoc(categoryDoc, values);
      fetchCategories();
      setEditingCategory(null);
      setIsModalVisible(false);
      message.success('Category updated successfully');
    } catch (error) {
      message.error('Error updating category');
      console.error('Error updating category:', error);
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

  const showEditModal = (category) => {
    setEditingCategory(category);
    editForm.setFieldsValue({ name: category.name });
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setEditingCategory(null);
    setIsModalVisible(false);
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
      width: 150,
      render: (_, record) => (
        <>
          <Button 
            type="default" 
            size="small" 
            icon={<EditOutlined />} 
            onClick={() => showEditModal(record)} 
            style={{ marginRight: 8 }}
          />
          <Popconfirm
            title="Are you sure to delete this category?"
            onConfirm={() => handleDeleteCategory(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="default" danger size="small" icon={<DeleteOutlined />} />
          </Popconfirm>
        </>
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
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Table loading={loading} dataSource={filteredCategories} columns={columns} rowKey="id" />
      </div>
      <Modal title="Edit Category" visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <Form form={editForm} onFinish={handleEditCategory}>
          <Form.Item label="Category Name" name="name" rules={[{ required: true, message: 'Please input the category name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Save</Button>
            <Button onClick={handleCancel} style={{ marginLeft: 8 }}>Cancel</Button>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default CategoryPage;
