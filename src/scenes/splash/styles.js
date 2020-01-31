import {StyleSheet} from 'react-native';
import {colors} from '../../themes';
import {scaleSize} from '../../themes/mixins';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  appIcon: {
    borderRadius: scaleSize(16),
  },
});

export default styles;
