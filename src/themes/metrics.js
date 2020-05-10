import {Dimensions, Platform} from 'react-native';
import {scaleSize} from '@themes/mixins';

const {width, height} = Dimensions.get('window');
const IS_IPHONE_X = height === 812 || height === 896;

const metrics = {
  smallMargin: scaleSize(8),
  baseMargin: scaleSize(16),
  largeBaseMargin: scaleSize(20),
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  statusBarHeight: Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0,
  unsafeBottomHeight: Platform.OS === 'ios' ? (IS_IPHONE_X ? 34 : 0) : 0,
  navBarHeight: Platform.OS === 'ios' ? 44 : 56,
  tabBarHeight: scaleSize(50),
  buttonRadius: 4,
  sendButtonMarginBottom: Platform.OS === 'ios' && IS_IPHONE_X ? 24 : 0,
};

export default metrics;
