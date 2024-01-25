const withPWA = require('next-pwa')({
  dest: 'public',
})

module.exports = withPWA({
  images: {
    domains: ["maps.googleapis.com", "lh3.googleusercontent.com", "files.stripe.com"],
  },
  reactStrictMode: true
})
