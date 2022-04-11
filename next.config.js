const withPWA = require('next-pwa')

module.exports = withPWA({
  webpackDevMiddleware: config => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    }
    return config
  },
  pwa: {
    dest: "public",
  },
  images: {
    domains: ["maps.googleapis.com", "lh3.googleusercontent.com"],
  },
  reactStrictMode: true
})
