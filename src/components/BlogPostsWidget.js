// BlogPostsWidget.js
import React from 'react';
import { Card, List } from 'antd';

const BlogPostsWidget = () => {
  const data = [
    { title: 'Post 1', content: 'Lorem ipsum dolor sit amet.' },
    { title: 'Post 2', content: 'Consectetur adipiscing elit.' },
    { title: 'Post 3', content: 'Sed do eiusmod tempor incididunt.' },
  ];

  return (
    <Card title="Latest Blog Posts">
      {/* Blog posts */}
      <List
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              title={<a href="#">{item.title}</a>}
              description={item.content}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default BlogPostsWidget;
