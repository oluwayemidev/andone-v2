// src/components/VideoGalleryWidget.js
import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Skeleton } from 'antd';
import { db, collection, getDocs } from '../pages/firebase';
import '../styles/VideoGalleryWidget.css';
import ReactPlayer from 'react-player';

const VideoGalleryWidget = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const videosCollection = collection(db, 'videos');
        const videosSnapshot = await getDocs(videosCollection);
        const videosData = videosSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setVideos(videosData);
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const loadingArray = Array.from({ length: 3 }, (_, index) => ({ id: index }));

  return (
    <Card title="Video Gallery" bordered={false} className="video-gallery-card">
      <Row gutter={[16, 16]}>
        {(loading ? loadingArray : videos.slice(0, 1)).map((video, index) => (
          <Col xs={24} key={video.id || index}>
            <div className="video-container">
              <video
                src={loading ? '' : video.url}
                controls
                style={{ width: '100%', height: 200 }}
                onError={() => console.error('Video failed to load')}
              />
              <p className="video-title">{loading ? <Skeleton active /> : video.title}</p>
            </div>
          </Col>
        ))}
        {(loading ? loadingArray.slice(1) : videos.slice(1)).map((video, index) => (
          <Col xs={24} md={12} key={video.id || index}>
            <div className="video-container">
              <video
                src={loading ? '' : video.url}
                controls
                style={{ width: '100%', height: 150 }}
                onError={() => console.error('Video failed to load')}
              />
              {/* <ReactPlayer url={loading ? '' : video.url} controls style={{ width: '100%', height: 150 }} onError={() => console.error('Video failed to load')} /> */}
              <p className="video-title">{loading ? <Skeleton active /> : video.title}</p>
            </div>
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default VideoGalleryWidget;
