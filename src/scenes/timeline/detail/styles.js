import {StyleSheet} from 'react-native';
import {colors, metrics} from '../../../themes';
import {scaleSize, scaleFont} from '../../../themes/mixins';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray06,
  },
  safeAreaView: {
    flex: 1,
  },
  content: {
    paddingTop: scaleSize(20),
    paddingHorizontal: scaleSize(20),
    flex: 1,
    borderTopLeftRadius: scaleSize(25),
    borderTopRightRadius: scaleSize(25),
    backgroundColor: colors.white,
  },
  flatListContent: {
    paddingBottom: scaleSize(44) + 2 * scaleSize(12),
  },
  line: {
    backgroundColor: colors.commentBg,
    height: 1,
    marginTop: scaleSize(20),
    marginBottom: scaleSize(20),
  },
  slider: {
    width: metrics.screenWidth - 2 * scaleSize(20),
    height: metrics.screenWidth - 2 * scaleSize(20),
  },
  time: {
    marginTop: scaleSize(10),
    fontSize: scaleFont(10),
    lineHeight: scaleSize(14),
    color: colors.gray02,
  },
  title: {
    marginTop: scaleSize(10),
    fontSize: scaleFont(18),
    lineHeight: scaleSize(25),
    color: colors.black,
    fontWeight: 'bold',
  },
  subTitle: {
    marginTop: scaleSize(12),
    fontSize: scaleFont(14),
    lineHeight: scaleSize(19),
    color: colors.addButton,
  },
  postContent: {
    marginTop: scaleSize(12),
    fontSize: scaleFont(14),
    lineHeight: scaleSize(19),
    color: colors.gray02,
  },
  inputContainer: {
    position: 'absolute',
    bottom: metrics.sendButtonMarginBottom,
    flexDirection: 'row',
    paddingVertical: scaleSize(12),
    paddingHorizontal: scaleSize(20),
    backgroundColor: colors.white,
  },
  input: {
    flex: 1,
    height: scaleSize(44),
    backgroundColor: colors.commentBg,
    marginRight: metrics.smallMargin,
    borderRadius: scaleSize(6),
    color: colors.neutralGrey,
    paddingHorizontal: metrics.baseMargin,
    paddingTop: scaleSize(14),
    paddingBottom: scaleSize(14),
    maxHeight: scaleSize(100),
  },
  send: {
    width: scaleSize(44),
    height: scaleSize(44),
    borderRadius: scaleSize(10),
  },
  flatList: {
    flex: 1,
    marginTop: scaleSize(37),
    marginBottom: scaleSize(55),
  },
  actionPostContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: scaleSize(10),
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editText: {
    // marginLeft: scaleSize(5),
    fontSize: scaleFont(14),
    color: colors.addButton,
    textDecorationLine: 'underline',
  },
  deleteButton: {
    marginLeft: scaleSize(5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteText: {
    marginLeft: scaleSize(5),
    fontSize: scaleFont(14),
    color: colors.lightRed,
    textDecorationLine: 'underline',
  },
});

export default styles;
