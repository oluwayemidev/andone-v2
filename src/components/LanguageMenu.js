import React from 'react';
import { Menu } from 'antd';

const LanguageMenu = ({ setLanguage }) => (
  <Menu>
    <Menu.Item key="1" onClick={() => setLanguage("en")}>
      English
    </Menu.Item>
    <Menu.Item key="2" onClick={() => setLanguage("es")}>
      Español
    </Menu.Item>
    <Menu.Item key="3" onClick={() => setLanguage("zh")}>
      中文
    </Menu.Item>
    <Menu.Item key="4" onClick={() => setLanguage("ar")}>
      العربية
    </Menu.Item>
    <Menu.Item key="5" onClick={() => setLanguage("it")}>
      Italiano
    </Menu.Item>
    {/* Add more languages as needed */}
  </Menu>
);

export default LanguageMenu;
