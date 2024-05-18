// src/pages/ProductsPage.js
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Card } from 'antd';
import axios from 'axios';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await axios.get('http://localhost:5000/api/products');
    setProducts(response.data);
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsModalVisible(true);
  };

  const handleEditProduct = (record) => {
    setEditingProduct(record);
    setIsModalVisible(true);
  };

  const handleDeleteProduct = async (id) => {
    await axios.delete(`http://localhost:5000/api/products/${id}`);
    fetchProducts();
  };

  const handleOk = async (values) => {
    if (editingProduct) {
      await axios.put(`http://localhost:5000/api/products/${editingProduct._id}`, values);
    } else {
      await axios.post('http://localhost:5000/api/products', values);
    }
    setIsModalVisible(false);
    fetchProducts();
  };

  return (
    <Card title="Products" bordered={false}>
      <Button type="primary" onClick={handleAddProduct}>Add Product</Button>
      <Table dataSource={products} rowKey="_id">
        <Table.Column title="Name" dataIndex="name" key="name" />
        <Table.Column title="Category" dataIndex="category" key="category" />
        <Table.Column title="Price" dataIndex="price" key="price" />
        <Table.Column title="Actions" key="actions" render={(text, record) => (
          <span>
            <Button onClick={() => handleEditProduct(record)}>Edit</Button>
            <Button danger onClick={() => handleDeleteProduct(record._id)}>Delete</Button>
          </span>
        )} />
      </Table>
      <Modal
        title={editingProduct ? "Edit Product" : "Add Product"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          initialValues={editingProduct}
          onFinish={handleOk}
        >
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Input />
          </Form.Item>
          <Form.Item label="Price" name="price">
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Image URL" name="image">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Save</Button>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default ProductsPage;
