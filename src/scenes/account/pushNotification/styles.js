import {StyleSheet} from 'react-native';
import {colors, metrics} from '../../../themes';
import {scaleSize, scaleFont} from '../../../themes/mixins';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray06,
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: metrics.baseMargin,
    borderTopLeftRadius: scaleSize(25),
    borderTopRightRadius: scaleSize(25),
    backgroundColor: colors.white,
  },
  label: {
    fontSize: scaleFont(14),
    color: colors.gray01,
    marginBottom: scaleSize(10),
  },
  inputContainer: {
    marginTop: scaleSize(14),
    width: '100%',
  },
  titleInput: {
    height: scaleSize(47),
    borderRadius: scaleSize(5),
    color: colors.black,
  },
  contentInput: {
    height: scaleSize(194),
    borderRadius: scaleSize(5),
    color: colors.black,
  },
  postButton: {
    marginTop: scaleSize(54),
    width: '100%',
  },
});

export const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: scaleSize(47),
    borderColor: colors.gray04,
    borderWidth: 1,
    borderRadius: scaleSize(5),
    justifyContent: 'center',
    color: colors.black,
    paddingHorizontal: scaleSize(4),
  },
  inputAndroid: {
    height: scaleSize(47),
    borderColor: colors.gray04,
    borderWidth: 1,
    borderRadius: scaleSize(5),
    justifyContent: 'center',
    color: colors.black,
    paddingHorizontal: scaleSize(4),
  },
});

export default styles;
