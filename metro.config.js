// const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

// /**
//  * Metro configuration
//  * https://reactnative.dev/docs/metro
//  *
//  * @type {import('@react-native/metro-config').MetroConfig}
//  */
// const config = {};

// module.exports = mergeConfig(getDefaultConfig(__dirname), config);
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false, // Soporte para importaciones dinámicas
        inlineRequires: true, // Habilita la inclusión de requires en línea para mejorar el rendimiento
      },
    }),
    babelTransformerPath: require.resolve('react-native-svg-transformer'), // Ejemplo: Transformador para SVG
  },
  resolver: {
    sourceExts: ['jsx', 'js', 'ts', 'tsx', 'json', 'svg'], // Extensiones de archivo que Metro debe resolver
    assetExts: ['png', 'jpg', 'jpeg', 'gif', 'svg'], // Extensiones de archivo que se consideran activos
  },
  server: {
    port: 8081, // Puerto personalizado para el servidor de Metro
    enhanceMiddleware: (middleware) => {
      // Personaliza el middleware del servidor
      return (req, res, next) => {
        if (req.url.startsWith('/api')) {
          // Ejemplo: Redirigir solicitudes a una API
          res.end('API response');
        } else {
          middleware(req, res, next);
        }
      };
    },
  },
  reporter: {
    log: console.log, // Habilita logs detallados en Metro
    info: console.info,
    warn: console.warn,
    error: console.error,
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
