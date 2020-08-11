
export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */

  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  // loading: { color: '#fff' },
  loading: {
    color: '#FF8C00',
    height: '5px'
  },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/css/page_trans.css',
    '~/assets/css/mbr/mbr-additional.css',
    '~/assets/css/mbr/style.css',
    '~/assets/css/mbr/mobirise-icons.css',
    '~/assets/css/fonts/font_face.css'
  ],
  pageTransition: {
    name: 'page',
    mode: 'out-in',
    beforeEnter(el) {
      // console.log('Before enter...');
    }
  },
  rules: [
    {
      test: /\.s[ac]ss$/i,
      use: ['style-loader', 'css-loader', 'sass-loader',],
    },
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/axios',
    '~/plugins/vue_native',
  ],
  /*
  ** Nuxt.js dev-modules
  */
  // devModules: [],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/modules/tree/master/packages/bulma
    'nuxt-buefy',
    '@nuxtjs/bulma',
    // 'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/markdownit',
    '@nuxtjs/proxy',
  ],
  markdownit: {
    preset: 'default',
    linkify: true,
    breaks: true,
    use: [
      'markdown-it-div',
      'markdown-it-attrs',
      'markdown-it-multimd-table',
      'markdown-it-task-lists',
      'markdown-it-github-headings',
      // 'markdown-it-highlightjs',
      'markdown-it-github-preamble',
      'markdown-it-table-of-contents',

    ],
    injected: true
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    proxy: true,
    baseUrl: "https://stvchm9703.github.io/"
  },
  proxy: {
    '/api': { target: 'http://0.0.0.0:8080', },
    // '/md': { target: 'http://0.0.0.0:3000' },
    '/host_md/': {
      target: 'https://raw.githubusercontent.com/Stvchm9703/Stvchm9703.github.io/master/',
      pathRewrite: { '^/host_md/': '' }
    },
    '/projMD': { target: 'https://raw.githubusercontent.com/Stvchm9703/' }
  },
  /*
  ** Build configuration
  */
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    publicPath: '/static/',
    indicator: false,
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.md$/,
        use: ['raw-loader']
      });
    },
    extractCSS: true,
    vendor: ['vuex', 'axios']
  }
}
