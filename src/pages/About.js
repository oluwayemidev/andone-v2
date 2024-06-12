import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Typography, Card, Avatar, Skeleton, Alert } from 'antd';
import { animated } from '@react-spring/web';
import { useSpring } from '@react-spring/core';
import { TeamOutlined, SmileOutlined, GlobalOutlined } from '@ant-design/icons';
import { db, doc, getDoc } from '../pages/firebase';
import '../styles/About.css';

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;

const AboutPage = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const docRef = doc(db, 'pages', 'about');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setAboutData(docSnap.data());
        } else {
          setError('No such document!');
        }
      } catch (error) {
        setError('Error getting document: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (loading) {
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
          <Skeleton active paragraph={{ rows: 3 }} />
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Card className="about-card">
                <Skeleton.Avatar size={64} shape="circle" style={{ marginBottom: 20 }} />
                <Skeleton active title={false} paragraph={{ rows: 3 }} />
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card className="about-card">
                <Skeleton.Avatar size={64} shape="circle" style={{ marginBottom: 20 }} />
                <Skeleton active title={false} paragraph={{ rows: 3 }} />
              </Card>
            </Col>
          </Row>
          <div style={{ textAlign: 'center', margin: '50px 0' }}>
            <Title level={2}>Meet Our Team</Title>
          </div>
          <Row gutter={[16, 16]}>
            {Array.from({ length: 3 }).map((_, index) => (
              <Col xs={24} md={8} key={index}>
                <Card className="about-team-card">
                  <Skeleton.Avatar size={120} shape="circle" />
                  <Skeleton active title={false} paragraph={{ rows: 3 }} />
                </Card>
              </Col>
            ))}
          </Row>
        </Content>
      </Layout>
    );
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" />;
  }

  if (!aboutData) {
    return null;
  }

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
            <Paragraph>{aboutData.whoWeAre}</Paragraph>
          </div>
        </animated.div>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <animated.div style={missionVisionAnimation}>
              <Card className="about-card">
                <GlobalOutlined className="about-icon" />
                <Title level={3}>Our Mission</Title>
                <Paragraph>{aboutData.mission}</Paragraph>
              </Card>
            </animated.div>
          </Col>
          <Col xs={24} md={12}>
            <animated.div style={missionVisionAnimation}>
              <Card className="about-card">
                <SmileOutlined className="about-icon" />
                <Title level={3}>Our Vision</Title>
                <Paragraph>{aboutData.vision}</Paragraph>
              </Card>
            </animated.div>
          </Col>
        </Row>
        <animated.div style={teamAnimation}>
          <div style={{ textAlign: 'center', margin: '50px 0' }}>
            <Title level={2}>Meet Our Team</Title>
          </div>
          <Row gutter={[16, 16]}>
            {aboutData.team && aboutData.team.map((member, index) => (
              <Col xs={24} md={8} key={index}>
                <Card className="about-team-card">
                  <Avatar size={120} src={member.photo} />
                  <Title level={4}>{member.name}</Title>
                  <Paragraph>{member.role}</Paragraph>
                  <Paragraph>{member.description}</Paragraph>
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
