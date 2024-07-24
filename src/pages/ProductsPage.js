import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Card, Upload, Select, message, Popconfirm, Row, Col } from 'antd';
import { UploadOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import moment from 'moment';
import { db, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, storage, ref, uploadBytes, getDownloadURL } from './firebase';

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
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const productsList = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      const sortedProducts = productsList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setProducts(sortedProducts);
      setFilteredProducts(sortedProducts);
    } catch (error) {
      message.error('Failed to load products');
    }
    setLoading(false);
  };

  const fetchCategories = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'categories'));
      const categoriesList = querySnapshot.docs.map(doc => doc.data());
      setCategories(categoriesList);
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
    setFileList(record.imageUrls ? record.imageUrls.map((url, index) => ({
      uid: index,
      name: record.imageNames[index],
      status: 'done',
      url,
    })) : []);
  };

  const handleDeleteProduct = async (id) => {
    setLoading(true);
    try {
      await deleteDoc(doc(db, 'products', id));
      fetchProducts();
      message.success('Product deleted successfully');
    } catch (error) {
      message.error('Failed to delete product');
    }
    setLoading(false);
  };

  const handleOk = async (values) => {
    let imageUrls = [];
    let imageNames = [];
    setLoading2(true);

    try {
      if (fileList.length > 0) {
        const uploadPromises = fileList.map(file => {
          if (file.originFileObj) {  // Only upload new files
            const imageRef = ref(storage, `images/${file.name}`);
            console.log("Uploading file:", file.name);
            return uploadBytes(imageRef, file.originFileObj).then(async () => {
              const imageUrl = await getDownloadURL(imageRef);
              imageUrls.push(imageUrl);
              imageNames.push(file.name);
              console.log("File uploaded, URL:", imageUrl);
            });
          } else {
            // Keep the already uploaded files
            imageUrls.push(file.url);
            imageNames.push(file.name);
          }
        });

        await Promise.all(uploadPromises);
      } else if (editingProduct) {
        imageUrls = editingProduct.imageUrls || [];
        imageNames = editingProduct.imageNames || [];
      }

      const productData = {
        ...values,
        imageUrls,
        imageNames,
        createdAt: editingProduct ? editingProduct.createdAt : new Date().toISOString()
      };

      if (editingProduct) {
        await updateDoc(doc(db, 'products', editingProduct.id), productData);
      } else {
        await addDoc(collection(db, 'products'), productData);
      }

      message.success('Product saved successfully');
      setIsModalVisible(false);
      form.resetFields(); // Reset form fields
      setFileList([]);    // Clear file list
      fetchProducts();
    } catch (error) {
      message.error('Error uploading product');
      console.error("Error details:", error);
    }
    setLoading2(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields(); // Reset form fields
    setFileList([]);    // Clear file list
  };

  const uploadProps = {
    multiple: true, // Allow multiple file uploads
    onRemove: (file) => {
      const newFileList = fileList.filter(f => f.uid !== file.uid);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    onChange: ({ fileList: newFileList }) => setFileList(newFileList),
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
            onConfirm={() => handleDeleteProduct(record.id)}
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
        rowKey="id"
        columns={columns}
        loading={loading}
        expandable={{
          expandedRowRender: record => (
            <>
              <p style={{ margin: 0 }}><b>Description: </b> {record.description}</p>
              <p style={{ margin: 0 }}><b>Images: </b></p>
              {record.imageUrls && record.imageUrls.map((url, index) => (
                <img key={index} src={url} alt={record.imageNames[index]} style={{ width: 100, marginRight: 8 }} />
              ))}
            </>
          ),
          rowExpandable: record => record.description !== null,
        }}
      />
      <Modal
        title={editingProduct ? "Edit Product" : "Add Product"}
        visible={isModalVisible}
        onCancel={handleCancel} // Use handleCancel here
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
                <Option key={category.name} value={category.name}>{category.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Please input the product price!' }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please input the product description!' }]}>
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item label="Images">
            <Upload {...uploadProps} listType="picture">
              <Button icon={<UploadOutlined />}>Upload (Max: 10)</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button loading={loading2} type="primary" htmlType="submit">Save</Button>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default ProductsPage;
