import checkEnvVariables from "./check-env-variables.mjs"

checkEnvVariables()

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  cacheComponents: true,
  ...(process.env.NODE_ENV === "development"
    ? {
      logging: {
        fetches: {
          fullUrl: true,
        },
      },
    }
    : {}),
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "medusa-public-images.s3.eu-west-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "medusa-server-testing.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "medusa-server-testing.s3.us-east-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "data.abysswalker.org",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
}

export default nextConfig