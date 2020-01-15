import {StyleSheet} from 'react-native';
import {colors} from '../../../themes';
import {scaleSize} from '../../../themes/mixins';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.listBackground,
  },
  addButton: {
    marginTop: scaleSize(-30),
    backgroundColor: colors.addButton,
    borderColor: colors.addButton,
  },
  flatList: {
    flex: 1,
    marginTop: scaleSize(36),
    paddingHorizontal: scaleSize(19),
  },
  flatListSeparator: {
    height: scaleSize(10),
  },
});

export default styles;
