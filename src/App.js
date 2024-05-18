// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Layout, Menu, Drawer, Button, Grid, Image } from "antd";
import {
  MenuUnfoldOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  SettingOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import FloatingButton from "./components/FloatingButton";
import AdminLoginPage from "./pages/Login";
import AdminSignupPage from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import ProductsPage from "./pages/ProductsPage";
import UsersPage from "./pages/UsersPage";
import MessagesPage from "./pages/MessagesPage";
import ContactsPage from "./pages/ContactsPage";
import QuotationForm from './pages/QuotationForm';
import QuotationsPage from './pages/QuotationsPage';
import "./App.css";
import logo from "./images/logo.png";

const { Header, Content, Footer } = Layout;
const { useBreakpoint } = Grid;

const App = () => {
  const [visible, setVisible] = useState(false);
  const screens = useBreakpoint();

  const showDrawer = () => {
    setVisible(true);
  };

  const closeDrawer = () => {
    setVisible(false);
  };

  const menu = (
    <Menu theme="light" mode="vertical" defaultSelectedKeys={["1"]}>
      <Menu.Item key="1" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<InfoCircleOutlined />}>
        <Link to="/about">About</Link>
      </Menu.Item>
      <Menu.Item key="3" icon={<SettingOutlined />}>
        <Link to="/products">Products</Link>
      </Menu.Item>
      <Menu.Item key="4" icon={<SettingOutlined />}>
        <Link to="/services">Services</Link>
      </Menu.Item>
      <Menu.Item key="4" icon={<SettingOutlined />}>
        <Link to="/contact">Contact</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Header
          className="site-layout-background"
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            display: "flex",
            alignItems: "center",
            padding: "0 0 0 16px",
          }}
        >
          <div
            className="logo"
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "auto",
              paddingRight: 20,
            }}
          >
            <Image
              width={100}
              src={logo} // Replace with your logo path
              alt="Logo"
            />
            {/* <span style={{ color: '#fff', marginLeft: '10px', fontSize: '20px', fontWeight: 'bold' }}>Solar Co.</span> */}
          </div>
          {screens.md ? (
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["1"]}
              style={{ flex: 1 }}
            >
              <Menu.Item key="1" icon={<HomeOutlined />}>
                <Link to="/">Home</Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<InfoCircleOutlined />}>
                <Link to="/about">About</Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<SettingOutlined />}>
                <Link to="/products">Products</Link>
              </Menu.Item>
              <Menu.Item key="4" icon={<SettingOutlined />}>
                <Link to="/services">Services</Link>
              </Menu.Item>
              <Menu.Item key="4" icon={<SettingOutlined />}>
                <Link to="/contact">Contact</Link>
              </Menu.Item>
            </Menu>
          ) : (
            <Button
              style={{ right: "16px" }}
              icon={<MenuOutlined />}
              onClick={showDrawer}
            />
          )}
        </Header>
        <Drawer
          title="Menu"
          placement="left"
          onClose={closeDrawer}
          visible={visible}
          bodyStyle={{ padding: 0 }}
        >
          {menu}
        </Drawer>
        <Content style={{ margin: "0", padding: 0, minHeight: 280 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            {/* Add routes for the new menu items */}
            <Route path="/products" element={<Products />} />
            <Route path="/services" element={<div>Services Page</div>} />
            <Route path="/quotation" element={<QuotationForm />} />
            <Route path="/contact" element={<div>Contact Page</div>} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin/signup" element={<AdminSignupPage />} />
            <Route path="/admin" element={<AdminDashboard />}>
              <Route path="products" element={<ProductsPage />} />
              <Route path="users" element={<UsersPage />} />
              <Route path="messages" element={<MessagesPage />} />
              <Route path="contacts" element={<ContactsPage />} />
              <Route path="quotations" element={<QuotationsPage />} />
            </Route>
          </Routes>
        </Content>
        <FloatingButton />
        <Footer style={{ textAlign: "center" }}>
          www.andonesolar.com ©2024 Created by{" "}
          <Link to="https://oluwayemi.vercel.app">Oyem Tech</Link>
        </Footer>
      </Layout>
    </Router>
  );
};

export default App;
