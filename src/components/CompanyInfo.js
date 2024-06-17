import React, { useState, useEffect } from "react";
import { Card, Typography, Skeleton, Alert } from "antd";
import { db, doc, getDoc } from '../pages/firebase';
import translateText from "../translationService"; // Import your translation service

const { Title, Paragraph } = Typography;

const CompanyInfo = ({ language }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [companyInfo, setCompanyInfo] = useState({
    title: "",
    paragraph1: "",
    paragraph2: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "companyInfo", "info");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          // Translate fetched data
          const translatedData = {
            title: await translateText(data.title, language),
            paragraph1: await translateText(data.paragraph1, language),
            paragraph2: await translateText(data.paragraph2, language),
          };
          setCompanyInfo(translatedData);
        } else {
          setError("No such document!");
        }
      } catch (error) {
        setError("Error getting document: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [language]); // Trigger fetch and translation when language changes

  if (loading) {
    return (
      <Card title="About Us" bordered={false} style={{}}>
        <Skeleton active />
      </Card>
    );
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" />;
  }

  return (
    <Card title="About Us" bordered={false} style={{}}>
      <Typography>
        <Title level={4}>{companyInfo.title}</Title>
        <Paragraph>{companyInfo.paragraph1}</Paragraph>
        <Paragraph>{companyInfo.paragraph2}</Paragraph>
      </Typography>
    </Card>
  );
};

export default CompanyInfo;
