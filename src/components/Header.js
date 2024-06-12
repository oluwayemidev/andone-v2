import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Button, Dropdown, Image, Grid } from 'antd';
import { HomeOutlined, InfoCircleOutlined, AppstoreOutlined, ToolOutlined, PhoneOutlined, FileSearchOutlined, SunOutlined, GlobalOutlined, MenuOutlined } from '@ant-design/icons';
import logo from '../images/logo.png'; // Adjust the path accordingly

const { Header } = Layout;
const { useBreakpoint } = Grid;

const HeaderComponent = ({ translatedTexts, textsToTranslate, showDrawer, setLanguage, languageMenu }) => {
  const screens = useBreakpoint();

  return (
    <Header
      className="site-layout-background"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 10,
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
      </div>
      {screens.md ? (
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          style={{ flex: 1 }}
        >
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/">{translatedTexts.home || textsToTranslate.home}</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<InfoCircleOutlined />}>
            <Link to="/about">{translatedTexts.about || textsToTranslate.about}</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<AppstoreOutlined />}>
            <Link to="/products">{translatedTexts.products || textsToTranslate.products}</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<ToolOutlined />}>
            <Link to="/services">{translatedTexts.services || textsToTranslate.services}</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<PhoneOutlined />}>
            <Link to="/contact">{translatedTexts.contact || textsToTranslate.contact}</Link>
          </Menu.Item>
          <Menu.Item key="6" icon={<FileSearchOutlined />}>
            <Link to="/quotation">{translatedTexts.getQuote || textsToTranslate.getQuote}</Link>
          </Menu.Item>
          <Menu.Item key="7" icon={<SunOutlined />}>
            <Link to="/solar-calculation">{translatedTexts.getSolarCalculation || textsToTranslate.getSolarCalculation}</Link>
          </Menu.Item>
          <Menu.Item
            style={{
              background: "transparent",
              flexGrow: 2,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Dropdown overlay={languageMenu} trigger={["click"]}>
              <Button icon={<GlobalOutlined />} />
            </Dropdown>
          </Menu.Item>
        </Menu>
      ) : (
        <Button
          style={{ right: "16px" }}
          icon={<MenuOutlined />}
          onClick={showDrawer}
          className="nav-icon"
        />
      )}
    </Header>
  );
};

export default HeaderComponent;
