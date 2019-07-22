module.exports = (api) => {
  api.cache(true);
  return {
    presets: ['@babel/preset-react', ['@babel/preset-env', { modules: false }]],
    plugins: [
      ['@babel/plugin-syntax-dynamic-import'],
      ['@babel/plugin-proposal-object-rest-spread'],
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['@babel/plugin-proposal-class-properties'],
      ['@babel/plugin-proposal-export-default-from'],
      ['@babel/plugin-proposal-export-namespace-from'],
      ['module-resolver', { root: ['./src'], alias: { '@src': './src' } }],
      [
        'babel-plugin-react-docgen',
        { 'handlers:': ['react-docgen-external-proptypes-handler'] },
      ],
    ],
    env: {
      test: {
        plugins: [
          ['@babel/plugin-transform-modules-commonjs'],
          ['@babel/plugin-transform-runtime'],
        ],
      },
    },
  };
};
