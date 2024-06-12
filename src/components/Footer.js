import React, { useEffect, useState } from 'react';
import { Layout, Row, Col, Divider, Space } from 'antd';
import { FacebookOutlined, TwitterOutlined, InstagramOutlined, LinkedinOutlined } from '@ant-design/icons';
import { db, doc, getDoc } from '../pages/firebase';  // Import Firestore functions

const { Footer } = Layout;

const FooterComponent = ({ translatedTexts }) => {
  const [settings, setSettings] = useState({});

  const fetchSettings = async () => {
    const docRef = doc(db, 'settings', 'general');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setSettings(docSnap.data());
    } else {
      console.error('No settings found!');
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const { socialMedia = {} } = settings;

  return (
    <Footer
      style={{
        backgroundColor: "#f0f2f5",
        textAlign: "center",
        padding: "0",
      }}
    >
      <Row justify="center">
        <Col span={24}>
          <Divider />
          <h2>{translatedTexts.connectWithUs || "Connect with Us"}</h2>
          <Space size="large">
            <a href={socialMedia.facebook} target="_blank" rel="noopener noreferrer">
              <FacebookOutlined style={{ fontSize: "24px", color: "#3b5998" }} />
            </a>
            <a href={socialMedia.twitter} target="_blank" rel="noopener noreferrer">
              <TwitterOutlined style={{ fontSize: "24px", color: "#00acee" }} />
            </a>
            <a href={socialMedia.instagram} target="_blank" rel="noopener noreferrer">
              <InstagramOutlined style={{ fontSize: "24px", color: "#c32aa3" }} />
            </a>
            <a href={socialMedia.linkedin} target="_blank" rel="noopener noreferrer">
              <LinkedinOutlined style={{ fontSize: "24px", color: "#0077b5" }} />
            </a>
          </Space>
          <Divider />
        </Col>
      </Row>
      <Row justify="center">
        <Col span={24}>
          <p style={{ padding: "1rem 2rem" }}>
            ©{new Date().getFullYear()}. www.andonesolar.com - {translatedTexts.allRightsReserved || "All rights reserved."}
          </p>
        </Col>
      </Row>
    </Footer>
  );
};

export default FooterComponent;
