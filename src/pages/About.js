import React from 'react';
import { Layout, Row, Col, Typography, Card, Avatar } from 'antd';
import { animated } from '@react-spring/web';
import { useSpring } from '@react-spring/core';
import { TeamOutlined, SmileOutlined, GlobalOutlined } from '@ant-design/icons';
import director from '../images/director.jpg'
import '../styles/About.css';

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;

const AboutPage = () => {
  const overviewAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(-50px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { duration: 800 },
  });

  const missionVisionAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { duration: 800 },
    delay: 200,
  });

  const teamAnimation = useSpring({
    from: { opacity: 0, transform: 'scale(0.8)' },
    to: { opacity: 1, transform: 'scale(1)' },
    config: { duration: 800 },
    delay: 400,
  });

  const teamMembers = [
    {
      name: 'Nwachukwu Joseph Louis',
      position: 'DIRECTOR',
      avatar: director,
    },
    {
      name: 'Mr. Luck',
      position: 'ENGINEER',
      avatar: director,
    },
    {
      name: 'Anyanwu Judith',
      position: 'SALES MANAGER',
      avatar: director,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="about-header">
      <Title
          level={2}
          style={{ color: "white", lineHeight: "64px", textAlign: "center" }}
        >
          About Us
        </Title>
      </Header>
      <Content className="about-content">
        <animated.div style={overviewAnimation}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <Title level={2}>Who We Are</Title>
            <Paragraph>
              We are a leading provider of solar energy solutions, dedicated to delivering clean and sustainable energy to communities around the world.
            </Paragraph>
          </div>
        </animated.div>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <animated.div style={missionVisionAnimation}>
              <Card className="about-card">
                <GlobalOutlined className="about-icon" />
                <Title level={3}>Our Mission</Title>
                <Paragraph>
                  To innovate and provide top-quality solar energy solutions that empower communities and help preserve our planet for future generations.
                </Paragraph>
              </Card>
            </animated.div>
          </Col>
          <Col xs={24} md={12}>
            <animated.div style={missionVisionAnimation}>
              <Card className="about-card">
                <SmileOutlined className="about-icon" />
                <Title level={3}>Our Vision</Title>
                <Paragraph>
                  A world where every home and business is powered by clean, renewable energy, contributing to a healthier and more sustainable planet.
                </Paragraph>
              </Card>
            </animated.div>
          </Col>
        </Row>
        <animated.div style={teamAnimation}>
          <div style={{ textAlign: 'center', margin: '50px 0' }}>
            <Title level={2}>Meet Our Team</Title>
          </div>
          <Row gutter={[16, 16]}>
            {teamMembers.map((member, index) => (
              <Col xs={24} md={8} key={index}>
                <Card className="about-team-card">
                  <Avatar size={120} src={member.avatar} />
                  <Title level={4}>{member.name}</Title>
                  <Paragraph>{member.position}</Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </animated.div>
      </Content>
    </Layout>
  );
};

export default AboutPage;
