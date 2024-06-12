// src/components/AppearanceCustomizer.js
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Radio, message, Divider, Typography, Spin, Row, Col, Select, Slider, Upload } from 'antd';
import { BgColorsOutlined, FontSizeOutlined, FormatPainterOutlined, EditOutlined, PictureOutlined, UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import '../styles/AppearanceCustomizer.css';

const { Title } = Typography;
const { Option } = Select;

const AppearanceCustomizer = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    fetchAppearanceSettings();
  }, []);

  const fetchAppearanceSettings = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/appearance-settings');
      form.setFieldsValue(response.data);
      setBackgroundImage(response.data.backgroundImage);
    } catch (error) {
      message.error('Failed to load appearance settings');
    } finally {
      setLoading(false);
    }
  };

  const saveAppearanceSettings = async (values) => {
    try {
      await axios.post('/api/appearance-settings', values);
      message.success('Appearance settings saved successfully');
    } catch (error) {
      message.error('Failed to save appearance settings');
    }
  };

  const uploadProps = {
    beforeUpload: file => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        form.setFieldsValue({ backgroundImage: reader.result });
        setBackgroundImage(reader.result);
      };
      return false;
    },
  };

  return (
    <div className="appearance-customizer-container">
      <Title level={2}>Customize Appearance</Title>
      {loading ? (
        <Spin tip="Loading settings...">
          <div className="spin-container"></div>
        </Spin>
      ) : (
        <Form
          form={form}
          layout="vertical"
          onFinish={saveAppearanceSettings}
          className="appearance-form"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label={<span><BgColorsOutlined /> Primary Color</span>}
                name="primaryColor"
                rules={[{ required: true, message: 'Please select a primary color' }]}
              >
                <Input type="color" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={<span><BgColorsOutlined /> Secondary Color</span>}
                name="secondaryColor"
                rules={[{ required: true, message: 'Please select a secondary color' }]}
              >
                <Input type="color" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label={<span><FormatPainterOutlined /> Background Color</span>}
                name="backgroundColor"
                rules={[{ required: true, message: 'Please select a background color' }]}
              >
                <Input type="color" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={<span><PictureOutlined /> Background Image</span>}
                name="backgroundImage"
              >
                <Upload {...uploadProps} showUploadList={false}>
                  <Button icon={<UploadOutlined />}>Upload Background Image</Button>
                </Upload>
                {backgroundImage && (
                  <div className="background-image-preview">
                    <img src={backgroundImage} alt="Background Preview" />
                  </div>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label={<span><FontSizeOutlined /> Font Size</span>}
                name="fontSize"
                rules={[{ required: true, message: 'Please enter a font size' }]}
              >
                <Slider min={12} max={48} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={<span><EditOutlined /> Font Family</span>}
                name="fontFamily"
                rules={[{ required: true, message: 'Please select a font family' }]}
              >
                <Select>
                  <Option value="Arial">Arial</Option>
                  <Option value="Helvetica">Helvetica</Option>
                  <Option value="Times New Roman">Times New Roman</Option>
                  <Option value="Courier New">Courier New</Option>
                  <Option value="Verdana">Verdana</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Theme"
                name="theme"
                rules={[{ required: true, message: 'Please select a theme' }]}
              >
                <Radio.Group>
                  <Radio.Button value="light">Light</Radio.Button>
                  <Radio.Button value="dark">Dark</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Divider />
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Save Settings
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default AppearanceCustomizer;
