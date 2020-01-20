import {StyleSheet} from 'react-native';
import {colors} from '../../../themes';
import {scaleSize, scaleFont} from '../../../themes/mixins';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray06,
    flex: 1,
  },
  content: {
    flex: 1,
  },
  scrollView: {
    padding: scaleSize(30),
    borderTopLeftRadius: scaleSize(25),
    borderTopRightRadius: scaleSize(25),
    backgroundColor: colors.white,
  },
  imageText: {},
  imageContainer: {
    flexDirection: 'row',
    marginTop: scaleSize(10),
  },
  imagePicker: {
    marginRight: scaleSize(8),
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
  summaryInput: {
    height: scaleSize(80),
    borderRadius: scaleSize(5),
  },
  contentInput: {
    height: scaleSize(194),
    borderRadius: scaleSize(5),
  },
  postButton: {
    marginTop: scaleSize(54),
    width: '100%',
  },
});

export default styles;
