import {StyleSheet} from 'react-native';
import {colors} from '../../../themes';
import {scaleSize} from '../../../themes/mixins';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.listBackground,
  },
  flatList: {
    marginHorizontal: scaleSize(10),
    marginTop: scaleSize(10),
    flex: 1,
  },
});

export default styles;
