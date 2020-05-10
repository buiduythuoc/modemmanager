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
    marginHorizontal: scaleSize(36),
    flex: 1,
  },
  navBar: {
    position: 'absolute',
    top: metrics.statusBarHeight,
    left: 0,
    right: 0,
  },
  managementText: {
    fontSize: scaleFont(30),
    textTransform: 'uppercase',
    textAlign: 'center',
    color: colors.white,
  },
  formContainer: {
    flex: 1,
    width: '100%',
  },
  emailInput: {
    marginTop: scaleSize(40),
    width: '100%',
  },
  userNameInput: {
    marginTop: scaleSize(40),
    width: '100%',
  },
  passwordInput: {
    marginTop: metrics.largeBaseMargin,
    width: '100%',
  },
  roleInput: {
    marginTop: metrics.largeBaseMargin,
    width: '100%',
  },
  signupButton: {
    marginBottom: scaleSize(68),
    width: '100%',
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
