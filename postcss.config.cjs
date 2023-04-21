const purgecss = require('@fullhuman/postcss-purgecss');

const plugins = [];

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    purgecss({
      content: [
        './index.html',
        './src/**/*.tsx',
        './src/**/*.ts',
        './src/**/*.js',
        './src/**/*.jsx',
      ],
    })
  );
}

module.exports = {
  plugins: [],
};
