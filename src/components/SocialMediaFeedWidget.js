import React from 'react';
import { Card, Avatar, List } from 'antd';
import { UserOutlined } from '@ant-design/icons';

// Dummy social media posts data
const socialMediaPosts = [
  {
    id: 1,
    username: 'John Smith',
    content: 'Can I get a quotation for Inverter?',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: 2,
    username: 'Kate Johnson',
    content: 'Your products are the best.',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  // {
  //   id: 3,
  //   username: 'sam_wilson',
  //   content: 'Excited to start my new project! #coding #development',
  //   avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
  // },
];

const SocialMediaFeedWidget = () => {
  return (
    <Card title="Social Media Feed" style={{ width: '100%', height: 300, overflowY: 'auto' }}>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={socialMediaPosts}
        renderItem={post => (
          <List.Item
            key={post.id}
            extra={<img src={post.avatar} alt="Avatar" style={{ width: 100 }} />}
          >
            <List.Item.Meta
              avatar={<Avatar src={post.avatar} icon={<UserOutlined />} />}
              title={post.username}
              description={post.content}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default SocialMediaFeedWidget;
