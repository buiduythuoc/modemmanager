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
import {images, colors} from '../../../themes';
import styles from './styles';
import Button from '../../../components/atoms/Button';
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
      enable: true,
      minNumberOfDevices: '10',
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
          enable: responseData.is_active === 1,
          minNumberOfDevices: responseData.notify_devices + '',
        });
      },
      () => {
        this.setState({isLoading: false});
      },
    );
  };

  handleOnClickUpdate = () => {
    const {enable, minNumberOfDevices} = this.state;
    const {updateNotificationSetting, user, navigation} = this.props;
    this.setState({isLoading: true});
    updateNotificationSetting(
      {
        userId: user.user_id,
        isActive: enable ? 1 : 0,
        numberOfDevice: minNumberOfDevices,
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

  render() {
    const {enable, minNumberOfDevices, isLoading} = this.state;
    const status = enable ? 'ON' : 'OFF';
    const settingButtonStyle = enable
      ? {backgroundColor: colors.lightGreen}
      : {backgroundColor: colors.gray01};

    return (
      <SafeAreaView style={styles.container}>
        <NavBar
          title="Setting"
          titleColor={colors.gray01}
          leftIcon={images.icBackBlack}
          onLeftClick={this.handleOnClickBack}
        />
        <View style={styles.content}>
          <View style={styles.notificationContainer}>
            <Text style={styles.notificationText}>Notification</Text>
            <TouchableOpacity
              style={[styles.settingButton, settingButtonStyle]}
              onPress={() => this.setState({enable: !enable})}>
              <Text style={styles.settingButtonText}>{status}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.line} />
          <View style={styles.numberOfDeviceContainer}>
            <Text style={styles.numberOfDeviceText}>Min Number Of Devices</Text>
            <TextInput
              style={styles.input}
              value={minNumberOfDevices}
              keyboardType="numeric"
              onChangeText={text => this.setState({minNumberOfDevices: text})}
            />
          </View>
          {/* <View style={styles.bandWidthContainer}>
            <Text style={styles.backgroundColor}>Min MB/s(in 30 minutes)</Text>
            <TextInput
              style={styles.input}
              value={minBandWidth}
              keyboardType="numeric"
              onChangeText={(text) => this.setState({minBandWidth: text})}
            />
          </View> */}
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
