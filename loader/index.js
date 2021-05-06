const fs = require('fs');
const path = require('path');

module.exports = function (source) {

  let svgrrc = '{}'

  try {
    svgrrc = fs.readFileSync(path.resolve(__dirname, '../../../.svgrrc'));
  } catch (error) {
    console.warn(".svgrrc file not exists.");
  }

  const reg = /import\s+([0-9a-zA-Z]+)\s+from\s+("|')([^\s\n\;\'\"]+\.svg)("|')/g
  const repl = `
  import __$1_Base64 from "$3";
  const $1 = __ReactNativeSvgTransformerExpoFix(__$1_Base64);
  `

  let js = source

  if (js.search(reg) != -1) {
    js = (`
       const __ReactNativeSvgTransformerExpoFix = require('react-native-svg-transformer-fix-expo').default(${svgrrc});
        ${js}
        `).replace(reg, repl);
  }

  return js
}
