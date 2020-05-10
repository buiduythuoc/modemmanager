import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {images, colors} from '../../../themes';
import styles from './styles';
import Button from '../../../components/atoms/Button';
import LabelInput from '../../../components/molecules/LabelInput';
import NavBar from '../../../components/molecules/NavBar';
import {scaleSize} from '../../../themes/mixins';
import AccountActions from '../../../stores/accountRedux';
import Loading from '../../../components/organisms/Loading';

class NotificationSetting extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isNotiDevice: false,
      noOfDevice: '10',
      notiDeviceTitle: '',
      notiDeviceContent: '',
      isNotiData: false,
      noOfData: '5',
      notiDataTitle: '',
      notiDataContent: '',
    };
  }

  componentDidMount() {
    this.fetchNotificationSetting();
  }

  fetchNotificationSetting = () => {
    this.setState({isLoading: true});
    const {fetchNotificationSetting, user} = this.props;
    fetchNotificationSetting(
      user.user_id,
      responseData => {
        this.setState({
          isLoading: false,
          isNotiDevice: responseData.is_noti_device === 1,
          noOfDevice: responseData.notify_devices || '10',
          notiDeviceTitle: responseData.noti_device_title || '',
          notiDeviceContent: responseData.noti_device_content || '',
          isNotiData: responseData.is_noti_data === 1,
          noOfData: responseData.notify_data || '5',
          notiDataTitle: responseData.noti_data_title || '',
          notiDataContent: responseData.noti_data_content || '',
        });
      },
      () => {
        this.setState({isLoading: false});
      },
    );
  };

  handleOnClickUpdate = () => {
    const {
      isNotiDevice,
      noOfDevice,
      notiDeviceTitle,
      notiDeviceContent,
      isNotiData,
      noOfData,
      notiDataTitle,
      notiDataContent,
    } = this.state;
    const {updateNotificationSetting, user, navigation} = this.props;
    this.setState({isLoading: true});
    updateNotificationSetting(
      {
        userId: user.user_id,
        isNotiDevice: isNotiDevice ? 1 : 0,
        noOfDevice,
        notiDeviceTitle,
        notiDeviceContent,
        isNotiData: isNotiData ? 1 : 0,
        noOfData,
        notiDataTitle,
        notiDataContent,
      },
      () => {
        this.setState({
          isLoading: false,
        });
        Alert.alert(
          'Success',
          'Notification Setting has been updated',
          [
            {
              text: 'OK',
              onPress: () => {
                navigation.goBack();
              },
            },
          ],
          {cancelable: false},
        );
      },
      () => {
        this.setState({isLoading: false});
      },
    );
  };

  handleOnClickBack = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };

  handleOnClickPushNotification = () => {
    const {navigation} = this.props;
    navigation.navigate('PushNotificationScreen');
  };

  renderNumberOfDevices() {
    const {
      isNotiDevice,
      noOfDevice,
      notiDeviceTitle,
      notiDeviceContent,
    } = this.state;
    const status = isNotiDevice ? 'ON' : 'OFF';
    const settingButtonStyle = isNotiDevice
      ? {backgroundColor: colors.lightGreen}
      : {backgroundColor: colors.gray01};
    return (
      <>
        <View style={styles.notificationContainer}>
          <Text style={styles.notificationText}>Device Notification</Text>
          <TouchableOpacity
            style={[styles.settingButton, settingButtonStyle]}
            onPress={() => this.setState({isNotiDevice: !isNotiDevice})}>
            <Text style={styles.settingButtonText}>{status}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.numberOfDeviceContainer}>
          <Text style={styles.numberOfDeviceText}>Min Number Of Devices</Text>
          <TextInput
            style={styles.input}
            value={noOfDevice + ''}
            keyboardType="numeric"
            onChangeText={text => this.setState({noOfDevice: text})}
          />
        </View>
        <LabelInput
          style={styles.inputContainer}
          label="Title"
          labelStyle={styles.label}
          borderColor={colors.gray04}
          inputStyle={styles.titleInput}
          rounded={true}
          placeholder="Write your own ......."
          placeholderTextColor={colors.gray05}
          value={notiDeviceTitle}
          onChangeText={text => this.setState({notiDeviceTitle: text})}
        />
        <LabelInput
          style={styles.inputContainer}
          label="Content"
          labelStyle={styles.label}
          borderColor={colors.gray04}
          inputStyle={styles.contentInput}
          rounded={true}
          placeholder="Write your own ......."
          placeholderTextColor={colors.gray05}
          value={notiDeviceContent}
          multiline={true}
          onChangeText={text => this.setState({notiDeviceContent: text})}
        />
      </>
    );
  }

  renderNumberOfData() {
    const {isNotiData, noOfData, notiDataTitle, notiDataContent} = this.state;
    const status = isNotiData ? 'ON' : 'OFF';
    const settingButtonStyle = isNotiData
      ? {backgroundColor: colors.lightGreen}
      : {backgroundColor: colors.gray01};
    return (
      <>
        <View style={styles.notificationContainer}>
          <Text style={styles.notificationText}>Data Notification</Text>
          <TouchableOpacity
            style={[styles.settingButton, settingButtonStyle]}
            onPress={() => this.setState({isNotiData: !isNotiData})}>
            <Text style={styles.settingButtonText}>{status}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bandWidthContainer}>
          <Text style={styles.backgroundColor}>Min MB/s(in 30 minutes)</Text>
          <TextInput
            style={styles.input}
            value={noOfData + ''}
            keyboardType="numeric"
            onChangeText={text => this.setState({noOfData: text})}
          />
        </View>
        <LabelInput
          style={styles.inputContainer}
          label="Title"
          labelStyle={styles.label}
          borderColor={colors.gray04}
          inputStyle={styles.titleInput}
          rounded={true}
          placeholder="Write your own ......."
          placeholderTextColor={colors.gray05}
          value={notiDataTitle}
          onChangeText={text => this.setState({notiDataTitle: text})}
        />
        <LabelInput
          style={styles.inputContainer}
          label="Content"
          labelStyle={styles.label}
          borderColor={colors.gray04}
          inputStyle={styles.contentInput}
          rounded={true}
          placeholder="Write your own ......."
          placeholderTextColor={colors.gray05}
          value={notiDataContent}
          multiline={true}
          onChangeText={text => this.setState({notiDataContent: text})}
        />
      </>
    );
  }

  render() {
    const {isLoading} = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <NavBar
          title="Setting"
          titleColor={colors.gray01}
          leftIcon={images.icBackBlack}
          onLeftClick={this.handleOnClickBack}
          rightIcon={images.icTabNotificationInactive}
          rightIconWidth={15}
          rightIconHeight={17}
          rightIconStyle={{tintColor: colors.black}}
          onRightClick={this.handleOnClickPushNotification}
        />
        <KeyboardAwareScrollView contentContainerStyle={styles.content}>
          {this.renderNumberOfDevices()}
          <View style={styles.line} />
          {this.renderNumberOfData()}
        </KeyboardAwareScrollView>
        <View style={styles.sendButtonContainer}>
          <Button
            style={styles.sendButton}
            height={scaleSize(45)}
            title="UPDATE"
            onClick={this.handleOnClickUpdate}
          />
        </View>
        <Loading show={isLoading} />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
  fetchNotificationSetting: (userId, onSuccess, onError) =>
    dispatch(
      AccountActions.accountFetchNotificationSetting(
        {userId},
        onSuccess,
        onError,
      ),
    ),
  updateNotificationSetting: (params, onSuccess, onError) =>
    dispatch(
      AccountActions.accountUpdateNotificationSetting(
        params,
        onSuccess,
        onError,
      ),
    ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NotificationSetting);
