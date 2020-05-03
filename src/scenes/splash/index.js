import React from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import RNSplashScreen from 'react-native-splash-screen';
import styles from './styles';
import NavigationService from '../../services/navigationService';

class SplashScreen extends React.Component {
  componentDidMount() {
    const {user} = this.props;
    let screenName = 'LoginScreen';
    if (user && user.user_id !== 0) {
      screenName = 'TabBar';
    }
    RNSplashScreen.hide();
    setTimeout(() => {
      NavigationService.navigateAndReset(screenName);
    }, 500);
  }

  render() {
    return <View style={styles.container} />;
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(
  mapStateToProps,
  null,
)(SplashScreen);
