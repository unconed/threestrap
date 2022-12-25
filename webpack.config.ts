import * as path from "node:path"
import TerserPlugin from 'terser-webpack-plugin'
import type { Configuration } from "webpack"
import * as glob from "glob"

const LIBRARY_NAME = "Threestrap";
const PATHS = {
  entryPoint: path.resolve(__dirname, "src/index.js"),
  libraryBundles: path.resolve(__dirname, "build"),
  testBundle: path.resolve(__dirname, "build_tests"),
  testFiles:  glob.sync("./test/**/*.spec.js"),
};

const umdBase = (path: string): Configuration => ({
  // The output defines how and where we want the bundles. The special value
  // `[name]` in `filename` refers to the keys of `entry`. With a UMD target,
  // when including the bundle in a browser, the bundle will be available as
  // `window.entryKeyName`.
  output: {
    path,
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
});

const library: Configuration = {
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
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.min\.js$/,
      }),
    ],
  },
}

const configs: Configuration[] = [
  {
    ...umdBase(PATHS.libraryBundles),
    ...library,
    name: "threestrap",
  },
  {
    ...umdBase(PATHS.testBundle),
    name: "tests",
    mode: "development",
    devtool: "eval",
    entry: {
      tests: PATHS.testFiles
    }
  }
]

export default configs
