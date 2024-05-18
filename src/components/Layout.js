// src/components/Layout.js
import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, Outlet } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

const MainLayout = ({ item }) => (
  <Layout>
    <Header>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
        <Menu.Item key="2"><Link to="/about">About</Link></Menu.Item>
        <Menu.Item key="3"><Link to="/admin">Admin</Link></Menu.Item>
      </Menu>
    </Header>
    <Content style={{ padding: '0 50px', marginTop: 64 }}>
      <div className="site-layout-content">
        <Outlet />
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Solar Product Company ©2024</Footer>
  </Layout>
);

export default MainLayout;
