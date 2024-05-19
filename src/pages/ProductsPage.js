import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Card, Upload, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Option } = Select;

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    const response = await axios.get('http://localhost:5000/api/products');
    setProducts(response.data);
  };

  const fetchCategories = async () => {
    const response = await axios.get('http://localhost:5000/api/categories');
    setCategories(response.data);
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsModalVisible(true);
    form.resetFields();
    setFileList([]);
  };

  const handleEditProduct = (record) => {
    setEditingProduct(record);
    setIsModalVisible(true);
    form.setFieldsValue(record);
    setFileList(record.image ? [{ url: `http://localhost:5000/uploads/${record.image}`, name: record.image }] : []);
  };

  const handleDeleteProduct = async (id) => {
    await axios.delete(`http://localhost:5000/api/products/${id}`);
    fetchProducts();
  };

  const handleOk = async (values) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('category', values.category);
    formData.append('price', values.price);
    formData.append('description', values.description);
    formData.append('img', values.image);
    console.log(values.image)

    if (fileList.length > 0) {
      formData.append('image', values.image.fileList[0].originFileObj);
    }

    try {
      if (editingProduct) {
        await axios.put(`http://localhost:5000/api/products/${editingProduct._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await axios.post('http://localhost:5000/api/products', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      setIsModalVisible(false);
      fetchProducts();
    } catch (error) {
      console.error('Error uploading product:', error);
    }
  };

  const uploadProps = {
    onRemove: (file) => {
      setFileList([]);
    },
    beforeUpload: (file) => {
      setFileList([file]);
      return false;
    },
    fileList,
  };

  return (
    <Card title="Products" bordered={false}>
      <Button type="primary" onClick={handleAddProduct}>Add Product</Button>
      <Table dataSource={products} rowKey="_id">
        <Table.Column title="Name" dataIndex="name" key="name" />
        <Table.Column title="Category" dataIndex="category" key="category" />
        <Table.Column title="Price" dataIndex="price" key="price" />
        <Table.Column title="Description" dataIndex="description" key="description" />
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
          form={form}
          initialValues={editingProduct}
          onFinish={handleOk}
        >
          <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input the product name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Category" name="category" rules={[{ required: true, message: 'Please select a category!' }]}>
            <Select>
              {categories.map(category => (
                <Option key={category._id} value={category.name}>{category.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Please input the product price!' }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please input the product description!' }]}>
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item label="Image" name="image">
            <Upload {...uploadProps} name='image' listType="picture">
              <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
            </Upload>
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
