import {StyleSheet} from 'react-native';
import {colors} from '../../../themes';
import {scaleSize, scaleFont} from '../../../themes/mixins';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.listBackground,
  },
  deviceCount: {
    fontSize: scaleFont(12),
    fontWeight: '300',
    textAlign: 'center',
    lineHeight: scaleSize(16),
    color: colors.gray03,
  },
  flatList: {
    flex: 1,
    marginTop: scaleSize(14),
    paddingHorizontal: scaleSize(19),
  },
});

export default styles;
