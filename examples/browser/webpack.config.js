const webpack = require("webpack");

module.exports = {
  // rest of the webpack config
  resolve: {
    // ... rest of the resolve config
    fallback: {
      process: require.resolve("process/browser"),
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
      buffer: require.resolve("buffer/"),
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ],
};
