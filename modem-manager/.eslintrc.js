module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ['import'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        alias: {
          _assets: './src/assets',
          _components: './src/components',
          _atoms: './src/components/atoms',
          _navigation: './src/navigation',
          _scenes: './src/scenes',
          _services: './src/services',
          _themes: './src/themes',
          _utils: './src/utils',
        },
      },
    },
  },
};
