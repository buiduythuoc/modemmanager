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
    paddingTop: scaleSize(42),
    borderTopLeftRadius: scaleSize(25),
    borderTopRightRadius: scaleSize(25),
    backgroundColor: colors.white,
  },
  labelStyle: {
    fontSize: scaleFont(14),
    color: colors.gray01,
  },
  modemNameInput: {
    marginTop: scaleSize(37),
    width: '100%',
  },
  domainNameInput: {
    marginTop: scaleSize(20),
    width: '100%',
  },
  portInput: {
    marginTop: scaleSize(20),
    width: '100%',
  },
  userNameInput: {
    marginTop: scaleSize(20),
    width: '100%',
  },
  passwordInput: {
    marginTop: scaleSize(20),
    width: '100%',
  },
  saveButton: {
    marginTop: scaleSize(29),
    width: '100%',
  },
});

export default styles;
