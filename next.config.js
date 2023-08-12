module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      process.env.NEXT_PUBLIC_HOSTURL,
      process.env.NEXT_PUBLIC_IMAGEHOST,
    ],
  },
  output: "standalone",
};
