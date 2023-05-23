/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  publicRuntimeConfig: {
  
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  typescript: {
    tsconfigPath: '/tsconfig.json'
  },
  rewrites: async ()=> {
    return [
      {
        source: '/api/:path*',
        destination: 'http://54.254.113.229/py/:path*',
      }
    ]
  }
}

const withPWA = require('next-pwa')({
  dest: 'public',
  
})


module.exports = withPWA(nextConfig)
