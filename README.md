# react-native-svg-transformer-fix-expo
 Module to temporarily correct the error of the react-native-svg-transformer module in the latest versions of the Expo web sdk
 
## how to configure
 
 After installing the react-native-svg-transformer module and configuring it correctly, install the module to your expo project using npm or yarn
 
 ```
 yarn add lucassouza16/react-native-svg-transformer-fix-expo#latest
 ```
 
 Add the loader to your webpack.config.js file, if it doesn't exist, create it at the root of your expo project
 
```js
const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const path = require('path');

module.exports = async function (env, argv) {
    const config = await createExpoWebpackConfigAsync(env, argv);

    config.module.rules.push({
        test: /\.(js|ts|jsx|tsx)$/,
        exclude: path.resolve(__dirname, "node_modules"),
        use: ['react-native-svg-transformer-fix-expo/loader'],
    });

    return config;
};
```
