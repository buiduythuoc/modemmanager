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
  },
  flatListContainer: {
    paddingHorizontal: scaleSize(20),
    paddingTop: scaleSize(20),
  },
});

export default styles;
