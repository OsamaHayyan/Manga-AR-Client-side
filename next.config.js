module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [process.env.NEXT_PUBLIC_HOSTURL, "https://iili.io"],
    remotePatterns: [
      {
        protocol: process.env.NEXT_PUBLIC_PROTOCOL1,
        hostname: process.env.NEXT_PUBLIC_HOSTNAME1,
      },
      {
        protocol: process.env.NEXT_PUBLIC_PROTOCOL2,
        hostname: process.env.NEXT_PUBLIC_HOSTNAME2,
      },
    ],
  },
  output: "standalone",
};
