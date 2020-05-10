import {StyleSheet} from 'react-native';
import {colors, metrics} from '../../../themes';
import {scaleSize, scaleFont} from '../../../themes/mixins';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray06,
  },
  content: {
    flex: 1,
    padding: metrics.baseMargin,
    borderTopLeftRadius: scaleSize(25),
    borderTopRightRadius: scaleSize(25),
    backgroundColor: colors.white,
  },
  input: {
    color: colors.black,
  },
  labelStyle: {
    fontSize: scaleFont(14),
    color: colors.gray01,
  },
  modemNameInput: {
    width: '100%',
  },
  domainNameInput: {
    marginTop: metrics.trip,
    width: '100%',
  },
  portInput: {
    marginTop: metrics.largeBaseMargin,
    width: '100%',
  },
  userNameInput: {
    marginTop: metrics.largeBaseMargin,
    width: '100%',
  },
  passwordInput: {
    marginTop: metrics.largeBaseMargin,
    width: '100%',
  },
  updateButton: {
    marginTop: scaleSize(29),
    width: '100%',
  },
});

export default styles;
