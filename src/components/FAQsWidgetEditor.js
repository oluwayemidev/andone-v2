// src/components/FAQsWidgetEditor.js
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Modal, List, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { db, collection, addDoc, updateDoc, deleteDoc, getDocs, doc } from '../pages/firebase';
import FAQsWidget from './FAQsWidget';

const FAQsWidgetEditor = () => {
  const [faqs, setFaqs] = useState([]);
  const [editingFAQ, setEditingFAQ] = useState(null);
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFAQs = async () => {
      const querySnapshot = await getDocs(collection(db, 'faqs'));
      const fetchedFAQs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFaqs(fetchedFAQs);
    };

    fetchFAQs();
  }, []);

  const handleAdd = async (values) => {
    setLoading(true);
    try {
      const docRef = await addDoc(collection(db, 'faqs'), values);
      setFaqs([...faqs, { id: docRef.id, ...values }]);
      form.resetFields();
      message.success('FAQ added successfully');
    } catch (error) {
      console.error('Error adding FAQ: ', error);
      message.error('Error adding FAQ');
    }
    setLoading(false);
    setVisible(false);
  };

  const handleEdit = async (values) => {
    setLoading(true);
    try {
      const docRef = doc(db, 'faqs', editingFAQ.id);
      await updateDoc(docRef, values);
      const updatedFAQs = faqs.map(faq => faq.id === editingFAQ.id ? { id: editingFAQ.id, ...values } : faq);
      setFaqs(updatedFAQs);
      setEditingFAQ(null);
      form.resetFields();
      message.success('FAQ updated successfully');
    } catch (error) {
      console.error('Error updating FAQ: ', error);
      message.error('Error updating FAQ');
    }
    setLoading(false);
    setVisible(false);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'faqs', id));
      const updatedFAQs = faqs.filter(faq => faq.id !== id);
      setFaqs(updatedFAQs);
      message.success('FAQ deleted successfully');
    } catch (error) {
      console.error('Error deleting FAQ: ', error);
      message.error('Error deleting FAQ');
    }
  };

  const handleEditClick = (faq) => {
    setEditingFAQ(faq);
    form.setFieldsValue(faq);
    setVisible(true);
  };

  const handleCancel = () => {
    setEditingFAQ(null);
    form.resetFields();
    setVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)} style={{ marginBottom: '16px' }}>
        Add FAQ
      </Button>
      <List
        itemLayout="horizontal"
        dataSource={faqs}
        renderItem={item => (
          <List.Item
            actions={[
              <EditOutlined onClick={() => handleEditClick(item)} />,
              <DeleteOutlined onClick={() => handleDelete(item.id)} />,
            ]}
          >
            <List.Item.Meta
              title={item.question}
              description={item.answer}
            />
          </List.Item>
        )}
      />
      <Modal
        title={editingFAQ ? 'Edit FAQ' : 'Add FAQ'}
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={editingFAQ ? handleEdit : handleAdd}>
          <Form.Item
            name="question"
            label="Question"
            rules={[{ required: true, message: 'Please input the question!' }]}
          >
            <Input placeholder="Enter question" />
          </Form.Item>
          <Form.Item
            name="answer"
            label="Answer"
            rules={[{ required: true, message: 'Please input the answer!' }]}
          >
            <Input.TextArea placeholder="Enter answer" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              {editingFAQ ? 'Update FAQ' : 'Add FAQ'}
            </Button>
            {editingFAQ && (
              <Button style={{ marginLeft: '10px' }} onClick={handleCancel}>
                Cancel
              </Button>
            )}
          </Form.Item>
        </Form>
      </Modal>
      <FAQsWidget />
    </>
  );
};

export default FAQsWidgetEditor;
