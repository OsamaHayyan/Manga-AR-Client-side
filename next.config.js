module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [process.env.NEXT_PUBLIC_HOSTURL, "iili.io"],
  },
  output: "standalone",
};
