import {StyleSheet} from 'react-native';
import {colors, metrics} from '../../../themes';
import {scaleSize, scaleFont} from '../../../themes/mixins';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray06,
  },
  content: {
    padding: scaleSize(20),
    flex: 1,
    borderTopLeftRadius: scaleSize(25),
    borderTopRightRadius: scaleSize(25),
    backgroundColor: colors.white,
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
    flexDirection: 'row',
    marginTop: scaleSize(30),
    alignItems: 'center',
  },
  sendIcon: {
    marginLeft: scaleSize(10),
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: scaleSize(30),
    borderWidth: 1,
    borderColor: colors.gray04,
    maxHeight: scaleSize(100),
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
