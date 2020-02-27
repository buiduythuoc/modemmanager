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
import Firebase from '../../../configs/firebase';

class DeviceList extends React.Component {
  constructor(props) {
    super(props);
    const {navigation} = props;
    this.state = {
      isFetching: true,
      isRefreshing: false,
      modemData: navigation.getParam('modemData', null),
      adminId: navigation.getParam('adminId', 0),
      deviceList: [],
    };
  }

  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    this.fetchDevices();
  }

  fetchDevices = () => {
    const {modemData} = this.state;
    const {user} = this.props;
    const adminId =
      this.state.adminId === 0 ? user.user_id : this.state.adminId;
    const ref = 'admins/' + adminId + '/modems/' + modemData.id + '/devices';
    Firebase.database()
      .ref(ref)
      .on('value', snap => {
        const deviceList = [];
        snap.forEach(device => {
          deviceList.push(device.val());
        });
        this.setState({deviceList, isFetching: false, isRefreshing: false});
      });
  };

  handleOnClickBack = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };

  handleOnClickBlockList = () => {
    const {modemData} = this.state;
    const {navigation} = this.props;
    navigation.navigate('BlockListScreen', {modemId: modemData.id});
  };

  handleOnRefresh = () => {
    this.setState({isRefreshing: true, isFetching: false});
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
            this.setState({isFetching: true});
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

  render() {
    const {isFetching, isRefreshing, deviceList} = this.state;
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
        <Text style={styles.deviceCount}>{deviceList.length + ' devices'}</Text>
        <FlatList
          style={styles.flatList}
          data={deviceList}
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
