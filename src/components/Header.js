import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Layout,
  Menu,
  Button,
  Dropdown,
  Image,
  Grid,
  Badge,
  Affix,
  Tooltip,
} from "antd";
import {
  HomeOutlined,
  InfoCircleOutlined,
  AppstoreOutlined,
  ToolOutlined,
  PhoneOutlined,
  FileSearchOutlined,
  SunOutlined,
  MessageOutlined,
  GlobalOutlined,
  MenuOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import logo from "../images/logo.png"; // Adjust the path accordingly

const { Header } = Layout;
const { useBreakpoint } = Grid;

const HeaderComponent = ({
  translatedTexts,
  textsToTranslate,
  showDrawer,
  setLanguage,
  languageMenu,
}) => {
  const screens = useBreakpoint();
  const [visibleItems, setVisibleItems] = useState([
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
  ]);

  // Function to handle overflow items
  const handleOverflowMenuClick = ({ key }) => {
    // Implement your overflow menu click logic here
  };

  return (
    <Affix offsetTop={0}>
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
          backgroundColor: "white",
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
            style={{ flex: 1, minWidth: 0 }}
          >
            <Menu.Item key="1" icon={<HomeOutlined />}>
              <Link to="/">
                {translatedTexts.home || textsToTranslate.home}
              </Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<InfoCircleOutlined />}>
              <Link to="/about">
                {translatedTexts.about || textsToTranslate.about}
              </Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<AppstoreOutlined />}>
              <Link to="/products">
                {translatedTexts.products || textsToTranslate.products}
              </Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<ToolOutlined />}>
              <Link to="/services">
                {translatedTexts.services || textsToTranslate.services}
              </Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<PhoneOutlined />}>
              <Link to="/contact">
                {translatedTexts.contact || textsToTranslate.contact}
              </Link>
            </Menu.Item>
            <Menu.Item key="6" icon={<FileSearchOutlined />}>
              <Link to="/quotation">
                {translatedTexts.getQuote || textsToTranslate.getQuote}
              </Link>
            </Menu.Item>
            <Menu.Item key="7" icon={<SunOutlined />}>
              <Link to="/solar-calculation">
                {translatedTexts.getSolarCalculation ||
                  textsToTranslate.getSolarCalculation}
              </Link>
            </Menu.Item>
            <Menu.Item key="8" icon={<MessageOutlined />}>
              <Badge dot={{ dot: true }} offset={[10, 2]}>
                <Link to="/chat" style={{ color: "#ffffffa6" }}>
                  {translatedTexts.liveChat || textsToTranslate.liveChat}
                </Link>
              </Badge>
            </Menu.Item>
            <Menu.Item
              key="more"
              icon={<MoreOutlined />}
              style={{
                marginLeft: "auto",
                background: "transparent",
              }}
            >
              <Tooltip title="Language" color="blue">
                <Dropdown overlay={languageMenu} arrow trigger={["click"]}>
                  <Button icon={<GlobalOutlined />} />
                </Dropdown>
              </Tooltip>
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
    </Affix>
  );
};

export default HeaderComponent;
