import {StyleSheet} from 'react-native';
import {colors} from '../../../themes';
import {scaleSize, scaleFont} from '../../../themes/mixins';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.listBackground,
  },
  addButton: {
    marginTop: scaleSize(-30),
    marginHorizontal: scaleSize(19),
    backgroundColor: colors.addButton,
    borderColor: colors.addButton,
  },
  modemCount: {
    fontSize: scaleFont(12),
    fontWeight: '300',
    textAlign: 'center',
    lineHeight: scaleSize(16),
    marginVertical: scaleSize(10),
    color: colors.gray03,
  },

  flatList: {
    flex: 1,
    paddingHorizontal: scaleSize(10),
  },
  flatListSeparator: {
    height: scaleSize(10),
  },
});

export default styles;
