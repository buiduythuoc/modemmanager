import React from 'react';
import {Image, View, Text} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';
import {images, colors} from '../../../themes';
import styles from './styles';
import Button from '../../../components/atoms/Button';
import LabelInput from '../../../components/molecules/LabelInput';
import {scaleSize} from '../../../themes/mixins';
import AuthActions from '../../../stores/authRedux';
import Loading from '../../../components/organisms/Loading';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      isDisableLoginButton: true,
      isFetching: false,
    };
  }

  handleClickSignup = () => {
    const {navigation} = this.props;
    navigation.navigate('SignupScreen');
  };

  handleClickForgotPassword = () => {
    const {navigation} = this.props;
    navigation.navigate('ForgotPasswordScreen');
  };

  onChangeUsername = text => {
    const {password} = this.state;
    const isDisableLoginButton = text && password ? false : true;
    this.setState({username: text, isDisableLoginButton});
  };

  onChangePassword = text => {
    const {username} = this.state;
    const isDisableLoginButton = username && text ? false : true;
    this.setState({password: text, isDisableLoginButton});
  };

  handleClickLogin = () => {
    const {login, navigation} = this.props;
    const {username, password} = this.state;
    this.setState({isFetching: true});
    login(
      {username, password},
      () => {
        this.setState({isFetching: false});
        setTimeout(() => navigation.navigate('TabBar'), 2000);
      },
      () => {
        this.setState({isFetching: false});
      },
    );
  };

  render() {
    const {isDisableLoginButton, isFetching} = this.state;
    const loginButtonStyle = !isDisableLoginButton
      ? {backgroundColor: colors.white}
      : {};

    return (
      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={styles.keyboardAwareScrollViewContent}>
        <Image
          source={images.imgMap}
          resizeMode="contain"
          style={styles.imageMap}
        />
        <View style={styles.content}>
          <Text style={styles.managementText}>Management</Text>
          <View style={styles.formContainer}>
            <LabelInput
              style={styles.userNameInput}
              iconSrc={images.icUserWhite}
              iconWidth={scaleSize(10)}
              iconHeight={scaleSize(13)}
              label="Username"
              onChangeText={text => this.onChangeUsername(text)}
            />
            <LabelInput
              style={styles.passwordInput}
              iconSrc={images.icLockWhite}
              iconWidth={scaleSize(10)}
              iconHeight={scaleSize(11)}
              label="Password"
              onChangeText={text => this.onChangePassword(text)}
              secureTextEntry={true}
            />
            <Text
              style={styles.forgotPasswordLink}
              onPress={this.handleClickForgotPassword}>
              Forgot password
            </Text>
          </View>
          <Button
            style={[styles.loginButton, loginButtonStyle]}
            height={scaleSize(45)}
            title="LOGIN"
            textColor={isDisableLoginButton ? colors.white : colors.primary}
            onClick={this.handleClickLogin}
            disable={isDisableLoginButton}
          />
          <Text style={styles.signupLink} onPress={this.handleClickSignup}>
            Click here if you do not have an account
          </Text>
          <Text style={styles.copyrightText}>Copyright ABC@ </Text>
        </View>
        <Loading show={isFetching} />
      </KeyboardAwareScrollView>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  login: (params, onSuccess, onError) =>
    dispatch(AuthActions.authLogin(params, onSuccess, onError)),
});

export default connect(
  null,
  mapDispatchToProps,
)(LoginScreen);
