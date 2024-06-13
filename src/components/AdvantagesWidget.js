import React, { useState, useEffect } from "react";
import { db, collection, getDocs } from "../pages/firebase";
import "../styles/AdvantagesWidget.css";
import { Card, Col, Row, Skeleton } from "antd";

const AdvantagesWidget = () => {
  const [advantages, setAdvantages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdvantages = async () => {
      try {
        const advantagesCollection = collection(db, "advantages");
        const advantagesSnapshot = await getDocs(advantagesCollection);
        const advantagesData = advantagesSnapshot.docs.map((doc) => doc.data());
        setAdvantages(advantagesData);
      } catch (error) {
        console.error("Error fetching advantages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdvantages();
  }, []);

  return (
    <Card
      title="Our Values"
      bordered={false}
      style={{ }}
      className="advantages-container"
    >
      <Row gutter={[16, 16]}>
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <Col xs={24} sm={12} md={8} key={index}>
                <Card className="advantage-card">
                  <Skeleton.Image className="advantage-image" />
                  <Card.Meta
                    title={<Skeleton.Input style={{ width: 100 }} active />}
                    description={
                      <Skeleton paragraph={{ rows: 2 }} active />
                    }
                  />
                </Card>
              </Col>
            ))
          : advantages.map((advantage, index) => (
              <Col style={{ justifyContent: 'center', alignItems: 'center' }} xs={24} sm={12} md={8} key={index}>
                <Card
                  hoverable
                  cover={
                    <img
                      alt={advantage.title}
                      src={advantage.img}
                      className="advantage-image"
                    />
                  }
                  className="advantage-card"
                >
                  <Card.Meta
                    title={advantage.title}
                    description={advantage.description}
                  />
                </Card>
              </Col>
            ))}
      </Row>
    </Card>
  );
};

export default AdvantagesWidget;
