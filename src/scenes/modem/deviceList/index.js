import React from 'react';
import {View, FlatList, Text, RefreshControl, Alert} from 'react-native';
import {connect} from 'react-redux';
import styles from './styles';
import NavHeader from '../../../components/molecules/NavHeader';
import DeviceItem from '../../../components/organisms/DeviceItem';
import {colors, images} from '../../../themes';
import {scaleSize} from '../../../themes/mixins';
import ModemActions from '../../../stores/modemRedux';
import Loading from '../../../components/organisms/Loading';

class DeviceList extends React.Component {
  constructor(props) {
    super(props);
    const {navigation} = props;
    this.state = {
      isFetching: false,
      isRefreshing: false,
      modemData: navigation.getParam('modemData', null),
    };
  }

  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    const {modemData} = this.state;
    const {listModems} = this.props;
    const modem = listModems.find(item => item.id === modemData.id);
    const devices = modem && modem.devices ? modem.devices : [];
    if (devices.length === 0) {
      this.setState({isFetching: true});
    }
    this.fetchDevices();
  }

  handleOnClickBack = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };

  handleOnClickBlockList = () => {
    const {navigation} = this.props;
    navigation.navigate('BlockListScreen');
  };

  handleOnRefresh = () => {
    this.setState({isRefreshing: true, isFetching: true});
    this.fetchDevices();
  };

  handleOnClickBlock = modemItem => {
    const {modemData} = this.state;
    Alert.alert(
      'Warning',
      'Do you want to block ' + modemItem.name,
      [
        {
          text: 'OK',
          onPress: () => {
            const {user, blockDevice} = this.props;
            const params = {
              userId: user.user_id,
              modemId: modemData.id,
              deviceMac: modemItem.mac_address,
              deviceName: modemItem.name,
            };
            blockDevice(
              params,
              () => {
                this.setState({isFetching: false, isRefreshing: false});
                Alert.alert(
                  'Success',
                  modemItem.name + ' has been blocked',
                  [{text: 'OK', onPress: () => {}}],
                  {cancelable: false},
                );
              },
              () => {
                this.setState({isFetching: false, isRefreshing: false});
              },
            );
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => {},
        },
      ],
      {cancelable: false},
    );
  };

  fetchDevices = () => {
    const {user} = this.props;
    const {modemData} = this.state;
    const params = {
      userId: user.user_id,
      modemId: modemData.id,
      domain: modemData.domain,
      port: modemData.port,
      username: modemData.login_name,
      password: modemData.login_pass,
    };
    this.props.fetchDevices(
      params,
      () => {
        this.setState({isFetching: false, isRefreshing: false});
      },
      () => {
        this.setState({isFetching: false, isRefreshing: false});
      },
    );
  };

  render() {
    const {isFetching, isRefreshing, modemData} = this.state;
    const {listModems} = this.props;
    const modem = listModems.find(item => item.id === modemData.id);
    const listDevices = modem && modem.devices ? modem.devices : [];
    return (
      <View style={styles.container}>
        <NavHeader
          title="Device Management"
          titleColor={colors.gray01}
          leftIcon={images.icBackBlack}
          onLeftClick={this.handleOnClickBack}
          rightIcon={images.icBlockList}
          rightIconWidth={scaleSize(16)}
          rightIconHeight={scaleSize(19)}
          onRightClick={this.handleOnClickBlockList}
        />
        <Text style={styles.deviceCount}>
          {listDevices.length + ' devices'}
        </Text>
        <FlatList
          style={styles.flatList}
          data={listDevices}
          renderItem={({item}) => (
            <DeviceItem
              data={item}
              onClick={() => this.handleOnClickBlock(item)}
            />
          )}
          keyExtractor={(item, index) => {
            return index + '';
          }}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={this.handleOnRefresh}
            />
          }
        />
        <Loading show={isFetching} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  listModems: state.modem.list,
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
  fetchDevices: (params, onSuccess, onError) =>
    dispatch(ModemActions.deviceFetch(params, onSuccess, onError)),
  blockDevice: (params, onSuccess, onError) =>
    dispatch(ModemActions.deviceBlock(params, onSuccess, onError)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeviceList);
