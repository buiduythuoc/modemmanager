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
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  notificationText: {
    fontSize: scaleFont(18),
    fontWeight: '600',
    color: colors.gray01,
  },
  settingButton: {
    width: scaleSize(46),
    height: scaleSize(46),
    borderRadius: scaleSize(32),
    backgroundColor: colors.lightGreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingButtonText: {
    fontSize: scaleFont(14),
    color: colors.white,
    fontWeight: 'bold',
  },
  line: {
    marginTop: scaleSize(24),
    height: 1,
    backgroundColor: colors.gray05,
  },
  numberOfDeviceContainer: {
    marginTop: scaleSize(35),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  numberOfDeviceText: {
    fontSize: scaleFont(14),
    color: colors.gray01,
  },
  input: {
    height: scaleSize(30),
    backgroundColor: colors.addButton,
    paddingVertical: scaleSize(2),
    paddingHorizontal: scaleSize(20),
    borderRadius: scaleSize(15),
    color: colors.white,
  },
  bandWidthContainer: {
    marginTop: scaleSize(30),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bandWidthText: {
    fontSize: scaleFont(14),
    color: colors.gray01,
  },
  labelStyle: {
    fontSize: scaleFont(14),
    color: colors.gray01,
  },
  emailInputContainer: {
    marginTop: scaleSize(67),
    width: '100%',
  },
  sendButton: {
    marginTop: scaleSize(54),
    width: '100%',
  },
});

export default styles;
