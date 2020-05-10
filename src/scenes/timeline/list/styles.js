import {StyleSheet} from 'react-native';
import {colors, metrics} from '../../../themes';
import {scaleSize, scaleFont} from '../../../themes/mixins';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.listBackground,
  },
  flatList: {
    flex: 1,
  },
  flatListContent: {
    paddingHorizontal: metrics.baseMargin,
    paddingTop: scaleSize(10),
  },
  modemPickerContainer: {
    alignItems: 'flex-end',
    marginTop: scaleSize(10),
    marginRight: metrics.baseMargin,
  },
  modemPicker: {
    flexDirection: 'row',
    width: scaleSize(150),
    height: scaleSize(30),
    borderColor: colors.gray04,
    borderWidth: 1,
    borderRadius: scaleSize(5),
    alignItems: 'center',
    paddingHorizontal: scaleSize(4),
  },
  pickerSelect: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  noPostContainer: {
    padding: metrics.baseMargin,
    alignItems: 'center',
  },
  noPostText: {
    fontSize: scaleFont(14),
  },
});

export const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: scaleSize(47),
  },
  inputAndroid: {
    height: scaleSize(47),
  },
});

export default styles;
