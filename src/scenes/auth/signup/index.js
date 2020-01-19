import React from 'react';
import {Image, View, Text} from 'react-native';
import {connect} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {images, colors} from '../../../themes';
import styles from './styles';
import Button from '../../../components/atoms/Button';
import LabelInput from '../../../components/molecules/LabelInput';
import NavHeader from '../../../components/molecules/NavHeader';
import Dropdown from '../../../components/molecules/Dropdown';
import {scaleSize} from '../../../themes/mixins';
import SignupActions from '../../../stores/auth/signupRedux';
import Loading from '../../../components/organisms/Loading';

class SignupScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      username: '',
      password: '',
      role: 'guest',
      isDisableSignupButton: true,
    };
  }

  onChangeUsername = text => {
    const {password} = this.state;
    const isDisableSignupButton = text && password ? false : true;
    this.setState({username: text, isDisableSignupButton});
  };

  onChangePassword = text => {
    const {username} = this.state;
    const isDisableSignupButton = username && text ? false : true;
    this.setState({password: text, isDisableSignupButton});
  };

  onSelectRole = value => {
    this.setState({role: value.toLowerCase()});
  };

  handleClickBack = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };

  handleClickSignup = () => {
    const {signupRequest} = this.props;
    const {username, password, role} = this.state;
    console.log('handleClickSignup', username, password, role);
    signupRequest(username, password, role);
  };

  render() {
    const {fetching} = this.props;
    const {isDisableSignupButton} = this.state;
    const signupButtonStyle = !isDisableSignupButton
      ? {backgroundColor: colors.white}
      : {};

    return (
      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={styles.keyboardAwareScrollViewContent}>
        <Image
          source={images.imgMapSignup}
          resizeMode="contain"
          style={styles.imageMap}
        />
        <View style={styles.content}>
          <Text style={styles.managementText}>Management</Text>
          {/* <LabelInput
            style={styles.emailInput}
            iconSrc={images.icEmail}
            iconWidth={scaleSize(12)}
            iconHeight={scaleSize(12)}
            label="Email"
          /> */}
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
              secureTextEntry={true}
              onChangeText={text => this.onChangePassword(text)}
            />
            <Dropdown
              style={styles.roleInput}
              label="Role"
              options={['Guest', 'Admin']}
              defaultValue="Guest"
              onSelect={(index, value) => this.onSelectRole(value)}
            />
          </View>
          <Button
            style={[styles.signupButton, signupButtonStyle]}
            height={scaleSize(45)}
            title="SIGNUP"
            onClick={this.handleClickSignup}
            textColor={isDisableSignupButton ? colors.white : colors.primary}
            disable={isDisableSignupButton}
          />
          <Text style={styles.copyrightText}>Copyright ABC@ </Text>
        </View>
        <NavHeader
          style={styles.navHeader}
          leftIcon={images.icBackWhite}
          onLeftClick={this.handleClickBack}
        />
        <Loading show={fetching} />
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = state => ({
  fetching: state.signup.fetching,
  error: state.signup.error,
});

const mapDispatchToProps = dispatch => ({
  signupRequest: (userName, password, role) =>
    dispatch(SignupActions.signupRequest(userName, password, role)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen);
