import {StyleSheet} from 'react-native';
import {colors} from '../../themes';
import {scaleSize} from '../../themes/mixins';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.listBackground,
  },
  content: {
    flex: 1,
    marginTop: scaleSize(-65),
    paddingHorizontal: scaleSize(37),
    alignItems: 'center',
  },
  labelInput: {
    color: colors.gray01,
  },
  userNameInput: {
    width: '100%',
    marginTop: scaleSize(20),
  },
  passwordInput: {
    width: '100%',
    marginTop: scaleSize(20),
  },
  expiredAtInput: {
    width: '100%',
    marginTop: scaleSize(20),
  },
  updateButton: {
    width: '100%',
    marginTop: scaleSize(28),
  },
});

export default styles;
