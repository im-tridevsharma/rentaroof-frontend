module.exports = {
  images: {
    domains: [process.env.SRC_DOMAIN1, "images.pexels.com"],
  },
  env: {
    BASE_URL: process.env.BASE_URL,
    TINY_API_KEY: process.env.TINY_API_KEY,
    PARSER_KEY: process.env.PARSER_KEY,
    JWT: process.env.JWT,
    MAP_API_KEY: process.env.MAP_API_KEY,
  },
};
