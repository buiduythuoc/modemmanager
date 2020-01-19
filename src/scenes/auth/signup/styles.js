import {StyleSheet} from 'react-native';
import {colors} from '../../../themes';
import {scaleSize, scaleFont} from '../../../themes/mixins';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
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
  navHeader: {
    position: 'absolute',
    top: 0,
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
    marginTop: scaleSize(20),
    width: '100%',
  },
  roleInput: {
    marginTop: scaleSize(20),
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
