// src/components/VideoGalleryWidget.js
import React from 'react';
import { Card, Row, Col } from 'antd';
import ReactPlayer from 'react-player';
import vid1 from '../videos/vid.mp4'
import vid2 from '../images/0430_6.mov'
import vid3 from '../images/0430_7.mov'
import '../styles/VideoGalleryWidget.css';

const videos = [
  { url: `${vid1}`, title: 'Intro' },
  { url: `${vid2}`, title: 'At work' },
  { url: `${vid3}`, title: 'At work' },
];

const VideoGalleryWidget = () => {
  return (
    <Card title="At the Factory" bordered={false} className="video-gallery-card">
      <Row gutter={[16, 16]}>
        {videos.slice(0, 1).map((video, index) => (
          <Col xs={24} key={index}>
            <div className="video-container">
              {/* <ReactPlayer url={video.url} controls width="100%" /> */}
              <video src={video.url} controls style={{ width: '100%', height: 200 }}></video>
              <p className="video-title">{video.title}</p>
            </div>
          </Col>
        ))}
        {videos.slice(1).map((video, index) => (
          <Col xs={24} md={12} key={index}>
            <div className="video-container">
              {/* <ReactPlayer url={video.url} controls width="100%" /> */}
              <video src={video.url} controls style={{ width: '100%', height: 150, }}></video>
              <p className="video-title">{video.title}</p>
            </div>
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default VideoGalleryWidget;
