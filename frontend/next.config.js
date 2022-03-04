/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [process.env.NEXT_PUBLIC_BASE_API_URL, "localhost"],
  },
}

module.exports = nextConfig
