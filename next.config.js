module.exports = {
  images: {
    domains: [
      "testspacefile.fra1.cdn.digitaloceanspaces.com",
      "c1.wallpaperflare.com",
    ],
  },
  env: {
    BASE_URL: "http://localhost:3000",
    TINY_API_KEY: process.env.TINY_API_KEY,
    PARSER_KEY: process.env.PARSER_KEY,
    JWT: process.env.JWT,
  },
};
