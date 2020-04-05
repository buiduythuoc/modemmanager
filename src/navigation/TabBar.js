import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import React from 'react';
import {connect} from 'react-redux';

import TimelineListScreen from '../scenes/timeline/list';
import CreateTimelineScreen from '../scenes/timeline/create';
import TimelineDetailScreen from '../scenes/timeline/detail';
import TimelineEditScreen from '../scenes/timeline/edit';
// modem
import ListModemScreen from '../scenes/modem/list';
import DeviceListScreen from '../scenes/modem/deviceList';
import BlockListScreen from '../scenes/modem/blockList';
import CreateModemScreen from '../scenes/modem/create';
import EditModemScreen from '../scenes/modem/edit';
// notification
import NotificationScreen from '../scenes/notification/list';
import NotificationDetailScreen from '../scenes/notification/detail';
// my page
import MyPageScreen from '../scenes/myPage';
import ChangePasswordScreen from '../scenes/myPage/changePassword';
// account
import AccountListScreen from '../scenes/account/list';
import AccountDetailDetailScreen from '../scenes/account/detail';
import NotificationSettingScreen from '../scenes/account/notificationSetting';

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

const ListAccountNav = createStackNavigator(
  {
    AccountListScreen: {screen: AccountListScreen},
    AccountDetailDetailScreen: {screen: AccountDetailDetailScreen},
    NotificationSettingScreen: {screen: NotificationSettingScreen},
    ListModemScreen: {screen: ListModemScreen},
    DeviceListScreen: {screen: DeviceListScreen},
    BlockListScreen: {screen: BlockListScreen},
    CreateModemScreen: {screen: CreateModemScreen},
    EditModemScreen: {screen: EditModemScreen},
  },
  {
    navigationOptions: {
      ...baseNavigationOptions,
      title: 'Account',
    },
  },
);

ListAccountNav.navigationOptions = ({navigation}) => {
  const {routeName} = navigation.state.routes[navigation.state.index];
  let tabBarVisible = false;
  if (routeName === 'AccountListScreen') {
    tabBarVisible = true;
  }
  return {
    tabBarVisible,
  };
};

const ListModemNav = createStackNavigator(
  {
    ListModemScreen: {screen: ListModemScreen},
    DeviceListScreen: {screen: DeviceListScreen},
    BlockListScreen: {screen: BlockListScreen},
    CreateModemScreen: {screen: CreateModemScreen},
    EditModemScreen: {screen: EditModemScreen},
  },
  {
    navigationOptions: {
      ...baseNavigationOptions,
      title: 'List modem',
    },
  },
);

ListModemNav.navigationOptions = ({navigation}) => {
  const {routeName} = navigation.state.routes[navigation.state.index];
  let tabBarVisible = false;
  if (routeName === 'ListModemScreen') {
    tabBarVisible = true;
  }
  return {
    tabBarVisible,
  };
};

const TimelineNav = createStackNavigator(
  {
    TimelineListScreen: {screen: TimelineListScreen},
    CreateTimelineScreen: {screen: CreateTimelineScreen},
    TimelineDetailScreen: {screen: TimelineDetailScreen},
    TimelineEditScreen: {screen: TimelineEditScreen},
  },
  {
    navigationOptions: {
      ...baseNavigationOptions,
      title: 'Timeline',
    },
  },
);

TimelineNav.navigationOptions = ({navigation}) => {
  const {routeName} = navigation.state.routes[navigation.state.index];
  let tabBarVisible = false;
  if (routeName === 'TimelineListScreen') {
    tabBarVisible = true;
  }
  return {
    tabBarVisible,
  };
};

const NotificationNav = createStackNavigator(
  {
    NotificationScreen: {screen: NotificationScreen},
    NotificationDetailScreen: {screen: NotificationDetailScreen},
  },
  {
    navigationOptions: {
      ...baseNavigationOptions,
      title: 'Notification',
    },
  },
);

NotificationNav.navigationOptions = ({navigation}) => {
  const {routeName} = navigation.state.routes[navigation.state.index];
  let tabBarVisible = true;
  if (routeName === 'NotificationScreen') {
    tabBarVisible = true;
  }
  return {
    tabBarVisible,
  };
};

const MyPageNav = createStackNavigator(
  {
    MyPageScreen: {screen: MyPageScreen},
    ChangePasswordScreen: {screen: ChangePasswordScreen},
  },
  {
    navigationOptions: {
      ...baseNavigationOptions,
      title: 'Timeline',
    },
  },
);

MyPageNav.navigationOptions = ({navigation}) => {
  const {routeName} = navigation.state.routes[navigation.state.index];
  let tabBarVisible = true;
  if (routeName === 'ChangePasswordScreen') {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};

const tabBarConfig = {
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
};

const AdminTabBar = createBottomTabNavigator(
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
      screen: MyPageNav,
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
    ...tabBarConfig,
  },
);

const UserTabBar = createBottomTabNavigator(
  {
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
      screen: MyPageNav,
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
    ...tabBarConfig,
  },
);

const RootTabBar = createBottomTabNavigator(
  {
    ListAccountNav: {
      screen: ListAccountNav,
      path: '/accounts',
      navigationOptions: {
        tabBarLabel: 'List Accounts',
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
    MyPageTab: {
      screen: MyPageNav,
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
    ...tabBarConfig,
  },
);

// export default AdminTabBar;

class TabBar extends React.Component {
  render() {
    const {user} = this.props;
    const role = user ? user.type : 'user';
    // const role = '';
    if (role === 'root') {
      return <RootTabBar />;
    }
    if (role === 'admin') {
      return <AdminTabBar />;
    }
    return <UserTabBar />;
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, null)(TabBar);
