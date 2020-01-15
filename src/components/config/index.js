import {Text, View, ViewPropTypes as RNViewPropTypes} from 'react-native';

const TextPropTypes = Text.propTypes;
const ViewPropTypes = RNViewPropTypes || View.propTypes;

export {ViewPropTypes, TextPropTypes};
