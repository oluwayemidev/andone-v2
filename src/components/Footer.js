import React, { useEffect, useState } from 'react';
import { Layout, Row, Col, Space } from 'antd';
import { FacebookOutlined, TwitterOutlined, InstagramOutlined, LinkedinOutlined } from '@ant-design/icons';
import { db, doc, getDoc } from '../pages/firebase';

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
        backgroundColor: "#001529",
        textAlign: "center",
        padding: "10px 0",
        color: 'white'
      }}
    >
      <Row justify="center">
        <Col>
          <Space size="middle">
          <h2 style={{ marginTop: '7px', fontSize: "16px" }}>{translatedTexts.connectWithUs || "Connect with Us:"}</h2>
            <a href={socialMedia.facebook} target="_blank" rel="noopener noreferrer">
              <FacebookOutlined style={{ fontSize: "20px", color: "white" }} />
            </a>
            <a href={socialMedia.twitter} target="_blank" rel="noopener noreferrer">
              <TwitterOutlined style={{ fontSize: "20px", color: "white" }} />
            </a>
            <a href={socialMedia.instagram} target="_blank" rel="noopener noreferrer">
              <InstagramOutlined style={{ fontSize: "20px", color: "white" }} />
            </a>
            <a href={socialMedia.linkedin} target="_blank" rel="noopener noreferrer">
              <LinkedinOutlined style={{ fontSize: "20px", color: "white" }} />
            </a>
          </Space>
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: "10px" }}>
        <Col>
          <p style={{ margin: 0, fontSize: "14px" }}>
            ©{new Date().getFullYear()}. AndOne - {translatedTexts.allRightsReserved || "All rights reserved."}
          </p>
        </Col>
      </Row>
    </Footer>
  );
};

export default FooterComponent;
