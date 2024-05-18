// src/components/CompanyInfo.js
import React from "react";
import { Card, Typography } from "antd";

const { Title, Paragraph } = Typography;

const CompanyInfo = () => (
  <Card title="About Us" bordered={false} style={{ width: "100%" }}>
    <Typography>
      <Title level={4}>We Make Sustainable Energy Solutions</Title>
      <Paragraph>
        We are a leading provider of solar energy solutions, committed to
        delivering high-quality solar products and services to our customers.
        Our mission is to promote sustainable energy and reduce carbon
        footprints through innovative and efficient solar technologies.
      </Paragraph>
      <Paragraph>
        With a team of experienced professionals, we offer comprehensive
        solutions from consultation to installation and maintenance of solar
        panels, ensuring a seamless transition to renewable energy for homes and
        businesses.
      </Paragraph>
    </Typography>
  </Card>
);

export default CompanyInfo;
