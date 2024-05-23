import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Card, Upload, Select, message, Popconfirm, Row, Col } from 'antd';
import { UploadOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import moment from 'moment';

const { Option } = Select;

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      const sortedProducts = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setProducts(sortedProducts);
      setFilteredProducts(sortedProducts);
    } catch (error) {
      message.error('Failed to load products');
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/categories');
      setCategories(response.data);
    } catch (error) {
      message.error('Failed to load categories');
    }
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
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts();
      message.success('Product deleted successfully');
    } catch (error) {
      message.error('Failed to delete product');
    }
  };

  const handleOk = async (values) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('category', values.category);
    formData.append('price', values.price);
    formData.append('description', values.description);

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
      message.success('Product saved successfully');
    } catch (error) {
      message.error('Error uploading product');
    }
  };

  const uploadProps = {
    onRemove: () => setFileList([]),
    beforeUpload: (file) => {
      setFileList([file]);
      return false;
    },
    fileList,
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    const filteredData = products.filter(product =>
      product.name.toLowerCase().includes(value) ||
      product.category.toLowerCase().includes(value) ||
      product.description.toLowerCase().includes(value)
    );
    setFilteredProducts(filteredData);
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Category', dataIndex: 'category', key: 'category' },
    { title: 'Price', dataIndex: 'price', key: 'price' },
    { 
      title: 'Date Added', 
      dataIndex: 'createdAt', 
      key: 'createdAt',
      render: (text) => moment(text).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Button 
            type="link" 
            icon={<EditOutlined />} 
            onClick={() => handleEditProduct(record)}
          />
          <Popconfirm
            title="Are you sure you want to delete this product?"
            onConfirm={() => handleDeleteProduct(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button 
              type="link" 
              icon={<DeleteOutlined />} 
              danger
            />
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <Card title="Products" bordered={false}>
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={8}>
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search Products"
            value={searchTerm}
            onChange={handleSearch}
          />
        </Col>
        <Col span={16} style={{ textAlign: 'right' }}>
          <Button type="primary" onClick={handleAddProduct}>Add Product</Button>
        </Col>
      </Row>
      <Table 
        dataSource={filteredProducts} 
        rowKey="_id"
        columns={columns}
        expandable={{
          expandedRowRender: record => <p style={{ margin: 0 }}><b>Description: </b> {record.description}</p>,
          rowExpandable: record => record.description !== null,
        }}
      />
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
