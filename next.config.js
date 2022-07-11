const { redirect } = require('next/dist/server/api-utils')

const API_KEY = process.env.NEXT_PUBLIC_API_KEY

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: `/api/movies`,
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=:page`
      }
    ]
  }
}

module.exports = nextConfig
