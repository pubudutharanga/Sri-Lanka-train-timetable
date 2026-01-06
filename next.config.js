/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Allow loading images from public folder and remote if needed
    domains: []
  }
}
module.exports = nextConfig
