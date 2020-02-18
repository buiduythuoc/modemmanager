import React from 'react';
import {View, Alert} from 'react-native';
import {connect} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {images, colors} from '../../../themes';
import styles from './styles';
import Button from '../../../components/atoms/Button';
import NavHeader from '../../../components/molecules/NavHeader';
import LabelInput from '../../../components/molecules/LabelInput';
import {scaleSize} from '../../../themes/mixins';
import MyPageActions from '../../../stores/myPageRedux';
import Loading from '../../../components/organisms/Loading';

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      isFetching: false,
    };
  }

  static navigationOptions = {
    header: null,
  };

  validate = () => {
    let isValid = true;
    let errorMessage = '';
    const {oldPassword, newPassword, confirmPassword} = this.state;
    if (oldPassword === '') {
      isValid = false;
      errorMessage = 'Please input old password';
    } else if (newPassword === '') {
      isValid = false;
      errorMessage = 'Please input new password';
    } else if (confirmPassword !== newPassword) {
      isValid = false;
      errorMessage = 'Confirm password not match';
    }

    return [isValid, errorMessage];
  };

  handleOnClickBack = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };

  handleOnClickSave = () => {
    const {changePassword, user, navigation} = this.props;
    const {oldPassword, newPassword} = this.state;
    const params = {
      userId: user.user_id,
      currentPassword: oldPassword,
      newPassword,
    };
    const [isValid, errorMessage] = this.validate();
    if (!isValid) {
      Alert.alert('Error', errorMessage);
      return;
    }
    this.setState({isFetching: true});
    changePassword(
      params,
      () => {
        this.setState({isFetching: false});
        Alert.alert(
          'Success',
          'Your password has been changed',
          [{text: 'OK', onPress: () => navigation.goBack()}],
          {cancelable: false},
        );
      },
      () => {
        this.setState({isFetching: false});
      },
    );
  };

  render() {
    const {isFetching, oldPassword, newPassword, confirmPassword} = this.state;

    return (
      <View style={styles.container}>
        <NavHeader
          title="Edit Password"
          titleColor={colors.gray01}
          leftIcon={images.icBackBlack}
          onLeftClick={this.handleOnClickBack}
        />
        <KeyboardAwareScrollView style={styles.content}>
          <LabelInput
            style={styles.oldPasswordInput}
            inputStyle={styles.input}
            label="Old password"
            labelStyle={styles.labelStyle}
            borderColor={colors.gray04}
            onChangeText={text => this.setState({oldPassword: text})}
            value={oldPassword}
            secureTextEntry={true}
          />
          <LabelInput
            style={styles.newPasswordInput}
            inputStyle={styles.input}
            label="New password"
            labelStyle={styles.labelStyle}
            borderColor={colors.gray04}
            onChangeText={text => this.setState({newPassword: text})}
            value={newPassword}
            secureTextEntry={true}
          />
          <LabelInput
            style={styles.confirmPasswordInput}
            inputStyle={styles.input}
            label="Confirm password"
            labelStyle={styles.labelStyle}
            borderColor={colors.gray04}
            onChangeText={text => this.setState({confirmPassword: text})}
            value={confirmPassword}
            secureTextEntry={true}
          />
          <Button
            style={styles.saveButton}
            height={scaleSize(45)}
            title="UPDATE"
            onClick={this.handleOnClickSave}
          />
        </KeyboardAwareScrollView>
        <Loading show={isFetching} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
  changePassword: (params, onSuccess, onError) =>
    dispatch(MyPageActions.myPageChangePassword(params, onSuccess, onError)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChangePassword);
