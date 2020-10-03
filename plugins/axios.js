const requestMap = [
  {
    name: '/page_io',
    target: 'https://raw.githubusercontent.com/Stvchm9703/Stvchm9703.github.io.page/master/',
    devServer: 'http://127.0.0.1:8081',
    prodServer: 'https://raw.githubusercontent.com/Stvchm9703/Stvchm9703.github.io.page/master',
  },
  {
    name: '/gh_resx',
    target: 'https://raw.githubusercontent.com/',
    devServer: 'http://127.0.0.1:8080',
    prodServer: 'https://raw.githubusercontent.com'
  },
  {
    name: '/gh_api',
    target: 'https://api.github.com/',
    devServer: 'http://127.0.0.1:9170',
    prodServer: 'https://api.github.com',
  }
]
const isDev = process.env.NODE_ENV === 'development';

export default function ({ $axios, redirect, app }, inject) {
  //Authorization
  $axios.setHeader('Content-Type', 'application/json');

  $axios.onRequest(config => {

    for (var key in Object.keys(requestMap)) {
      if (config.url.includes(requestMap[key].name)) {
        if (isDev) {
          config.baseURL = requestMap[key].devServer;
        } else {
          config.baseURL = requestMap[key].prodServer;
        }
        config.url = config.url.replace(requestMap[key].name, '');
        break;
      }
      else if (config.url.includes(requestMap[key].target) && isDev) {
        // console.log('isDev ', isDev);
        config.baseURL = requestMap[key].devServer;
        config.url = config.url.replace(requestMap[key].target, '');
        config.url = config.url.endsWith('/') ? config.url.slice(0, -1)
          : config.url;
        // console.log('config :' ,config);
        break;
      }
    }
    // console.log('config map after:', config);

  });
}


