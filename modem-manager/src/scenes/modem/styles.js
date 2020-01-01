import {StyleSheet} from 'react-native';
import {colors} from '../../themes';
import {scaleSize, scaleFont} from '../../themes/mixins';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addButton: {
    marginTop: scaleSize(-30),
    backgroundColor: colors.addButton,
    borderColor: colors.addButton,
  },
});

export default styles;
