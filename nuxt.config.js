require('dotenv').config()

export default {
  mode: 'spa',

  modern: true,

  /*
  ** Headers of the page
  */
  head: {
    title: 'Admin | Lausanne eSports',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Backoffice Lausanne Sport eSports' },
      { name: 'msapplication-TileColor', content: "#384168" },
      { name: 'theme-color', content: '#384168' },
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Barlow:300,400,700' },
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.3.1/css/all.css', integrity: 'sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU', crossorigin: 'anonymous' },
      { rel: 'apple-touch-icon', size: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/', size: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', size: '16x16', href: '/favicon-16x16.png' },
      { rel: 'manifest', href: '/site.webmanifest' },
      { rel: 'mask-icon', color: '#384168', href: '/safari-pinned-tab.svg' },
    ],
    bodyAttrs: {
      class: 'font-sans bg-neutral-100',
    },
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3F425D' },

  /*
  ** Global CSS
  */
  css: [
    '@/assets/css/tailwind.css',
    'izitoast/dist/css/iziToast.min.css',
    'simplemde/dist/simplemde.min.css',
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/simple-mde', ssr: false },
    { src: '~/plugins/izitoast', ssr: false },
    { src: '~/plugins/portal' },
    { src: '~/plugins/nuxt-client-init.js', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    '@nuxtjs/axios',
  ],

  axios: {
    credentials: true,
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      const svgRule = config.module.rules.find(rule => rule.test.test('.svg'))

      svgRule.test = /\.(png|jpe?g|gif|webp)$/

      config.module.rules.push({
        test: /\.svg$/,
        loader: 'vue-svg-loader',
      })

      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
  }
}
