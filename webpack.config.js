const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const yaml = require('js-yaml');
const { COMPATIBILITY, PORT, UNCSS_OPTIONS, PATHS } = loadConfig();

function loadConfig() {
  let ymlFile = fs.readFileSync('config.yml', 'utf8');
  return yaml.load(ymlFile);
}

 module.exports = {
     entry: {
        a:[
            "src/assets/js/building-blocks/contact-panel.js",
            "src/assets/js/app.js"]
    },
     output: {
         path: path.resolve(__dirname, 'build'),
         filename: 'app.js'
     },
     module: {
         loaders: [
             {
                 test: /\.js$/,
                 loader: 'babel-loader',
                 query: {
                     presets: ['es2015']
                 }
             }
         ]
     }
 };