// src/components/Filters.js
import React from 'react';
import { Menu } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';

const Filters = ({ categories, onCategoryChange }) => {
  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={['All']}
      style={{ height: '100%', borderRight: 0 }}
      onSelect={({ key }) => onCategoryChange(key)}
    >
      {categories.map(category => (
        <Menu.Item key={category} icon={<AppstoreOutlined />}>
          {category}
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default Filters;