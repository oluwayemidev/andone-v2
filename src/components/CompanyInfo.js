import React, { useState, useEffect } from "react";
import { Card, Typography, Skeleton, Alert } from "antd";
import { db, doc, getDoc } from '../pages/firebase';

const { Title, Paragraph } = Typography;

const CompanyInfo = () => {
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
          setCompanyInfo(docSnap.data());
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
  }, []);

  if (loading) {
    return (
      <Card title="About Us" bordered={false} style={{ width: "100%" }}>
        <Skeleton active />
      </Card>
    );
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" />;
  }

  return (
    <Card title="About Us" bordered={false} style={{ width: "100%" }}>
      <Typography>
        <Title level={4}>{companyInfo.title}</Title>
        <Paragraph>{companyInfo.paragraph1}</Paragraph>
        <Paragraph>{companyInfo.paragraph2}</Paragraph>
      </Typography>
    </Card>
  );
};

export default CompanyInfo;
