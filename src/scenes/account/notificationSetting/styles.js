import {StyleSheet} from 'react-native';
import {colors, metrics} from '../../../themes';
import {scaleSize, scaleFont} from '../../../themes/mixins';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray06,
  },
  content: {
    paddingLeft: metrics.baseMargin,
    paddingRight: metrics.baseMargin,
    paddingTop: metrics.baseMargin,
    paddingBottom:
      metrics.unsafeBottomHeight + 2 * metrics.smallMargin + scaleSize(45),
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
    width: scaleSize(40),
    height: scaleSize(40),
    borderRadius: metrics.largeBaseMargin,
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
    marginVertical: metrics.baseMargin,
    height: 1,
    backgroundColor: colors.gray05,
  },
  numberOfDeviceContainer: {
    marginTop: metrics.baseMargin,
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
    width: scaleSize(60),
    backgroundColor: colors.addButton,
    paddingVertical: scaleSize(2),
    paddingHorizontal: scaleSize(10),
    borderRadius: scaleSize(15),
    color: colors.white,
  },
  bandWidthContainer: {
    marginTop: metrics.baseMargin,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bandWidthText: {
    fontSize: scaleFont(14),
    color: colors.gray01,
  },
  sendButtonContainer: {
    position: 'absolute',
    bottom: metrics.unsafeBottomHeight,
    left: 0,
    right: 0,
    borderTopColor: colors.gray05,
    borderTopWidth: 1,
    paddingHorizontal: metrics.baseMargin,
    paddingVertical: metrics.smallMargin,
    backgroundColor: colors.white,
  },
  sendButton: {
    width: '100%',
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
    height: scaleSize(80),
    borderRadius: scaleSize(5),
    color: colors.black,
  },
});

export default styles;
