// src/components/SolarNewsWidget.js
import React, { useState, useEffect } from 'react';
import { Card, List, Spin, Alert, Button } from 'antd';
import axios from 'axios';

const SolarNewsWidget = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleItems, setVisibleItems] = useState(5); // Show 3 items initially

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/everything', {
          params: {
            q: 'solar energy', // query for solar energy news
            apiKey: 'f3952991078f43789625b4edcbabf6a2',
          },
        });
        setNews(response.data.articles);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const loadMore = () => {
    setVisibleItems((prev) => prev + 3); // Load 3 more items each time
  };

  if (loading) {
    return <Spin tip="Loading news..." />;
  }

  if (error) {
    return <Alert message="Error" description="Failed to fetch news." type="error" showIcon />;
  }

  return (
    <Card title="Latest Solar News" bordered={false} style={{ width: '100%' }}>
      <List
        itemLayout="vertical"
        dataSource={news.slice(0, visibleItems)}
        renderItem={item => (
          <List.Item key={item.url}>
            <List.Item.Meta
              title={<a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>}
              description={item.description}
            />
          </List.Item>
        )}
      />
      {visibleItems < news.length && (
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Button onClick={loadMore}>Load More</Button>
        </div>
      )}
    </Card>
  );
};

export default SolarNewsWidget;
