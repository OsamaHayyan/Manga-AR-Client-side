module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["https://api.egymanga.me/"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.egymanga.me",
      },
    ],
  },
  output: "standalone",
};
