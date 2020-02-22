import React from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import * as Animatable from 'react-native-animatable';
import Icon from '../../components/atoms/Icon';
import styles from './styles';
import {scaleSize} from '../../themes/mixins';
import {images} from '../../themes';

const fadeIn = {
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
};

class SplashScreen extends React.Component {
  componentDidMount() {
    const {navigation, user} = this.props;
    let screenName = 'LoginScreen';
    if (user && user.user_id !== 0) {
      screenName = 'TabBar';
    }
    setTimeout(() => {
      navigation.navigate(screenName);
    }, 2000);
  }

  render() {
    return (
      <View style={styles.container}>
        <Animatable.View animation={fadeIn} duration={2000}>
          <Icon
            width={scaleSize(100)}
            height={scaleSize(100)}
            source={images.icApp}
            style={styles.appIcon}
          />
        </Animatable.View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, null)(SplashScreen);
