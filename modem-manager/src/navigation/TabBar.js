import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import React from 'react';
import TimelineScreen from '../scenes/timeline';
import ListModemScreen from '../scenes/modem';
import NotificationScreen from '../scenes/notification';
import {images, colors} from '../themes';
import Icon from '../components/atoms/Icon';
import styles from './styles';

const baseNavigationOptions = {
  headerTitleAllowFontScaling: false,
  headerTitleStyle: styles.headerTitle,
  headerStyle: styles.header,
  headerMode: 'screen',
  headerTintColor: 'white',
  statusBarStyle: 'dark-content',
};

const ListDevicesNav = createStackNavigator(
  {
    ListDevicesScreen: {screen: TimelineScreen},
  },
  {
    navigationOptions: {
      ...baseNavigationOptions,
      title: 'Timeline',
    },
  },
);

const ListModemNav = createStackNavigator(
  {
    ListModemScreen: {screen: ListModemScreen},
  },
  {
    navigationOptions: {
      ...baseNavigationOptions,
      title: 'List modem',
    },
  },
);

const TimelineNav = createStackNavigator(
  {
    TimelineScreen: {screen: TimelineScreen},
  },
  {
    navigationOptions: {
      ...baseNavigationOptions,
      title: 'Timeline',
    },
  },
);

const NotificationNav = createStackNavigator(
  {
    NotificationScreen: {screen: NotificationScreen},
  },
  {
    navigationOptions: {
      ...baseNavigationOptions,
      title: 'Notification',
    },
  },
);

const MyPageNav = createStackNavigator(
  {
    MyPageScreen: {screen: TimelineScreen},
  },
  {
    navigationOptions: {
      ...baseNavigationOptions,
      title: 'Timeline',
    },
  },
);

const TabBar = createBottomTabNavigator(
  {
    ListModemTab: {
      screen: ListModemNav,
      path: '/list-modem',
      navigationOptions: {
        tabBarLabel: 'List Modem',
        tabBarIcon: ({focused}) => (
          <Icon
            source={focused ? images.icTabListActive : images.icTabListInactive}
            width={17}
            height={17}
          />
        ),
      },
    },
    TimelineTab: {
      screen: TimelineNav,
      path: '/timeline',
      navigationOptions: {
        tabBarLabel: 'Timeline',
        tabBarIcon: ({focused}) => (
          <Icon
            source={
              focused
                ? images.icTabTimelineActive
                : images.icTabTimelineInactive
            }
            width={17}
            height={17}
          />
        ),
      },
    },
    NotificationTab: {
      screen: NotificationNav,
      path: '/notification',
      navigationOptions: {
        tabBarLabel: 'Notification',
        tabBarIcon: ({focused}) => (
          <Icon
            source={
              focused
                ? images.icTabNotificationActive
                : images.icTabNotificationInactive
            }
            width={15}
            height={17}
          />
        ),
      },
    },
    MyPageTab: {
      screen: ListModemNav,
      path: '/myPage',
      navigationOptions: {
        tabBarLabel: 'Account Detail',
        tabBarIcon: ({focused}) => (
          <Icon
            source={
              focused ? images.icTabMyPageActive : images.icTabMyPageInactive
            }
            width={14}
            height={17}
          />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: colors.tabBarActive,
      activeBackgroundColor: colors.white,
      inactiveTintColor: colors.gray04,
      inactiveBackgroundColor: colors.white,
      showLabel: true,
      style: styles.tabBar,
      labelStyle: styles.label,
    },
    navigationOptions: {
      headerStyle: null,
    },
    animationEnabled: true,
    swipeEnabled: false,
  },
);
export default TabBar;
