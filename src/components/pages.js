// src/components/Pages.js
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';

const { TextArea } = Input;

const Pages = () => {
  const [homeContent, setHomeContent] = useState('');
  const [aboutContent, setAboutContent] = useState('');
  const [servicesContent, setServicesContent] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPageContent();
  }, []);

  const fetchPageContent = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/pages');
      setHomeContent(response.data.home);
      setAboutContent(response.data.about);
      setServicesContent(response.data.services);
    } catch (error) {
      message.error('Failed to load page content');
    } finally {
      setLoading(false);
    }
  };

  const savePageContent = async (page, content) => {
    try {
      await axios.post('/api/pages', { page, content });
      message.success(`${page.charAt(0).toUpperCase() + page.slice(1)} content saved successfully`);
    } catch (error) {
      message.error(`Failed to save ${page} content`);
    }
  };

  const handleSave = (page) => {
    if (page === 'home') {
      savePageContent('home', homeContent);
    } else if (page === 'about') {
      savePageContent('about', aboutContent);
    } else if (page === 'services') {
      savePageContent('services', servicesContent);
    }
  };

  return (
    <div>
      <h1>Customize Pages</h1>
      <Form layout="vertical">
        <Form.Item label="Home Page Content">
          <TextArea
            rows={6}
            value={homeContent}
            onChange={(e) => setHomeContent(e.target.value)}
          />
          <Button type="primary" onClick={() => handleSave('home')} loading={loading}>
            Save Home Content
          </Button>
        </Form.Item>

        <Form.Item label="About Page Content">
          <TextArea
            rows={6}
            value={aboutContent}
            onChange={(e) => setAboutContent(e.target.value)}
          />
          <Button type="primary" onClick={() => handleSave('about')} loading={loading}>
            Save About Content
          </Button>
        </Form.Item>

        <Form.Item label="Services Page Content">
          <TextArea
            rows={6}
            value={servicesContent}
            onChange={(e) => setServicesContent(e.target.value)}
          />
          <Button type="primary" onClick={() => handleSave('services')} loading={loading}>
            Save Services Content
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Pages;
