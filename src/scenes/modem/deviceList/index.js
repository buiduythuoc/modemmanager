import React from 'react';
import {View, FlatList, Text, RefreshControl} from 'react-native';
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
      isFetching: true,
      isRefreshing: false,
      modemData: navigation.getParam('modemData', null),
    };
  }

  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
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
    this.setState({isRefreshing: true});
    this.fetchDevices();
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
    const {isFetching, isRefreshing} = this.state;
    const {listDevices} = this.props;
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
          renderItem={({item}) => <DeviceItem data={item} />}
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
  listDevices: state.modem.deviceList,
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
  fetchDevices: (params, onSuccess, onError) =>
    dispatch(ModemActions.deviceFetch(params, onSuccess, onError)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeviceList);
