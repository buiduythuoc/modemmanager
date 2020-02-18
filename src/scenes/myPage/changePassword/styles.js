import {StyleSheet} from 'react-native';
import {colors} from '../../../themes';
import {scaleSize, scaleFont} from '../../../themes/mixins';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray06,
  },
  content: {
    flex: 1,
    paddingLeft: scaleSize(30),
    paddingRight: scaleSize(30),
    paddingTop: scaleSize(47),
    borderTopLeftRadius: scaleSize(25),
    borderTopRightRadius: scaleSize(25),
    backgroundColor: colors.white,
  },
  labelStyle: {
    fontSize: scaleFont(14),
    color: colors.gray01,
  },
  oldPasswordInput: {
    width: '100%',
  },
  newPasswordInput: {
    marginTop: scaleSize(20),
    width: '100%',
  },
  confirmPasswordInput: {
    marginTop: scaleSize(20),
    width: '100%',
  },
  input: {
    color: colors.black,
  },
  saveButton: {
    marginTop: scaleSize(29),
    width: '100%',
  },
});

export default styles;
