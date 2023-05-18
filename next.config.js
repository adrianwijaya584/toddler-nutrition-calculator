/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  publicRuntimeConfig: {
  
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

module.exports = nextConfig
