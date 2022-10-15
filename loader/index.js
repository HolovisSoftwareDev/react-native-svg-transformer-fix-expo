const fs = require('fs');
const path = require('path');

module.exports = function (source) {
  const reg =
    /import\s+([0-9a-zA-Z\_\$]+)\s+from\s+("|')([^\s\n\;\'\"]+\.svg)("|')/g;
  const repl = `
  const $1 = __ReactNativeSvgLoader(import($2$3$4));
  `;

  let js = source;

  if (reg.test(js)) {
    let svgrrc = '{}';

    try {
      svgrrc = fs.readFileSync(path.resolve(__dirname, '../../../.svgrrc'));
    } catch (error) {
      console.warn('.svgrrc file not exists.');
    }

    js = `
       const __ReactNativeSvgLoader = require('react-native-svg-transformer-fix-expo').default(${svgrrc});
        ${js}
        `.replace(reg, repl);
  }

  return js;
};
