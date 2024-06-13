import React, { useState, useEffect } from "react";
import {
  Layout,
  Row,
  Col,
  Card,
  Typography,
  Button,
  Skeleton,
  Alert,
} from "antd";
import { Link } from "react-router-dom";
import { animated } from "@react-spring/web";
import { useSpring } from "@react-spring/core";
import {
  SolutionOutlined,
  SettingOutlined,
  CustomerServiceOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { db, doc, getDoc } from "../pages/firebase";
import translateText from "../translationService"; // Import your translation service
import "../styles/Service.css";

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;

const iconMap = {
  SolutionOutlined: <SolutionOutlined />,
  SettingOutlined: <SettingOutlined />,
  CustomerServiceOutlined: <CustomerServiceOutlined />,
  CheckCircleOutlined: <CheckCircleOutlined />,
};

const ServicePage = ({ language }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [translatedTexts, setTranslatedTexts] = useState({
    header: "Our Services",
    whatWeOffer: "What We Offer",
    description:
      "We provide a range of services to help you achieve energy efficiency and sustainability. Our expert team is here to support you every step of the way.",
    contactUs: "Contact Us",
  });

  const animationProps = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { duration: 800 },
  });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const docRef = doc(db, "pages", "services");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const servicesData = docSnap.data().services;
          const translatedServices = await translateServices(
            servicesData,
            language
          );
          setServices(translatedServices);
        } else {
          setError("No such document!");
        }
      } catch (error) {
        setError("Error getting document: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
    translateStaticTexts(language);
  }, [language]);

  const translateServices = async (services, language) => {
    const translatedServices = await Promise.all(
      services.map(async (service) => {
        const translatedTitle = await translateText(service.title, language);
        const translatedDescription = await translateText(
          service.description,
          language
        );
        return {
          ...service,
          title: translatedTitle,
          description: translatedDescription,
        };
      })
    );
    return translatedServices;
  };

  const translateStaticTexts = async (language) => {
    const translatedHeader = await translateText("Our Services", language);
    const translatedWhatWeOffer = await translateText(
      "What We Offer",
      language
    );
    const translatedDescription = await translateText(
      "We provide a range of services to help you achieve energy efficiency and sustainability. Our expert team is here to support you every step of the way.",
      language
    );
    const translatedContactUs = await translateText("Contact Us", language);

    setTranslatedTexts({
      header: translatedHeader,
      whatWeOffer: translatedWhatWeOffer,
      description: translatedDescription,
      contactUs: translatedContactUs,
    });
  };

  if (loading) {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Header style={{ backgroundColor: "#001529", padding: "0 50px" }}>
          <Title
            level={2}
            style={{ color: "white", lineHeight: "64px", textAlign: "center" }}
          >
            {translatedTexts.header}
          </Title>
        </Header>
        <Content style={{ padding: "50px" }}>
          <Skeleton active paragraph={{ rows: 2 }} />
          <Row gutter={[16, 16]}>
            {Array.from({ length: 4 }).map((_, index) => (
              <Col xs={24} sm={12} md={8} lg={6} key={index}>
                <Card style={{ textAlign: "center", borderRadius: "10px" }}>
                  <Skeleton.Avatar
                    size={64}
                    shape="circle"
                    style={{ marginBottom: 20 }}
                  />
                  <Skeleton active title={false} paragraph={{ rows: 2 }} />
                </Card>
              </Col>
            ))}
          </Row>
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            <Skeleton.Button active size="large" />
          </div>
        </Content>
      </Layout>
    );
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" />;
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ backgroundColor: "#001529", padding: "0 50px" }}>
        <Title
          level={2}
          style={{ color: "white", lineHeight: "64px", textAlign: "center" }}
        >
          {translatedTexts.header}
        </Title>
      </Header>
      <Content style={{ padding: "50px" }}>
        <animated.div
          style={{
            textAlign: "center",
            marginBottom: "50px",
            ...animationProps,
          }}
        >
          <Title level={2}>{translatedTexts.whatWeOffer}</Title>
          <Paragraph>{translatedTexts.description}</Paragraph>
        </animated.div>
        <Row gutter={[16, 16]}>
          {services.map((service, index) => (
            <Col xs={24} sm={12} md={8} lg={6} key={index}>
              <animated.div style={animationProps}>
                <Card
                  hoverable
                  style={{ textAlign: "center", borderRadius: "10px" }}
                  cover={
                    <div
                      style={{
                        fontSize: "64px",
                        color: "#1890ff",
                        padding: "20px 0",
                      }}
                    >
                      {iconMap[service.icon]}
                    </div>
                  }
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
        <animated.div
          style={{ textAlign: "center", marginTop: "50px", ...animationProps }}
        >
          <Link to="/contact">
            <Button type="primary" size="large">
              {translatedTexts.contactUs}
            </Button>
          </Link>
        </animated.div>
      </Content>
    </Layout>
  );
};

export default ServicePage;
