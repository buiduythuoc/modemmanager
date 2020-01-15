import {StyleSheet} from 'react-native';
import {colors} from '../../../themes';
import {scaleSize} from '../../../themes/mixins';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.listBackground,
  },
  flatList: {
    flex: 1,
    marginTop: scaleSize(-65),
    paddingHorizontal: scaleSize(27),
  },
});

export default styles;
