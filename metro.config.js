const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

['js', 'jsx', 'json', 'ts', 'tsx', 'cjs', 'mjs']
  .forEach((ext) => {
    if (config.resolver.sourceExts.indexOf(ext) === -1) {
      config.resolver.sourceExts.push(ext);
    }
  });

['glb', 'gltf', 'png', 'jpg'].forEach((ext) => {
  if (config.resolver.assetExts.indexOf(ext) === -1) {
    config.resolver.assetExts.push(ext);
  }
});

module.exports = withNativeWind(config, { input: './global.css' });
