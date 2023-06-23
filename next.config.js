module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["https://mymanga.azurewebsites.net/"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mymanga.azurewebsites.net",
      },
    ],
  },
};
