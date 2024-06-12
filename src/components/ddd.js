import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Upload, Popconfirm, message } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { getCarouselItems, addCarouselItem, updateCarouselItem, deleteCarouselItem, handleFileUpload } from '../pages/firebase';

const CarouselEditor = () => {
  const [form] = Form.useForm();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    fetchCarouselItems();
  }, []);

  const fetchCarouselItems = async () => {
    setLoading(true);
    try {
      const data = await getCarouselItems();
      setItems(data);
    } catch (error) {
      console.error("Failed to fetch carousel items:", error);
      message.error("Failed to fetch carousel items.");
    }
    setLoading(false);
  };

  const handleAdd = () => {
    form.resetFields();
    setEditingItem(null);
    setFileList([]);
    setModalVisible(true);
  };

  const handleEdit = (item) => {
    form.setFieldsValue(item);
    setEditingItem(item);
    setFileList([]);
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await deleteCarouselItem(id);
      await fetchCarouselItems();
      message.success("Item deleted successfully.");
    } catch (error) {
      console.error("Failed to delete item:", error);
      message.error("Failed to delete item. Please try again.");
    }
    setLoading(false);
  };

  const handleFinish = async (values) => {
    setLoading(true);
    let imgSrc = values.imgSrc;

    if (fileList.length > 0) {
      const file = fileList[0].originFileObj;
      imgSrc = await handleFileUpload(file);
    }

    const newItem = { ...values, imgSrc };

    try {
      if (editingItem) {
        await updateCarouselItem({ ...editingItem, ...newItem });
        message.success("Item updated successfully.");
      } else {
        await addCarouselItem(newItem);
        message.success("Item added successfully.");
      }
      await fetchCarouselItems();
      setModalVisible(false);
    } catch (error) {
      console.error("Failed to save item:", error);
      message.error("Failed to save item. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Image URL',
      dataIndex: 'imgSrc',
      key: 'imgSrc',
      render: (text) => <img src={text} alt="carousel item" style={{ width: '100px' }} />,
    },
    {
      title: 'Alt Text',
      dataIndex: 'altText',
      key: 'altText',
    },
    {
      title: 'Caption',
      dataIndex: 'caption',
      key: 'caption',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>Edit</Button>
          <Popconfirm title="Are you sure?" onConfirm={() => handleDelete(record.id)}>
            <Button type="link" danger>Delete</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  const uploadProps = {
    onRemove: () => {
      setFileList([]);
    },
    beforeUpload: (file) => {
      setFileList([file]);
      return false;
    },
    fileList,
  };

  return (
    <div>
      <Button type="primary" onClick={handleAdd} icon={<PlusOutlined />}>
        Add Item
      </Button>
      <Table columns={columns} dataSource={items} rowKey="id" loading={loading} style={{ marginTop: 16 }} />
      <Modal
        title={editingItem ? 'Edit Carousel Item' : 'Add Carousel Item'}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleFinish} layout="vertical">
          <Form.Item
            name="imgSrc"
            label="Image URL"
            hidden
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Upload Image"
          >
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="altText"
            label="Alt Text"
            rules={[{ required: true, message: 'Please input the alt text!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="caption"
            label="Caption"
            rules={[{ required: true, message: 'Please input the caption!' }]}
          >
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Save
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default CarouselEditor;
