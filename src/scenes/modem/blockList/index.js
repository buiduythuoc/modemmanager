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
      <View style={styles.container}>
        <NavHeader
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
              onClick={() => this.handleOnClickBlock(item)}
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
      </View>
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BlockList);
