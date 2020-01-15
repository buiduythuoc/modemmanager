import {Dimensions, Platform, StatusBar} from 'react-native';
import {scaleSize} from '@themes/mixins';

const {width, height} = Dimensions.get('window');

// Used via Metrics.baseMargin
const metrics = {
  smallMargin: scaleSize(5),
  baseMargin: scaleSize(10),
  doubleBaseMargin: scaleSize(20),
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  statusBarHeight: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
  tabBarHeight: scaleSize(50),
  navBarHeight: Platform.OS === 'ios' ? 64 : 54,
  buttonRadius: 4,
};

export default metrics;
