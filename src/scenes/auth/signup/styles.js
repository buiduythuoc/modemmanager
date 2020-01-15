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
  navHeader: {
    marginLeft: scaleSize(-72),
  },
  managementText: {
    height: scaleSize(41),
    marginTop: scaleSize(59),
    fontSize: scaleFont(30),
    lineHeight: scaleSize(40),
    textTransform: 'uppercase',
    color: colors.white,
  },
  emailInput: {
    marginTop: scaleSize(42),
    width: '100%',
  },
  userNameInput: {
    marginTop: scaleSize(29),
    width: '100%',
  },
  passwordInput: {
    marginTop: scaleSize(27),
    width: '100%',
  },
  signupButton: {
    marginTop: scaleSize(36),
    width: '100%',
  },
  copyrightText: {
    marginTop: scaleSize(71),
    fontSize: scaleFont(12),
    width: '100%',
    color: colors.white,
    textAlign: 'center',
  },
});

export default styles;
