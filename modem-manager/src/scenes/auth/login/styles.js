import {StyleSheet} from 'react-native';
import {colors} from '../../../themes';
import {scaleSize, scaleFont} from '../../../themes/mixins';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  content: {
    position: 'absolute',
    flex: 1,
    top: 0,
    left: scaleSize(36),
    right: scaleSize(36),
    bottom: 0,
    alignItems: 'center',
  },
  managementText: {
    height: scaleSize(41),
    marginTop: scaleSize(212),
    fontSize: scaleFont(30),
    lineHeight: scaleSize(40),
    textTransform: 'uppercase',
    color: colors.white,
  },
  userNameInput: {
    marginTop: scaleSize(38),
    width: '100%',
  },
  passwordInput: {
    marginTop: scaleSize(27),
    width: '100%',
  },
  forgotPasswordLink: {
    width: '100%',
    marginTop: scaleSize(11),
    textAlign: 'right',
    fontSize: scaleFont(12),
    color: colors.white,
    textDecorationLine: 'underline',
  },
  loginButton: {
    marginTop: scaleSize(48),
    width: '100%',
  },
  signupLink: {
    marginTop: scaleSize(9),
    fontSize: scaleFont(12),
    width: '100%',
    color: colors.white,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  copyrightText: {
    marginTop: scaleSize(42),
    fontSize: scaleFont(12),
    width: '100%',
    color: colors.white,
    textAlign: 'center',
  },
});

export default styles;
