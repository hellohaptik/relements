const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.mdx?$/,
        use: ['babel-loader', '@mdx-js/loader'],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|gif)$/,
        loader: 'url-loader?limit=100000',
      },
      {
        test: /\.svg/,
        loader: 'react-svg-loader',
        options: {
          svgo: {
            plugins: [
              { removeTitle: false },
              { mergePaths: false },
              { cleanupIDs: false },
            ],
            floatPrecision: 2,
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.mdx'],
    alias: {
      '@src': path.join(__dirname, '../src'),
      constants: path.join(__dirname, '../src/constants'),
      api: path.join(__dirname, '../src/api'),
      components: path.join(__dirname, '../src/components'),
      constants: path.join(__dirname, '../src/constants'),
      icons: path.join(__dirname, '../src/icons'),
      utils: path.join(__dirname, '../src/utils'),
      decorators: path.join(__dirname, '../src/decorators'),
    },
  },
  externals: {
    jsdom: 'window',
    cheerio: 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': 'window',
    'react/addons': true,
  },
};
