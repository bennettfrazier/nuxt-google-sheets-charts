export default {
  target: 'static',
  head: {
    title: 'Google Sheets Budget Forecast Tool',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Inter:wght@500;700&display=swap',
      },
    ],
  },
  css: [],
  plugins: [{ src: '~plugins/vue-echarts', mode: 'client' }],
  components: true,
  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/stylelint-module'],
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/proxy',
    '@nuxt/http',
    '@nuxtjs/style-resources',
  ],
  proxy: {
    '/sheets': {
      target: 'http://docs.google.com/spreadsheets/d/',
      changeOrigin: true,
      pathRewrite: {
        '^/sheets': '/',
      },
    },
  },
  styleResources: {
    scss: ['assets/scss/_breakpoints.scss', 'assets/scss/_variables.scss'],
  },
  build: {
    transpile: ['vue-echarts', 'resize-detector'],
  },
}
