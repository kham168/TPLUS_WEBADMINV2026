const path = require("path");
module.exports = {
  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import "~@assets/scss/global/variables.scss";',
      },
      less: {
        lessOptions: {
          modifyVars: {
            "primary-color": "#1890ff",
            "checkbox-size": "18px",
            "border-radius-base": "6px",
            "input-affix-width": "27px",
          },
          javascriptEnabled: true,
        },
        
      },
    },
  },

  chainWebpack: (config) => {
    const svgRule = config.module.rule("svg");
    svgRule.uses.clear();
    svgRule
      .use("babel-loader")
      .loader("babel-loader")
      .end()
      .use("vue-svg-loader")
      .loader("vue-svg-loader");
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@assets": path.resolve(__dirname, "src/assets"),
      },
    },
  },

  pluginOptions: {
    i18n: {
      locale: 'la',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true,
      includeLocales: false,
      enableBridge: true
    }
  }
};
