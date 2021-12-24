const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const generalConfig = {
  watchOptions: {
    aggregateTimeout: 600,
    ignored: /node_modules/,
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
      cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, './dist')],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};

const nodeConfig = {
  entry: './src/index.ts',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js',
    library: {
      type: 'umd',
      export: 'default',
    },
  },
};

const browserConfig = {
  entry: './src/index.ts',
  target: 'web',
  output: {
    path: path.resolve(__dirname, './dist'),
    library: {
      name: 'Threestrap',
      type: 'umd',
      export: 'default',
    },
    filename: 'browser.js',
    globalObject: 'this',
    umdNamedDefine: true,
  },
};

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    generalConfig.devtool = 'cheap-module-source-map';
  } else if (argv.mode === 'production') {
  } else {
    throw new Error('Specify env');
  }

  return [nodeConfig, browserConfig].map((config) => ({
    ...generalConfig,
    ...config,
  }));
};
