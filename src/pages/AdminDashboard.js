// src/components/AdminDashboard.js (Updated to include Quotation Form link)
import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { Outlet, Link } from 'react-router-dom';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  AppstoreOutlined,
  UserOutlined,
  MessageOutlined,
  ContactsOutlined,
  FileTextOutlined,
  FormOutlined
} from '@ant-design/icons';
import '../styles/AdminDashboard.css';

const { Header, Content, Sider } = Layout;

const AdminDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={toggle}
        breakpoint="lg"
        collapsedWidth="80"
        className="sider"
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<AppstoreOutlined />}>
            <Link to="/admin/products">Products</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            <Link to="/admin/users">Users</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<MessageOutlined />}>
            <Link to="/admin/messages">Messages</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<ContactsOutlined />}>
            <Link to="/admin/contacts">Contacts</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<FileTextOutlined />}>
            <Link to="/admin/quotations">Quotations</Link>
          </Menu.Item>
          <Menu.Item key="6" icon={<FormOutlined />}>
            <Link to="/quotation">Request Quotation</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <div className="trigger" onClick={toggle}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>
        </Header>
        <Content style={{ margin: '0 16px', overflow: 'initial' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
