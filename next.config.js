module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["http://localhost:8080", "localhost"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080",
      },
    ],
  },
};
