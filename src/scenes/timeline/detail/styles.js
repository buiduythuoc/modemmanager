import {StyleSheet} from 'react-native';
import {colors} from '../../../themes';
import {scaleSize, scaleFont} from '../../../themes/mixins';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray06,
  },
  content: {
    paddingHorizontal: scaleSize(20),
    flex: 1,
    paddingTop: scaleSize(42),
    borderTopLeftRadius: scaleSize(25),
    borderTopRightRadius: scaleSize(25),
    backgroundColor: colors.white,
  },
  time: {
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
  input: {
    height: scaleSize(47),
    marginTop: scaleSize(30),
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.gray06,
    flexDirection: 'row',
    paddingVertical: scaleSize(10),
    paddingHorizontal: scaleSize(36),
  },
  editButton: {
    height: scaleSize(45),
    flex: 1,
    marginRight: scaleSize(36),
    backgroundColor: colors.primary,
  },
  deleteButton: {
    height: scaleSize(45),
    flex: 1,
    backgroundColor: colors.lightRed,
  },
});

export default styles;
