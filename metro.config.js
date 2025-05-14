const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const path = require('path'); // Bu satırı ekleyin

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  resolver: {
    extraNodeModules: new Proxy(
      {},
      {
        get: (target, name) => {
          // Bu, projenizin node_modules klasörüne doğru bir şekilde işaret eder
          return path.join(__dirname, `node_modules/${name}`);
        },
      },
    ),
  },
  watchFolders: [
    path.resolve(__dirname), // Proje kök dizinini izle
    // Eğer monorepo yapınız varsa veya dışarıdan linklenmiş paketleriniz varsa
    // buraya ek yollar ekleyebilirsiniz. Örneğin:
    // path.resolve(__dirname, '../another-package'),
  ],
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
