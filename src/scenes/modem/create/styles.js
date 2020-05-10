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
    paddingHorizontal: metrics.baseMargin,
    borderTopLeftRadius: scaleSize(25),
    borderTopRightRadius: scaleSize(25),
    backgroundColor: colors.white,
  },
  labelStyle: {
    fontSize: scaleFont(14),
    color: colors.gray01,
  },
  label: {
    fontSize: scaleFont(14),
    color: colors.gray01,
    marginTop: metrics.largeBaseMargin,
  },
  modemNameInput: {
    width: '100%',
    marginTop: metrics.largeBaseMargin,
  },
  domainNameInput: {
    marginTop: metrics.largeBaseMargin,
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
  input: {
    color: colors.black,
  },
  saveButton: {
    marginTop: scaleSize(29),
    width: '100%',
    marginBottom: metrics.largeBaseMargin,
  },
});

export const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: scaleSize(47),
    borderColor: colors.gray04,
    borderBottomWidth: 1,
    borderRadius: scaleSize(5),
    justifyContent: 'center',
    color: colors.black,
  },
  inputAndroid: {
    height: scaleSize(47),
    borderColor: colors.gray04,
    borderBottomWidth: 1,
    justifyContent: 'center',
    color: colors.black,
  },
});

export default styles;
