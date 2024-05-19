import React from 'react';
import { Layout, Row, Col, Card, Typography, Button } from 'antd';
import { Link } from "react-router-dom";
import { animated } from '@react-spring/web';
import { useSpring } from '@react-spring/core';
import { SettingOutlined, SolutionOutlined, CustomerServiceOutlined, CheckCircleOutlined } from '@ant-design/icons';
import '../styles/Service.css';

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;

const services = [
  {
    title: 'Consultation',
    description: 'Professional consultation services to help you with your solar energy needs.',
    icon: <SolutionOutlined />,
  },
  {
    title: 'Installation',
    description: 'Expert installation of solar panels and related equipment.',
    icon: <SettingOutlined />,
  },
  {
    title: 'Customer Support',
    description: '24/7 customer support to assist you with any issues or questions.',
    icon: <CustomerServiceOutlined />,
  },
  {
    title: 'Maintenance',
    description: 'Regular maintenance services to ensure your solar system is always running efficiently.',
    icon: <CheckCircleOutlined />,
  },
];

const ServicePage = () => {
  const animationProps = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { duration: 800 },
  });

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ backgroundColor: '#001529', padding: '0 50px' }}>
        <Title level={2} style={{ color: 'white', lineHeight: '64px', textAlign: 'center' }}>Our Services</Title>
      </Header>
      <Content style={{ padding: '50px' }}>
        <animated.div style={{ textAlign: 'center', marginBottom: '50px', ...animationProps }}>
          <Title level={2}>What We Offer</Title>
          <Paragraph>
            We provide a range of services to help you achieve energy efficiency and sustainability. Our expert team is here to support you every step of the way.
          </Paragraph>
        </animated.div>
        <Row gutter={[16, 16]}>
          {services.map((service, index) => (
            <Col xs={24} sm={12} md={8} lg={6} key={index}>
              <animated.div style={animationProps}>
                <Card
                  hoverable
                  style={{ textAlign: 'center', borderRadius: '10px' }}
                  cover={<div style={{ fontSize: '64px', color: '#1890ff', padding: '20px 0' }}>{service.icon}</div>}
                >
                  <Card.Meta
                    title={<Title level={4}>{service.title}</Title>}
                    description={<Paragraph>{service.description}</Paragraph>}
                  />
                </Card>
              </animated.div>
            </Col>
          ))}
        </Row>
        <animated.div style={{ textAlign: 'center', marginTop: '50px', ...animationProps }}>
          <Link to='/contact'><Button type="primary" size="large">Contact Us</Button></Link>
        </animated.div>
      </Content>
    </Layout>
  );
};

export default ServicePage;
