import {StyleSheet} from 'react-native';
import {colors, metrics} from '../../../themes';
import {scaleSize, scaleFont} from '../../../themes/mixins';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingBottom: metrics.unsafeBottomHeight,
  },
  keyboardAwareScrollViewContent: {
    flexGrow: 1,
  },
  imageMap: {
    width: '100%',
  },
  content: {
    marginTop: scaleSize(10),
    marginHorizontal: scaleSize(36),
    flex: 1,
  },
  managementText: {
    fontSize: scaleFont(30),
    textTransform: 'uppercase',
    color: colors.white,
    textAlign: 'center',
  },
  formContainer: {
    flex: 1,
    width: '100%',
  },
  userNameInput: {
    marginTop: scaleSize(40),
    width: '100%',
  },
  passwordInput: {
    marginTop: scaleSize(20),
    width: '100%',
  },
  forgotPasswordLink: {
    width: '100%',
    marginTop: scaleSize(10),
    textAlign: 'right',
    fontSize: scaleFont(12),
    color: colors.white,
    textDecorationLine: 'underline',
  },
  loginButton: {
    marginBottom: scaleSize(10),
    width: '100%',
  },
  signupLink: {
    marginBottom: scaleSize(40),
    fontSize: scaleFont(12),
    width: '100%',
    color: colors.white,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  copyrightText: {
    marginBottom: scaleSize(15),
    fontSize: scaleFont(12),
    width: '100%',
    color: colors.white,
    textAlign: 'center',
  },
});

export default styles;
