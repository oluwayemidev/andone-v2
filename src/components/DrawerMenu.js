import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Drawer, Dropdown, Menu } from 'antd';
import { HomeOutlined, InfoCircleOutlined, AppstoreOutlined, ToolOutlined, PhoneOutlined, FileSearchOutlined, SunOutlined, GlobalOutlined } from '@ant-design/icons';

const DrawerMenu = ({ visible, closeDrawer, translatedTexts, textsToTranslate, setLanguage, languageMenu }) => (
  <Drawer
    title="Menu"
    placement="left"
    onClose={closeDrawer}
    visible={visible}
    bodyStyle={{ padding: 0 }}
  >
    <Menu theme="light" mode="vertical" defaultSelectedKeys={["1"]}>
      <Menu.Item key="1" icon={<HomeOutlined />} onClick={closeDrawer}>
        <Link to="/">{translatedTexts.home || textsToTranslate.home}</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<InfoCircleOutlined />} onClick={closeDrawer}>
        <Link to="/about">{translatedTexts.about || textsToTranslate.about}</Link>
      </Menu.Item>
      <Menu.Item key="3" icon={<AppstoreOutlined />} onClick={closeDrawer}>
        <Link to="/products">{translatedTexts.products || textsToTranslate.products}</Link>
      </Menu.Item>
      <Menu.Item key="4" icon={<ToolOutlined />} onClick={closeDrawer}>
        <Link to="/services">{translatedTexts.services || textsToTranslate.services}</Link>
      </Menu.Item>
      <Menu.Item key="5" icon={<PhoneOutlined />} onClick={closeDrawer}>
        <Link to="/contact">{translatedTexts.contact || textsToTranslate.contact}</Link>
      </Menu.Item>
      <Menu.Item key="6" icon={<FileSearchOutlined />} onClick={closeDrawer}>
        <Link to="/quotation">{translatedTexts.getQuote || textsToTranslate.getQuote}</Link>
      </Menu.Item>
      <Menu.Item key="7" icon={<SunOutlined />} onClick={closeDrawer}>
        <Link to="/solar-calculation">{translatedTexts.getSolarCalculation || textsToTranslate.getSolarCalculation}</Link>
      </Menu.Item>
      <Menu.Item
            style={{
              background: "transparent",
            }}
          >
            <Dropdown overlay={languageMenu} trigger={["click"]}>
              <Button icon={<GlobalOutlined />}>Language</Button> 
            </Dropdown>
          </Menu.Item>
    </Menu>
  </Drawer>
);

export default DrawerMenu;
