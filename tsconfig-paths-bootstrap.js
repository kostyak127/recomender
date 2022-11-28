const tsConfigPaths = require('tsconfig-paths');
const { resolve } = require('path');

const { paths } = require('./tsconfig.json').compilerOptions;

const baseUrl = resolve(__dirname, './dist');
tsConfigPaths.register({
  baseUrl,
  paths,
});
