// src/pages/WidgetsList.js
import React from 'react';
import { Card, Button, Row, Col, Typography } from 'antd';
import { Link } from 'react-router-dom';
import {
  EditOutlined,
  SlidersOutlined,
  StarOutlined,
  InfoCircleOutlined,
  SmileOutlined,
  CheckCircleOutlined,
  LikeOutlined,
  ProjectOutlined,
  QuestionCircleOutlined,
  VideoCameraOutlined,
  GiftOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

const widgets = [
  { name: 'Slider Carousel', route: '/admin/widgets/slider-carousel', icon: <SlidersOutlined />, color: '#FF7F50' },
  { name: 'Featured Products', route: '/admin/widgets/featured-products', icon: <StarOutlined />, color: '#FF4500' },
  { name: 'Giveaway Popup', route: '/admin/widgets/giveaway-popup', icon: <GiftOutlined />, color: '#FFB6C1' },
  { name: 'Company Info', route: '/admin/widgets/company-info', icon: <InfoCircleOutlined />, color: '#1E90FF' },
  // { name: 'Motto', route: '/admin/widgets/motto', icon: <SmileOutlined />, color: '#FFD700' },
  { name: 'Advantages', route: '/admin/widgets/advantages', icon: <CheckCircleOutlined />, color: '#8A2BE2' },
  { name: 'Testimonials', route: '/admin/widgets/testimonials', icon: <LikeOutlined />, color: '#FF69B4' },
  { name: 'Recent Projects', route: '/admin/widgets/recent-projects', icon: <ProjectOutlined />, color: '#FF6347' },
  { name: 'FAQs', route: '/admin/widgets/faqs', icon: <QuestionCircleOutlined />, color: '#4682B4' },
  { name: 'Video Gallery', route: '/admin/widgets/video-gallery', icon: <VideoCameraOutlined />, color: '#DC143C' },
  // Add more widgets as needed
];

const WidgetsList = () => {
  return (
    <div style={{ padding: '40px' }}>
      <Title level={2}>Widgets List</Title>
      <Row gutter={[16, 16]}>
        {widgets.map(widget => (
          <Col xs={24} sm={12} md={8} lg={6} key={widget.route}>
            <Card
              hoverable
              actions={[
                <Link to={widget.route} key="edit">
                  <Button type="default" icon={<EditOutlined />}>
                    Edit
                  </Button>
                </Link>,
              ]}
              style={{ borderLeft: `4px solid ${widget.color}` }}
            >
              <Card.Meta
                avatar={widget.icon}
                title={<Text strong>{widget.name}</Text>}
                description={<Text type="secondary">Click to edit the {widget.name}</Text>}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default WidgetsList;
