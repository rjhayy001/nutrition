import colors from 'vuetify/es5/util/colors'

export default {
  ssr: false,
  target: 'static',
  head: {
    titleTemplate: '',
    title: 'Nutrition',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700&display=swap' },
    ]
  },
  css: [
    '~assets/scss/main.scss',
    '~assets/scss/imports.scss',
  ],
  plugins: [
    { src: '~plugins/vee-validate', ssr: false },
    { src: '~plugins/i18n', ssr: false },
    { src: '~plugins/components/vue-fragment', ssr: true },
    { src: '~plugins/components/vue-notification', ssr: true },
    { src: '~mixins/globalMixin', ssr: true },
  ],
  components: false,
  buildModules: [
    '@nuxtjs/vuetify',
    '@nuxtjs/moment'
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/i18n',
    '@nuxtjs/auth-next'
  ],
  i18n: {
    langDir: 'locales/',
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.js' },
      { code: 'fr', iso: 'fr-FR', file: 'fr.js' },
    ],
    defaultLocale: 'en',
    fallbackLocale: 'en',
    strategy: 'no_prefix',
    lazy: true,
    loadLanguagesAsync: true,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
    },
  },
  auth: {
    redirect: {
      login: '/login',
      home: '/dashboard',
    },
    strategies: {
      laravelSanctum: {
        provider: 'laravel/sanctum',
        url: process.env.BASE_URL,
        endpoints: {
          login: { url: `/admin/api/login`, method: 'post' },
          logout: { url: `/admin/api/logout`, method: 'post' },
          user: { url: `/admin/api/admin-details`, method: 'get' }
        }
      },
    },
  },
  axios: {
    credentials: true,
    baseURL: process.env.API_ENDPOINT,
  },
  vuetify: {
    treeShake: true,
    customVariables: ['~/assets/variables.scss'],
    font: {
      family: 'Montserrat'
    },
    theme: {
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        light: {
          primary: '#7c94de',
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: '#2cbc76'
        }
      }
    }
  },
  router: {
    middleware: ['auth'],
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'login',
        path: '/login',
        component: resolve(__dirname, 'pages/authentication/login.vue')
      })
    }
  },
  build: {
    transpile: [
      'vee-validate',
      "vee-validate/dist/rules"
    ],
  }
}
