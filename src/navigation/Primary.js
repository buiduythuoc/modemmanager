import {createStackNavigator} from 'react-navigation';
import TabBar from './TabBar';
import SplashScreen from '../scenes/splash';
import LoginScreen from '../scenes/auth/login';
import ForgotPasswordScreen from '../scenes/auth/forgetPassword';
import SignupScreen from '../scenes/auth/signup';

const Primary = createStackNavigator(
  {
    TabBar: {screen: TabBar},
    SplashScreen: {screen: SplashScreen},
    LoginScreen: {screen: LoginScreen},
    SignupScreen: {screen: SignupScreen},
    ForgotPasswordScreen: {screen: ForgotPasswordScreen},
  },
  {
    // Default config for all screens
    initialRouteName: 'SplashScreen',
    headerMode: 'none',
  },
);
export default Primary;
