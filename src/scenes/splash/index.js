import React from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import RNSplashScreen from 'react-native-splash-screen';
import styles from './styles';

class SplashScreen extends React.Component {
  componentDidMount() {
    const {navigation, user} = this.props;
    let screenName = 'LoginScreen';
    if (user && user.user_id !== 0) {
      screenName = 'TabBar';
    }
    RNSplashScreen.hide();
    setTimeout(() => {
      navigation.navigate(screenName);
    }, 500);
  }

  render() {
    return <View style={styles.container} />;
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, null)(SplashScreen);
