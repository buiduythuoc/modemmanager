import React from 'react';
import {
  FlatList,
  Text,
  RefreshControl,
  Alert,
  SafeAreaView,
} from 'react-native';
import {connect} from 'react-redux';
import styles from './styles';
import NavBar from '../../../components/molecules/NavBar';
import DeviceItem from '../../../components/organisms/DeviceItem';
import {colors, images} from '../../../themes';
import ModemActions from '../../../stores/modemRedux';
import Loading from '../../../components/organisms/Loading';

class BlockList extends React.Component {
  constructor(props) {
    super(props);
    const {navigation} = props;
    this.state = {
      isFetching: false,
      isRefreshing: false,
      modemId: navigation.getParam('modemId', 0),
    };
  }

  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    this.setState({isFetching: true});
    this.fetchBlockDevices();
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
    this.fetchBlockDevices();
  };

  handleOnClickUnblock = modemItem => {
    const {modemId} = this.state;
    Alert.alert(
      'Warning',
      'Do you want to unblock ' + modemItem.name,
      [
        {
          text: 'OK',
          onPress: () => {
            this.setState({isFetching: true});
            const {user, unblockDevice} = this.props;
            const params = {
              userId: user.user_id,
              modemId: modemId,
              deviceMac: modemItem.mac_address,
              deviceName: modemItem.name,
            };
            unblockDevice(
              params,
              () => {
                this.setState({isFetching: false, isRefreshing: false});
                Alert.alert(
                  'Success',
                  modemItem.name + ' has been unblocked',
                  [
                    {
                      text: 'OK',
                      onPress: () => {
                        this.fetchBlockDevices();
                      },
                    },
                  ],
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

  fetchBlockDevices = () => {
    const {user} = this.props;
    const {modemId} = this.state;
    const params = {
      userId: user.user_id,
      modemId,
    };
    this.props.fetchBlockDevices(
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
    const {isFetching, isRefreshing, modemId} = this.state;
    const {listModems} = this.props;
    const modem = listModems.find(item => item.id === modemId);
    const listBlockDevices =
      modem && modem.blockDevices ? modem.blockDevices : [];
    return (
      <SafeAreaView style={styles.container}>
        <NavBar
          title="Block List"
          titleColor={colors.gray01}
          leftIcon={images.icBackBlack}
          onLeftClick={this.handleOnClickBack}
        />
        <Text style={styles.deviceCount}>
          {listBlockDevices.length + ' devices'}
        </Text>
        <FlatList
          style={styles.flatList}
          data={listBlockDevices}
          renderItem={({item}) => (
            <DeviceItem
              data={item}
              onClick={() => this.handleOnClickUnblock(item)}
              isLocked={true}
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
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  listModems: state.modem.list,
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
  fetchBlockDevices: (params, onSuccess, onError) =>
    dispatch(ModemActions.deviceBlockListFetch(params, onSuccess, onError)),
  unblockDevice: (params, onSuccess, onError) =>
    dispatch(ModemActions.deviceUnblock(params, onSuccess, onError)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BlockList);
