import {Dimensions, Platform, PixelRatio} from 'react-native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
// based on iPhone 8's scale
const widthScale = SCREEN_WIDTH / 375;
const heightScale = SCREEN_HEIGHT / 667;

export default class MetricHelper {
  static normalize = (size, based = 'width') => {
    const newSize = based === 'height' ? size * heightScale : size * widthScale;
    if (Platform.OS === 'ios') {
      return Math.round(PixelRatio.roundToNearestPixel(newSize));
    } else {
      return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
    }
  };
}
