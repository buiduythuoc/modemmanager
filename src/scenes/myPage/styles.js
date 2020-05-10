import {StyleSheet} from 'react-native';
import {colors, metrics} from '../../themes';
import {scaleSize} from '../../themes/mixins';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.listBackground,
  },
  content: {
    flex: 1,
    marginTop: scaleSize(-65),
    paddingHorizontal: scaleSize(37),
    alignItems: 'center',
  },
  labelInput: {
    color: colors.gray01,
  },
  input: {
    color: colors.black,
  },
  userNameInput: {
    width: '100%',
    marginTop: metrics.largeBaseMargin,
  },
  iconEditContainer: {
    position: 'absolute',
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: scaleSize(10),
  },
  passwordInput: {
    width: '100%',
    marginTop: metrics.largeBaseMargin,
  },
  expiredAtInput: {
    width: '100%',
    marginTop: metrics.largeBaseMargin,
  },
  updateButton: {
    width: '100%',
    marginTop: scaleSize(28),
  },
});

export default styles;
