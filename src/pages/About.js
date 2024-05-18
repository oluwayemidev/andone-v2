// src/pages/About.js
import React from "react";
import { Card, Layout, Typography } from "antd";
import { Header } from "antd/es/layout/layout";

const { Title, Paragraph } = Typography;

const About = () => (
  <Layout>
    <Header className="header">
      <Title level={2} style={{ color: "white", textAlign: "center" }}>
        About Us
      </Title>
    </Header>
    <Card
      title=""
      bordered={false}
      style={{ width: "100%", margin: "20px auto", maxWidth: "800px" }}
    >
      <Typography>
        <Title level={2}>Introduction</Title>
        <Paragraph>
          We are a leading provider of solar energy solutions, committed to
          delivering high-quality solar products and services to our customers.
          Our mission is to promote sustainable energy and reduce carbon
          footprints through innovative and efficient solar technologies.
        </Paragraph>
        <Paragraph>
          Founded in [Year], our company has grown to become a trusted name in
          the solar industry. We pride ourselves on our commitment to
          excellence, customer satisfaction, and environmental responsibility.
        </Paragraph>
        <Paragraph>
          Our team of experienced professionals offers comprehensive solutions,
          from consultation and design to installation and maintenance of solar
          panels. We work closely with our clients to understand their unique
          energy needs and provide customized solutions that maximize efficiency
          and savings.
        </Paragraph>
        <Paragraph>
          In addition to our product offerings, we are dedicated to educating
          the public about the benefits of solar energy and advocating for
          sustainable practices. We believe that by empowering individuals and
          businesses to harness the power of the sun, we can contribute to a
          cleaner, greener future for all.
        </Paragraph>
        <Title level={3}>Our Services</Title>
        <Paragraph>
          <ul>
            <li>Solar panel installation</li>
            <li>Maintenance and repair services</li>
            <li>Energy efficiency consultation</li>
            <li>
              Customized solar solutions for residential and commercial
              properties
            </li>
          </ul>
        </Paragraph>
        <Title level={3}>Our Mission</Title>
        <Paragraph>
          Our mission is to provide sustainable energy solutions that are
          accessible, affordable, and efficient. We are dedicated to reducing
          our customers' energy costs while promoting a cleaner environment
          through the use of renewable energy sources.
        </Paragraph>
        <Title level={3}>Contact Us</Title>
        <Paragraph>
          For more information about our products and services, please contact
          us at:
          <br />
          Email: info@solarcompany.com
          <br />
          Phone: (123) 456-7890
        </Paragraph>
      </Typography>
    </Card>
  </Layout>
);

export default About;
