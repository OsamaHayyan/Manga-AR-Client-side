module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [process.env.NEXT_PUBLIC_HOSTURL],
    remotePatterns: [
      {
        protocol: NEXT_PUBLIC_PROTOCOL,
        hostname: process.env.NEXT_PUBLIC_HOSTNAME,
      },
    ],
  },
  output: "standalone",
};
