const { environment } = require('@rails/webpacker')

const webpack = require('webpack')
const dotenv = require('dotenv')

const dotenvFiles = [
  '.env'
];

function loadEnv() {
  dotenvFiles.forEach((dotenvFile) => {
    dotenv.config({ path: dotenvFile, silent: true });
  });
}

loadEnv();

environment.plugins.append('Provide', new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery',
  Popper: ['popper.js', 'default']
}))

environment.plugins.append('dotenv', new webpack.EnvironmentPlugin(process.env))

module.exports = environment
