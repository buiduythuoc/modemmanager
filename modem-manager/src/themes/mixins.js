import {Dimensions, PixelRatio} from 'react-native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
// based on iPhone 8's scale
const widthScale = SCREEN_WIDTH / 375;
const heightScale = SCREEN_HEIGHT / 667;

export const scaleSize = size => size * widthScale;

export const scaleFont = size => size * PixelRatio.getFontScale();
