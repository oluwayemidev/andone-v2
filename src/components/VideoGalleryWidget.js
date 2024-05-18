// src/components/VideoGalleryWidget.js
import React from 'react';
import { Card, Row, Col } from 'antd';
import ReactPlayer from 'react-player';
import vid from '../images/0430_6.mov'
import '../styles/VideoGalleryWidget.css';

const videos = [
  { url: 'https://www.youtube.com/watch?v=jNQXAC9IVRw', title: 'Sample Video 2' },
];

const VideoGalleryWidget = () => {
  return (
    <Card title="At the Factory" bordered={false} className="video-gallery-card">
      <Row gutter={[16, 16]}>
        {videos.map((video, index) => (
          <Col xs={24} key={index}>
            <div className="video-container">
              <ReactPlayer url={video.url} controls width="100%" />
              <p className="video-title">{video.title}</p>
            </div>
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default VideoGalleryWidget;
