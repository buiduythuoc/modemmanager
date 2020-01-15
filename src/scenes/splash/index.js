import React from 'react';
import {View} from 'react-native';
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

export default class SplashScreen extends React.Component {
  componentDidMount() {
    const {navigation} = this.props;
    setTimeout(() => {
      navigation.navigate('LoginScreen');
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
