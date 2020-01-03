import React from 'react';
import {Image, View, Text} from 'react-native';
import {images} from '../../../themes';
import styles from './styles';
import Button from '../../../components/atoms/Button';
import LabelInput from '../../../components/molecules/LabelInput';
import {scaleSize} from '../../../themes/mixins';

export default class LoginScreen extends React.Component {
  handleClickSignup = () => {
    const {navigation} = this.props;
    navigation.navigate('SignupScreen');
  };

  handleClickForgotPassword = () => {
    const {navigation} = this.props;
    navigation.navigate('ForgotPasswordScreen');
  };

  handleClickLogin = () => {
    const {navigation} = this.props;
    navigation.navigate('TabBar');
  };

  render() {
    return (
      <View style={styles.container}>
        <Image source={images.imgMap} resizeMode="cover" />
        <View style={styles.content}>
          <Text style={styles.managementText}>Management</Text>
          <LabelInput
            style={styles.userNameInput}
            iconSrc={images.icUserWhite}
            iconWidth={scaleSize(10)}
            iconHeight={scaleSize(13)}
            label="Username"
          />
          <LabelInput
            style={styles.passwordInput}
            iconSrc={images.icLockWhite}
            iconWidth={scaleSize(10)}
            iconHeight={scaleSize(11)}
            label="Password"
          />
          <Text
            style={styles.forgotPasswordLink}
            onPress={this.handleClickForgotPassword}>
            Forgot password
          </Text>
          <Button
            style={styles.loginButton}
            height={scaleSize(45)}
            title="LOGIN"
            onClick={this.handleClickLogin}
          />
          <Text style={styles.signupLink} onPress={this.handleClickSignup}>
            Click here if you do not have an account
          </Text>
          <Text style={styles.copyrightText}>Copyright ABC@ </Text>
        </View>
      </View>
    );
  }
}
