// src/components/PageEditor.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';

const { TextArea } = Input;

const PageEditor = () => {
  const { page } = useParams();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPageContent();
  }, [page]);

  const fetchPageContent = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/pages/${page}`);
      setContent(response.data.content);
    } catch (error) {
      message.error('Failed to load page content');
    } finally {
      setLoading(false);
    }
  };

  const savePageContent = async () => {
    try {
      await axios.post(`/api/pages/${page}`, { content });
      message.success('Page content saved successfully');
    } catch (error) {
      message.error('Failed to save page content');
    }
  };

  return (
    <div>
      <h1>Edit {page.charAt(0).toUpperCase() + page.slice(1)} Page</h1>
      <Form layout="vertical">
        <Form.Item label={`${page.charAt(0).toUpperCase() + page.slice(1)} Page Content`}>
          <TextArea
            rows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button type="primary" onClick={savePageContent} loading={loading}>
            Save Content
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PageEditor;
