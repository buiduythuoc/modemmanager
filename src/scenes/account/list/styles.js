import {StyleSheet} from 'react-native';
import {colors, metrics} from '../../../themes';
import {scaleSize, scaleFont} from '../../../themes/mixins';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.listBackground,
  },
  accountCount: {
    fontSize: scaleFont(12),
    fontWeight: '300',
    textAlign: 'center',
    marginTop: scaleSize(15),
    marginBottom: scaleSize(15),
    color: colors.gray03,
  },
  flatList: {
    flex: 1,
    marginHorizontal: metrics.baseMargin,
  },
});

export default styles;
