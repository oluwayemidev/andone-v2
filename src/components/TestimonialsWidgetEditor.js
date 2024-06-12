// src/components/TestimonialsWidgetEditor.js
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, List, message, Modal } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { db, collection, addDoc, updateDoc, deleteDoc, getDocs, doc } from '../pages/firebase';

const TestimonialsWidgetEditor = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const testimonialsCollection = collection(db, 'testimonials');
        const testimonialsSnapshot = await getDocs(testimonialsCollection);
        const testimonialsData = testimonialsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setTestimonials(testimonialsData);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      }
    };

    fetchTestimonials();
  }, []);

  const handleAdd = async (values) => {
    setLoading(true);
    try {
      const docRef = await addDoc(collection(db, 'testimonials'), values);
      setTestimonials([...testimonials, { id: docRef.id, ...values }]);
      form.resetFields();
      message.success('Testimonial added successfully');
    } catch (error) {
      console.error('Error adding testimonial:', error);
      message.error('Error adding testimonial');
    }
    setLoading(false);
    setModalVisible(false);
  };

  const handleEdit = async (values) => {
    setLoading(true);
    try {
      const docRef = doc(db, 'testimonials', editingIndex);
      await updateDoc(docRef, values);
      const updatedTestimonials = testimonials.map((testimonial) =>
        testimonial.id === editingIndex ? { id: editingIndex, ...values } : testimonial
      );
      setTestimonials(updatedTestimonials);
      setEditingIndex(null);
      form.resetFields();
      message.success('Testimonial updated successfully');
    } catch (error) {
      console.error('Error updating testimonial:', error);
      message.error('Error updating testimonial');
    }
    setLoading(false);
    setModalVisible(false);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'testimonials', id));
      const updatedTestimonials = testimonials.filter((testimonial) => testimonial.id !== id);
      setTestimonials(updatedTestimonials);
      message.success('Testimonial deleted successfully');
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      message.error('Error deleting testimonial');
    }
  };

  const handleEditClick = (testimonial) => {
    setEditingIndex(testimonial.id);
    form.setFieldsValue(testimonial);
    setModalVisible(true);
  };

  const handleCancel = () => {
    setEditingIndex(null);
    form.resetFields();
    setModalVisible(false);
  };

  return (
    <Card title="Edit Testimonials" bordered={false} style={{ width: '100%' }}>
      <Button type="primary" onClick={() => setModalVisible(true)}>
        <PlusOutlined /> Add Testimonial
      </Button>
      <List
        itemLayout="horizontal"
        dataSource={testimonials}
        renderItem={(item) => (
          <List.Item
            actions={[
              <EditOutlined onClick={() => handleEditClick(item)} />,
              <DeleteOutlined onClick={() => handleDelete(item.id)} />,
            ]}
          >
            <List.Item.Meta title={item.name} description={item.text} />
          </List.Item>
        )}
      />
      <Modal
        visible={modalVisible}
        title={editingIndex === null ? 'Add Testimonial' : 'Edit Testimonial'}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={editingIndex === null ? handleAdd : handleEdit}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input the name!' }]}
          >
            <Input placeholder="Enter name" />
          </Form.Item>
          <Form.Item
            name="text"
            label="Testimonial"
            rules={[{ required: true, message: 'Please input the testimonial text!' }]}
          >
            <Input.TextArea placeholder="Enter testimonial text" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              {editingIndex === null ? 'Add Testimonial' : 'Update Testimonial'}
            </Button>
            {editingIndex !== null && (
              <Button style={{ marginLeft: '10px' }} onClick={handleCancel}>
                Cancel
              </Button>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default TestimonialsWidgetEditor;
