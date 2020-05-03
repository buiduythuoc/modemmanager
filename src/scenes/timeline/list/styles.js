import {StyleSheet} from 'react-native';
import {colors, metrics} from '../../../themes';
import {scaleSize} from '../../../themes/mixins';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.listBackground,
  },
  flatList: {
    flex: 1,
  },
  flatListContent: {
    paddingHorizontal: scaleSize(20),
    paddingTop: scaleSize(10),
  },
  modemPickerContainer: {
    alignItems: 'flex-end',
    marginTop: scaleSize(10),
    marginRight: scaleSize(20),
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
