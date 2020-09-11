const TerserPlugin = require('terser-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
export default {
  mode: 'spa',
  target: 'static',
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
    color: '#3273dc',
    height: '5px'
  },
  loadingIndicator: {
    name: 'circle',
    color: '#3273dc',
    background: 'white'
  },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/css/page_trans.scss',
    '~/assets/css/mbr/mbr-additional.css',
    '~/assets/css/mbr/style.css',
    '~/assets/css/mbr/mobirise-icons.css',
    '~/assets/css/fonts/font_face.css',
  ],
  styleResources: {
    // scss: ['~/assets/css/*.scss', '~/assets/css/**/*.scss']
  },
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
      use: [
        isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
        'css-loader', 'sass-loader',],
    },
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/axios', ssr: false },
    { src: '~/plugins/vue_native', ssr: false },
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
    '@nuxt/content',
    // 'nuxt-payload-extractor',
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
      'markdown-it-highlightjs',
      'markdown-it-github-preamble',
      'markdown-it-table-of-contents',

    ],
    injected: true,
  },
  // router config
  router: {
    routeNameSplitter: '/',
    extendRoutes(routes, resolve) {
      var proj_doc = {
        name: "doc-proj",
        path: '/doc/:project_name',
        components: {
          default: resolve(__dirname, 'pages/doc.vue'),
          // modal: resolve(__dirname, 'pages/doc/_project_name.vue')
        }
      };
      routes.push( proj_doc );
    }
  },


  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    proxy: true,
    baseUrl: "https://stvchm9703.github.io/"

  },

  content: {},

  proxy: {
    // '/api': { target: 'http://0.0.0.0:8080', },
    // '/md': { target: 'http://0.0.0.0:3000' },
    '/host_md/': {
      target: 'https://raw.githubusercontent.com/Stvchm9703/Stvchm9703.github.io/master/',
      pathRewrite: { '^/host_md/': '' }
    },
    '/projMD': { target: 'https://raw.githubusercontent.com/Stvchm9703/' }
  },
  vue: {
    config: {
      productionTip: false,
      devtools: true,
    }
  },
  /*
  ** Build configuration
  */
  build: {
    analyze: true,
    minifyCSS: true,
    minifyJS: true,
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
    vendor: ['vuex', 'axios'],
    filenames: {
      app: ({ isDev }) => '[name].js',
      chunk: ({ isDev }) => '[name].js',
      css: ({ isDev }) => '[name].css',
      img: ({ isDev }) => 'img/[path][name].[ext]',
      font: ({ isDev }) => 'fonts/[name].[ext]',
      video: ({ isDev }) => 'videos/[name].[ext]'
    },
    /** 
     * {
      app: ({ isDev }) => isDev ? '[name].js' : '[contenthash].js',
      chunk: ({ isDev }) => isDev ? '[name].js' : '[contenthash].js',
      css: ({ isDev }) => isDev ? '[name].css' : '[contenthash].css',
      img: ({ isDev }) => isDev ? '[path][name].[ext]' : 'img/[contenthash:7].[ext]',
      font: ({ isDev }) => isDev ? '[path][name].[ext]' : 'fonts/[contenthash:7].[ext]',
      video: ({ isDev }) => isDev ? '[path][name].[ext]' : 'videos/[contenthash:7].[ext]'
    }
     */

    transpile: ['@stylelib', 'swiper', 'dom7',],
    optimization: {
      minimize: true,
      splitChunks: {
        chunks: 'initial',
        automaticNameDelimiter: '.',
        name: undefined,
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            // cacheGroupKey here is `commons` as the key of the cacheGroup
            name: 'common',
            chunks: 'initial',
          },
          vendor: {
            test: /[\\/]node_modules[\\/](vue|vuex|nuxt|vue-router)[\\/]/,
            name: 'vendor',
            chunks: 'initial',
          }
        }
      },
      minimizer: [
        new TerserPlugin({
          sourceMap: false, // Must be set to true if using source-maps in production
          terserOptions: {
            output: {
              comments: /@license/i,
            },
            compress: {
              drop_console: !isDev,
            },
          },
        }),
      ],
    },

  },
  buildModules: [
    // With options
    ['@nuxtjs/imagemin', {
      /* module options */
      imageminOptions: {
        plugins: [
          // Name
          ['gifsicle', { interlaced: true }],
          // Name with options
          ["mozjpeg", { quality: 80 }],
          ['jpegtran', { progressive: true }],
          ['optipng', { optimizationLevel: 5 }],
          ['svgo', { plugins: [{ removeViewBox: false }] }],
          // Full package name
          ["imagemin-svgo",
            { plugins: [{ removeViewBox: false, },], },
          ],
        ],
      },
    }, '@nuxtjs/style-resources']
  ],
  generate: {
    exclude: [
      /^\/test/,
      /^\/example/
    ],
  },
  // ignorePrefix: isDev ? [] : ['**/*.test.*','pages/test/*.vue'],
  ignoreOptions: {
    ignorecase: false
  },
}
