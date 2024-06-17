import React, { useState, useEffect } from "react";
import { db, collection, getDocs } from "../pages/firebase";
import { Card, Col, Row, Skeleton } from "antd";
import translateText from "../translationService"; // Import your translation service
import "../styles/AdvantagesWidget.css";

const AdvantagesWidget = ({ language }) => {
  const [advantages, setAdvantages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [translatedTitle, setTranslatedTitle] = useState("");

  useEffect(() => {
    const fetchAdvantages = async () => {
      try {
        const advantagesCollection = collection(db, "advantages");
        const advantagesSnapshot = await getDocs(advantagesCollection);
        const advantagesData = advantagesSnapshot.docs.map((doc) => doc.data());

        // Translate static text like widget title
        const translatedWidgetTitle = await translateText(
          "Our Values",
          language
        );
        setTranslatedTitle(translatedWidgetTitle);

        // Translate dynamic content like advantage titles and descriptions
        const translatedAdvantages = await Promise.all(
          advantagesData.map(async (advantage) => ({
            ...advantage,
            title: await translateText(advantage.title, language),
            description: await translateText(advantage.description, language),
          }))
        );

        setAdvantages(translatedAdvantages);
      } catch (error) {
        console.error("Error fetching and translating advantages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdvantages();
  }, [language]); // Trigger fetch and translation when language changes

  return (
    <Card
      title={translatedTitle}
      bordered={false}
      style={{}}
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
                    description={<Skeleton paragraph={{ rows: 2 }} active />}
                  />
                </Card>
              </Col>
            ))
          : advantages.map((advantage, index) => (
              <Col xs={24} sm={12} md={8} key={index}>
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
