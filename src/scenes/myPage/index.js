import React from 'react';
import {View, TouchableOpacity, Alert} from 'react-native';
import {connect} from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import ImagePicker from 'react-native-image-picker';
import {images, colors} from '../../themes';
import styles from './styles';
import TabHeader from '../../components/organisms/TabHeader';
import AvatarPicker from '../../components/molecules/AvatarPicker';
import LabelInput from '../../components/molecules/LabelInput';
import Button from '../../components/atoms/Button';
import {scaleSize} from '../../themes/mixins';
import MyPageActions from '../../stores/myPageRedux';
import AuthActions from '../../stores/authRedux';
import Loading from '../../components/organisms/Loading';
import Icon from '../../components/atoms/Icon';
import NavigationService from '../../services/navigationService';

class MyPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFetching: true,
      isShowDatePicker: false,
      username: '',
      expiredAt: '',
      avatarSource:
        props.user && props.user.image_url
          ? {uri: props.user.image_url}
          : images.imgAvatarDefault,
      avatarBase64: '',
    };
  }

  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    const {avatarSource} = this.state;
    const {fetchProfile, user} = this.props;
    fetchProfile(
      user.user_id,
      responseData => {
        this.setState({
          isFetching: false,
          username: responseData.user_name,
          avatarSource: responseData.image_url
            ? {uri: responseData.image_url}
            : avatarSource,
        });
      },
      () => {
        this.setState({isFetching: false});
      },
    );
  }

  handleOnClickChangePassword = () => {
    const {navigation} = this.props;
    navigation.navigate('ChangePasswordScreen');
  };

  handleOnClickLogout = () => {
    const {logout} = this.props;
    NavigationService.navigate('LoginScreen');
    logout();
  };

  handleOnClickSelectAvatar = () => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};
        this.setState({
          avatarSource: source,
          avatarBase64: response.data,
        });
      }
    });
  };

  handleOnClickUpdateProfile = () => {
    const {username, expiredAt, avatarBase64} = this.state;
    const {updateProfile, user} = this.props;
    this.setState({isFetching: true});
    const params = {
      userId: user.user_id,
      username,
      status: 1,
      expiredAt,
      avatar: avatarBase64,
    };
    updateProfile(
      params,
      () => {
        this.setState({isFetching: false});
        Alert.alert(
          'Success',
          'Your profile has been updated',
          [{text: 'OK', onPress: () => {}}],
          {cancelable: false},
        );
      },
      () => {
        this.setState({isFetching: false});
      },
    );
  };

  render() {
    const {
      isFetching,
      isShowDatePicker,
      username,
      expiredAt,
      avatarSource,
    } = this.state;
    const {user} = this.props;
    return (
      <View style={styles.container}>
        <TabHeader
          source={images.imgMapList}
          title={''}
          height={scaleSize(133)}
        />
        <View style={styles.content}>
          <AvatarPicker
            source={avatarSource}
            onClickLogout={this.handleOnClickLogout}
            onClickCamera={this.handleOnClickSelectAvatar}
          />
          <LabelInput
            style={styles.userNameInput}
            labelStyle={styles.labelInput}
            inputStyle={styles.input}
            borderColor={colors.gray04}
            iconSrc={images.icUserBlack}
            iconWidth={scaleSize(10)}
            iconHeight={scaleSize(13)}
            label="Username"
            value={username}
            onChangeText={text => this.setState({username: text})}
          />
          <LabelInput
            style={styles.passwordInput}
            labelStyle={styles.labelInput}
            inputStyle={styles.input}
            borderColor={colors.gray04}
            iconSrc={images.icLockBlack}
            iconWidth={scaleSize(10)}
            iconHeight={scaleSize(11)}
            label="Password"
            value={user.user_pass}
            secureTextEntry={true}
            editable={false}>
            <TouchableOpacity
              style={styles.iconEditContainer}
              onPress={this.handleOnClickChangePassword}>
              <Icon
                source={images.icEditBlue}
                width={scaleSize(19)}
                height={scaleSize(16)}
              />
            </TouchableOpacity>
          </LabelInput>
          <LabelInput
            style={styles.expiredAtInput}
            labelStyle={styles.labelInput}
            borderColor={colors.gray04}
            iconSrc={images.icExpiredBlack}
            iconWidth={scaleSize(11)}
            iconHeight={scaleSize(10)}
            label="Expired At"
            onFocus={() => this.setState({isShowDatePicker: true})}
            value={expiredAt}
          />
          <Button
            style={styles.updateButton}
            height={scaleSize(45)}
            title="UPDATE"
            onClick={this.handleOnClickUpdateProfile}
          />

          {/* <Button
            style={styles.updateButton}
            height={scaleSize(45)}
            title="LOGOUT"
            onClick={this.handleOnClickLogout}
          /> */}
        </View>
        {/* {isShowDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={0}
            value={new Date()}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={() => this.setState({isShowDatePicker: false})}
          />
        )} */}
        <Loading show={isFetching} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
  fetchProfile: (userId, onSuccess, onError) =>
    dispatch(MyPageActions.myPageFetch({userId}, onSuccess, onError)),
  updateProfile: (params, onSuccess, onError) =>
    dispatch(MyPageActions.myPageUpdate(params, onSuccess, onError)),
  logout: () => dispatch(AuthActions.authLogout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyPage);
