import 'antd/dist/reset.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './styles.css';
import App from './App';
import { ConfigProvider } from 'antd';
import NetworkStatus from './components/NetworkStatus';
// import store from './store';
// import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ConfigProvider>
    <NetworkStatus />
    <App />
  </ConfigProvider>,
);
