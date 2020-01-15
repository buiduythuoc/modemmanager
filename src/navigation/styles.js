import {StyleSheet} from 'react-native';
import {colors, metrics} from '../themes';
export default StyleSheet.create({
  tabBar: {
    height: metrics.tabBarHeight,
    borderTopColor: colors.gray04,
    borderTopWidth: 1,
  },
  header: {},
  headerTitle: {
    alignSelf: 'center',
  },
  label: {
    height: 15,
    width: metrics.screenWidth / 4,
    fontSize: 10,
    padding: 0,
  },
  icon: {},
});
