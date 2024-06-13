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
    <Card title="Video Gallery" bordered={false} className="video-gallery-card">
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




// import React, { useState, useEffect } from 'react';
// import { Card, Row, Col, Skeleton } from 'antd';
// import { db, collection, getDocs } from '../pages/firebase';
// import '../styles/VideoGalleryWidget.css';
// import ReactPlayer from 'react-player';

// const VideoGalleryWidget = () => {
//   const [videos, setVideos] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchVideos = async () => {
//       try {
//         const videosCollection = collection(db, 'videos');
//         const videosSnapshot = await getDocs(videosCollection);
//         const videosData = videosSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//         setVideos(videosData);
//       } catch (error) {
//         console.error('Error fetching videos:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVideos();
//   }, []);

//   const loadingArray = Array.from({ length: 3 }, (_, index) => ({ id: index }));

//   const handleVideoError = (e, url) => {
//     console.error(`Video failed to load from ${url}:`, e);
//   };

//   return (
//     <Card title="Video Gallery" bordered={false} className="video-gallery-card">
//       <Row gutter={[16, 16]}>
//         {(loading ? loadingArray : videos.slice(0, 1)).map((video, index) => (
//           <Col xs={24} key={video.id || index}>
//             <div className="video-container">
//               <ReactPlayer
//                 url={loading ? '' : video.url}
//                 controls
//                 width="100%"
//                 height="200px"
//                 onError={(e) => handleVideoError(e, video.url)}
//               />
//               <p className="video-title">{loading ? <Skeleton active /> : video.title}</p>
//             </div>
//           </Col>
//         ))}
//         {(loading ? loadingArray.slice(1) : videos.slice(1)).map((video, index) => (
//           <Col xs={24} md={12} key={video.id || index}>
//             <div className="video-container">
//               <ReactPlayer
//                 url={loading ? '' : video.url}
//                 controls
//                 width="100%"
//                 height="150px"
//                 onError={(e) => handleVideoError(e, video.url)}
//               />
//               <p className="video-title">{loading ? <Skeleton active /> : video.title}</p>
//             </div>
//           </Col>
//         ))}
//       </Row>
//     </Card>
//   );
// };

// export default VideoGalleryWidget;
