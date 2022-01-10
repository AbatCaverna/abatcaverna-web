const withPWA = require('next-pwa')

module.exports = withPWA({
  pwa: {
    dest: "public",
  },
  images: {
    domains: ["maps.googleapis.com"],
  },
  reactStrictMode: true
})
