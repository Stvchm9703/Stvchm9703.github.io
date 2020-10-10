const TerserPlugin = require('terser-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const LodashPlugin = require('lodash-webpack-plugin');
const path = require('path');

export default {
  // mode: 'spa',
  ssr: true,
  target: 'static',
  /*
  ** Headers of the page
  */

  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { hid: 'og:title', property: 'og:title', content: 'Steven Chm - Github Page' },
      { hid: 'og:description', property: 'og:description', content: 'Steven Chm - Github Page and Tech-Blog' },
      { hid: 'og:url', property: 'og:url', content: 'https://stvchm9703.github.io/' },
      { hid: 'og:image', property: 'og:image', content: 'https://avatars2.githubusercontent.com/u/15327054?s=400&u=167a64d9000e6ea245b6807fb4a7a1dab537d35a&v=4' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  pwa: {
    workbox: {
      cleanupOutdatedCaches: true,
      cacheAssets: false, // for /*
      offline: false, // for /_nuxt/* 
      // runtimeCaching : false,
      skipWaiting: false,
      // importScripts: [ 'sw.cli.js' ],
    }
  },
  /*
  ** Customize the progress-bar color
  */
  // loading: { color: '#fff' },
  loading: {
    color: '#f5b656',
    height: '5px'
  },
  loadingIndicator: {
    name: 'folding-cube',
    color: '#f5b656',
    background: '#2b2a5f'
  },
  /*
  ** Global CSS
  */
  css: ['@/assets/css/_all.scss'],
  styleResources: {},
  pageTransition: {
    name: 'page',
    mode: 'out-in',
    beforeEnter(el) { }
  },

  colorMode: {
    preference: 'system', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: 'sv-',
    classSufix: '-mode',
  },
  rules: [
    {
      test: /\.s[ac]ss$/i,
      use: [
        isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
        'css-loader', 'sass-loader',],
      exclude: [
        path.resolve(__dirname, "**/test/*"),
        path.resolve(__dirname, "**/*.test.*"),
      ],
    },
    {
      test: /\.vue$/i,
      exclude: [
        path.resolve(__dirname, "**/test/*.vue"),
        path.resolve(__dirname, "**/*.test.vue"),
      ],
    }
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
    // '@nuxtjs/bulma',
    'nuxt-buefy',
    '@nuxtjs/axios',
    '@nuxtjs/markdownit',
    '@nuxtjs/proxy',
    '@nuxt/content',
    "@nuxtjs/svg",
    '@nuxtjs/onesignal',
    '@nuxtjs/pwa',
    '@nuxtjs/color-mode',
    // 'nuxt-payload-extractor',
  ],
  buefy: { css: false, materialDesignIcons: false },
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
      'markdown-it-emoji',
    ],
    injected: true,
  },
  // router config
  router: {
    routeNameSplitter: '/',
    // extendRoutes(routes, resolve) {
    //   routes.push({
    //     name: 'doc_proj_md',
    //     path: '/doc/:user/:project_name',
    //     component: resolve(__dirname, 'pages/doc/_project_name.vue')
    //   })
    // },

  },
  static: {
    prefix: false
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

  proxy: {},

  vue: {
    config: {
      productionTip: false,
      devtools: isDev,
    }
  },
  /*
  ** Build configuration
  */
  build: {
    analyze: true,
    minifyCSS: true,
    minifyJS: true,
    cache: false,
    splitChunks: {
      layouts: true,
      pages: true,
      commons: true
    },
    postcss: {
      preset: {
        features: {
          customProperties: true
        }
      }
    },
    publicPath: '/_nxt_mod/',
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
        chunks: 'all',
        automaticNameDelimiter: '.',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            // cacheGroupKey here is `commons` as the key of the cacheGroup
            name: (mod) => {
              const packageName = mod.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
              return `npm.${packageName.replace('@', '')}`;
            },
            chunks: 'all',
            enforce: true
          },
          // vendor: {
          //   test: /[\\/]node_modules[\\/](vue|vuex|nuxt|vue-router)[\\/]/,
          //   name: 'vendor',
          //   chunks: 'initial',
          //   enforce: true
          // },
          styles: {
            name: 'styles',
            test: /\.(css|vue)$/,
            chunks: 'all',
            enforce: true
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
    plugins: [
      new LodashPlugin({
        'cloning': true
      }),
    ]
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
          ["mozjpeg", { quality: 60 }],
          ['jpegtran', { progressive: true }],
          ['optipng', { optimizationLevel: 4 }],
          ['svgo', { plugins: [{ removeViewBox: true }] }],
          // Full package name
          ["imagemin-svgo",
            { plugins: [{ removeViewBox: false, },], },
          ],
        ],
        compress: {
          // This will transform your png/jpg into webp.
          webp: true,
          disableOnDevelopment: true,
        },
      },
    }, '@nuxtjs/style-resources']
  ],
  generate: {
    fallback: '404.html',
    exclude: [
      /^\/test/,
      /^\/example/,
      '**/*.test.*',
    ],
  },
  // ignorePrefix: isDev ? [] : ['**/*.test.*','pages/test/*.vue'],
  ignore: ['**/*.test.*', 'pages/test/*.vue'],
  ignoreOptions: {
    ignorecase: false
  },
}
