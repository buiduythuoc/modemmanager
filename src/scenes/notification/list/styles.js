import {StyleSheet} from 'react-native';
import {colors, metrics} from '../../../themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.listBackground,
  },
  flatList: {
    flex: 1,
  },
  flatListContainer: {
    paddingHorizontal: metrics.baseMargin,
    paddingTop: metrics.baseMargin,
  },
});

export default styles;
