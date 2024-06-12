// src/components/RecentProjectsWidget.js
import React, { useState, useEffect } from 'react';
import { Card, List, Row, Col, Skeleton } from 'antd';
import { db, collection, getDocs } from '../pages/firebase';
import '../styles/RecentProjectsWidget.css';

const RecentProjectsWidget = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsCollection = collection(db, 'projects');
        const projectsSnapshot = await getDocs(projectsCollection);
        const projectsData = projectsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setProjects(projectsData);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const loadingArray = Array.from({ length: 4 }, (_, index) => ({ id: index }));

  return (
    <Card title="Recent Projects" bordered={false} className="recent-projects-card">
      <Row gutter={[16, 16]}>
        {(loading ? loadingArray : projects).map((project, index) => (
          <Col xs={24} sm={24} md={12} lg={12} key={project.id || index}>
            <Card hoverable className="project-card">
              {loading ? (
                <Skeleton active avatar paragraph={{ rows: 2 }} />
              ) : (
                <Card.Meta
                  avatar={<img src={project.imgSrc} alt={project.title} className="project-image" />}
                  title={project.title}
                  description={project.description}
                />
              )}
            </Card>
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default RecentProjectsWidget;
