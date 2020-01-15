module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ['import'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        alias: {
          '@assets': './src/assets',
          '@components': './src/components',
          '@atoms': './src/components/atoms',
          '@navigation': './src/navigation',
          '@scenes': './src/scenes',
          '@services': './src/services',
          '@themes': './src/themes',
          '@helpers': './src/helpers',
        },
      },
    },
  },
};
