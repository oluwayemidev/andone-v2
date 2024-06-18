import React from 'react';
import { Menu } from 'antd';

const LanguageMenu = ({ setLanguage, closeDrawer }) => (
  <Menu>
    <Menu.Item key="1" onClick={() => { setLanguage("en"); closeDrawer(); }}>
      English
    </Menu.Item>
    <Menu.Item key="2" onClick={() => { setLanguage("es"); closeDrawer(); }}>
      Español
    </Menu.Item>
    <Menu.Item key="3" onClick={() => { setLanguage("zh"); closeDrawer(); }}>
      中文
    </Menu.Item>
    <Menu.Item key="4" onClick={() => { setLanguage("ar"); closeDrawer(); }}>
      العربية
    </Menu.Item>
    <Menu.Item key="5" onClick={() => { setLanguage("it"); closeDrawer(); }}>
      Italiano
    </Menu.Item>
    {/* Add more languages as needed */}
  </Menu>
);

export default LanguageMenu;
