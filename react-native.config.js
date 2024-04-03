module.exports = {
  assets: ['./app/assets/fonts/'],
  dependencies: {
    'react-native-config': {
      platforms: {
        ios: null, // this is needed for autolinking
      },
    },
  },
};
