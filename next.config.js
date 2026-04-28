/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    unoptimized: true
  },
  env: {
    NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-FLEV55JTJJ'
  }
}