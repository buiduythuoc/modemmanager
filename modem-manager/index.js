/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './src/App';
import AppNavigation from './src/navigation/Primary';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => AppNavigation);
