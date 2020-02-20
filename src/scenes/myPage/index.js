import React from 'react';
import {View, TouchableOpacity, Alert} from 'react-native';
import {connect} from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import {images, colors} from '../../themes';
import styles from './styles';
import TabHeader from '../../components/organisms/TabHeader';
import AvatarPicker from '../../components/molecules/AvatarPicker';
import LabelInput from '../../components/molecules/LabelInput';
import Button from '../../components/atoms/Button';
import {scaleSize} from '../../themes/mixins';
import MyPageActions from '../../stores/myPageRedux';
import Loading from '../../components/organisms/Loading';
import Icon from '../../components/atoms/Icon';

class MyPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFetching: true,
      isShowDatePicker: false,
      username: '',
      expiredAt: '',
    };
  }

  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    const {fetchProfile, user} = this.props;
    fetchProfile(
      user.user_id,
      () => {
        this.setState({isFetching: false, username: user.user_name});
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

  handleOnClickUpdateProfile = () => {
    const {username, expiredAt} = this.state;
    const {updateProfile, user} = this.props;
    this.setState({isFetching: true});
    const params = {
      userId: user.user_id,
      username,
      status: 1,
      expiredAt,
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
    const {isFetching, isShowDatePicker, username, expiredAt} = this.state;
    const {user} = this.props;
    return (
      <View style={styles.container}>
        <TabHeader
          source={images.imgMapTimeline}
          title={'My profile'}
          height={scaleSize(167)}
        />
        <View style={styles.content}>
          <AvatarPicker source={images.imgAvatarDefault} />
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
});

export default connect(mapStateToProps, mapDispatchToProps)(MyPage);
