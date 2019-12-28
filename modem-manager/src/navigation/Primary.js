import {createAppContainer, createStackNavigator} from 'react-navigation';
// import TabBar from './TabBar';
import SplashScreen from '../scenes/splash';
const Primary = createStackNavigator(
  {
    // TabBar: {screen: TabBar},
    Splash: {screen: SplashScreen},
  },
  {
    // Default config for all screens
    initialRouteName: 'Splash',
    headerMode: 'none',
  },
);
export default createAppContainer(Primary);
