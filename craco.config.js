// craco.config.js
const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#3A3A8D',
              '@secondary-color': '#E52027',
              '@layout-header-background': '#3A3A8D',
              '@layout-header-height': '64px',
              '@layout-header-padding': '0 24px',
              '@layout-header-color': '#fff',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
