const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

const LIBRARY_NAME = "Threestrap";
const PATHS = {
  entryPoint: path.resolve(__dirname, "src/index.js"),
  bundles: path.resolve(__dirname, "build"),
};

const config = {
  entry: {
    threestrap: [PATHS.entryPoint],
    "threestrap.min": [PATHS.entryPoint],
  },
  externals: {
    three: "THREE",
    "three/src/core/EventDispatcher.js": "THREE",
    "three/src/renderers/WebGL1Renderer.js": "THREE",
    "three/src/scenes/Scene.js": "THREE",
    "three/src/cameras/PerspectiveCamera.js": "THREE",
  },

  // The output defines how and where we want the bundles. The special value
  // `[name]` in `filename` tell Webpack to use the name we defined above. We
  // target a UMD and name it MyLib. When including the bundle in the browser it
  // will be accessible at `window.MyLib`
  output: {
    path: PATHS.bundles,
    filename: "[name].js",
    libraryTarget: "umd",
    library: LIBRARY_NAME,
    umdNamedDefine: true,
  },
  resolve: {
    extensions: [".js"],
  },
  // Activate source maps for the bundles in order to preserve the original
  // source when the user debugs the application
  devtool: "source-map",
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.min\.js$/,
      }),
    ],
  },
};

module.exports = config;
