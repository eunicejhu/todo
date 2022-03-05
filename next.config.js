const path = require("path");
const { merge } = require("webpack-merge");

module.exports = {
  reactStrictMode: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Important: return the modified config
    const overwrittenConf = {
      resolve: {
        alias: {
          src: path.resolve(__dirname, "src"),
        },
      },
    };
    return merge(config, overwrittenConf);
  },
};
