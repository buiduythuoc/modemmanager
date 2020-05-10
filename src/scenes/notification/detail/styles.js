import {StyleSheet} from 'react-native';
import {colors, metrics} from '../../../themes';
import {scaleSize, scaleFont} from '../../../themes/mixins';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    paddingHorizontal: metrics.baseMargin,
  },
  time: {
    fontSize: scaleFont(10),
    lineHeight: scaleSize(14),
    color: colors.gray02,
  },
  title: {
    marginTop: scaleSize(12),
    fontSize: scaleFont(18),
    lineHeight: scaleSize(25),
    color: colors.black,
    fontWeight: 'bold',
  },
  description: {
    marginTop: scaleSize(12),
    fontSize: scaleFont(14),
    lineHeight: scaleSize(19),
    color: colors.gray02,
  },
});

export default styles;
