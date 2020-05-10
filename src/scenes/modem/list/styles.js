import {StyleSheet} from 'react-native';
import {colors, metrics} from '../../../themes';
import {scaleSize, scaleFont} from '../../../themes/mixins';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.listBackground,
  },
  addButton: {
    marginHorizontal: scaleSize(19),
    backgroundColor: colors.addButton,
    borderColor: colors.addButton,
  },
  navBar: {
    height: scaleSize(100),
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: scaleSize(66),
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: colors.white,
    flex: 1,
    textAlign: 'center',
    fontSize: scaleFont(18),
    fontWeight: '600',
  },
  modemCount: {
    fontSize: scaleFont(12),
    fontWeight: '300',
    textAlign: 'center',
    lineHeight: scaleSize(16),
    marginTop: scaleSize(37),
    marginBottom: scaleSize(10),
    color: colors.gray03,
  },

  flatList: {
    flex: 1,
    paddingHorizontal: metrics.baseMargin,
  },
  flatListSeparator: {
    height: metrics.baseMargin,
  },
});

export default styles;
