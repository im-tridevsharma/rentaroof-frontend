module.exports = {
  images: {
    domains: [process.env.SRC_DOMAIN1],
  },
  env: {
    BASE_URL: process.env.BASE_URL,
    TINY_API_KEY: process.env.TINY_API_KEY,
    PARSER_KEY: process.env.PARSER_KEY,
    JWT: process.env.JWT,
  },
};
