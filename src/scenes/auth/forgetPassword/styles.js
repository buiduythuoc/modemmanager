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
  descriptionText: {
    fontSize: scaleFont(18),
    fontWeight: 'bold',
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
