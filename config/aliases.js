const fs = require('fs');
const path = require('path');
const paths = require('./paths');
const resolve = require('resolve');

// NOTE: duplicated with `getModules` in ./modules.js
function getCompilerOptions() {
  const hasTsConfig = fs.existsSync(paths.appTsConfig);

  if(!hasTsConfig) {
    throw new Error('You don\'t have a tsconfig.json.');
  }

  const ts = require(resolve.sync('typescript', {
    basedir: paths.appNodeModules,
  }));

  const config = ts.readConfigFile(paths.appTsConfig, ts.sys.readFile).config || {};
  return config.compilerOptions || {};
}

function getAliases() {
  const { baseUrl, paths: tsPaths } = getCompilerOptions();

  if(!baseUrl) {
    return {};
  }

  const baseUrlResolved = path.resolve(paths.appPath, baseUrl);

  if(path.relative(paths.appPath, baseUrlResolved) !== '') {
    return {};
  }

  return Object.keys(tsPaths).reduce((cfg, key) => {
    cfg[key] = path.resolve(__dirname, `../${tsPaths[key][0]}`);
    return cfg;
  }, {});
}

module.exports = getAliases();
