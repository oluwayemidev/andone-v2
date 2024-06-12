import React, { useState } from "react";
import { Layout, Menu, Badge } from "antd";
import { Outlet, Link } from "react-router-dom";
import {
  BulbOutlined,
  ContainerOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  AppstoreOutlined,
  UserOutlined,
  MessageOutlined,
  ContactsOutlined,
  FileTextOutlined,
  FormOutlined,
  DashboardOutlined,
  BellOutlined,
  LogoutOutlined,
  SettingOutlined,
  FileMarkdownOutlined,
  SkinOutlined,
  ToolOutlined
} from "@ant-design/icons";
import "../styles/AdminDashboard.css";

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

const AdminDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const logout = () => {
    localStorage.removeItem("user")
    window.location.href = "/"
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={toggle}
        breakpoint="lg"
        collapsedWidth="80"
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          paddingTop: 20,
          zIndex: 1,
          left: 0,
          top: 60,
          bottom: 0,
        }}
      >
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            <Link to="/admin/">Overview</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<AppstoreOutlined />}>
            <Link to="/admin/products">Products</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<ContainerOutlined />}>
            <Link to="/admin/categories">Categories</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<MessageOutlined />}>
            <Link to="/admin/chat">Messages</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<ContactsOutlined />}>
            <Link to="/admin/contacts">Contacts</Link>
          </Menu.Item>
          <Menu.Item key="6" icon={<FileTextOutlined />}>
            <Link to="/admin/quotations">Quotations</Link>
          </Menu.Item>
          <Menu.Item key="7" icon={<BulbOutlined />}>
            <Link to="/admin/solar-results">Solar Results</Link>
          </Menu.Item>
          <SubMenu key="sub1" icon={<SettingOutlined />} title="Customization">
            <Menu.Item key="9" icon={<FileMarkdownOutlined />}>
              <Link to="/admin/pages">Pages</Link>
            </Menu.Item>
            <Menu.Item key="10" icon={<SkinOutlined />}>
              <Link to="/admin/appearance">Appearance</Link>
            </Menu.Item>
            <Menu.Item key="11" icon={<ToolOutlined />}>
              <Link to="/admin/widgets">Widgets</Link>
            </Menu.Item>
            <Menu.Item key="12" icon={<SettingOutlined />}>
              <Link to="/admin/settings">Settings</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="13" onClick={logout} icon={<LogoutOutlined />} style={{ marginBottom: '120px' }}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <div className="trigger" onClick={toggle}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>
          <div style={{ float: "right", paddingRight: 24, marginTop: -50 }}>
            <Badge count={5}>
              <BellOutlined style={{ fontSize: 24 }} />
            </Badge>
          </div>
        </Header>
        <Content style={{ margin: "0 16px", overflow: "initial" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
