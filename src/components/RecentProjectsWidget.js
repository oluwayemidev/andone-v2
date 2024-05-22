// src/components/RecentProjectsWidget.js
import React from 'react';
import { Card, List, Row, Col } from 'antd';
import projectA from '../images/projectA.jpg';
import projectB from '../images/projectB.jpg';
import projectC from '../images/projectC.jpg';
import projectD from '../images/projectD.jpg';
import projectE from '../images/projectE.jpg';
import projectF from '../images/projectF.jpg';
import projectG from '../images/projectG.jpg';
import projectH from '../images/projectH.jpg';
import '../styles/RecentProjectsWidget.css';

const projects = [
  { title: 'Installations', description: 'Installed 100 solar panels in Lagos Nigeria', imgSrc: projectB },
  { title: 'Solar Farm', description: 'Set up a solar farm in South Africa', imgSrc: projectA },
  { title: 'Residential', description: 'Residential solar panel installation in Lagos Nigeria', imgSrc: projectC },
  { title: 'Commercial', description: 'Commercial rooftop solar panels in Lagos Nigeria', imgSrc: projectD },
  // { title: 'Project E', description: 'Solar power plant in City E', imgSrc: projectE },
  { title: 'Installation', description: 'Installed solar water heaters in South Africa', imgSrc: projectF },
  { title: 'Off-grid System', description: 'Off-grid solar system in Lagos Nigeria', imgSrc: projectG },
  // { title: 'Project H', description: 'Community solar project in City H', imgSrc: projectH }
];

const RecentProjectsWidget = () => (
  <Card title="Recent Projects" bordered={false} className="recent-projects-card">
    <Row gutter={[16, 16]}>
      {projects.map((project, index) => (
        <Col xs={24} sm={24} md={12} lg={12} key={index}>
          <Card hoverable className="project-card">
            <Card.Meta
              avatar={<img src={project.imgSrc} alt={project.title} className="project-image" />}
              title={<a href="#">{project.title}</a>}
              description={project.description}
            />
          </Card>
        </Col>
      ))}
    </Row>
  </Card>
);

export default RecentProjectsWidget;
