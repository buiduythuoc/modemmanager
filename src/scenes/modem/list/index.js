import React from 'react';
import {
  View,
  FlatList,
  BackHandler,
  Text,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {images, colors} from '../../../themes';
import styles from './styles';
import Button from '../../../components/atoms/Button';
import ModemItem from '../../../components/organisms/ModemItem';
import {scaleSize} from '../../../themes/mixins';
import ModemActions from '../../../stores/modemRedux';
import Loading from '../../../components/organisms/Loading';
import RNParallax from '../../../components/organisms/RNParallax';
import Icon from '../../../components/atoms/Icon';

class ListModem extends React.Component {
  constructor(props) {
    super(props);

    const {navigation} = props;
    this.state = {
      isFetching: true,
      isRefreshing: false,
      adminId: navigation.getParam('adminId', 0),
    };
  }

  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    this.fetchModems();
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    return true;
  }

  handleOnClickItem = modemData => {
    const {adminId} = this.state;
    const {navigation} = this.props;
    navigation.navigate('DeviceListScreen', {modemData, adminId});
  };

  handleOnClickAdd = () => {
    const {adminId} = this.state;
    const {navigation, user} = this.props;
    const userId = adminId !== 0 ? adminId : user.user_id;
    navigation.navigate('CreateModemScreen', {userId});
  };

  handleOnClickEdit = modemData => {
    const {adminId} = this.state;
    const {user} = this.props;
    const {navigation} = this.props;
    const userId = adminId !== 0 ? adminId : user.user_id;
    navigation.navigate('EditModemScreen', {modemData, userId});
  };

  handleOnRefresh = () => {
    this.setState({isRefreshing: true});
    this.fetchModems();
  };

  fetchModems = () => {
    const {adminId} = this.state;
    const {user} = this.props;
    const userId = adminId !== 0 ? adminId : user.user_id;
    this.props.fetchModems(
      userId,
      () => {
        this.setState({isFetching: false, isRefreshing: false});
      },
      () => {
        this.setState({isFetching: false, isRefreshing: false});
      },
    );
  };

  renderNavBar = () => {
    const {navigation, user} = this.props;
    if (user.type === 'root') {
      return (
        <View style={styles.navBar}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Icon
              width={scaleSize(17)}
              height={scaleSize(12)}
              source={images.icBackWhite}
            />
          </TouchableOpacity>
          <Text style={styles.title}>List modem</Text>
          <View style={styles.backButton} />
        </View>
      );
    }

    return (
      <View style={styles.navBar}>
        <Text style={styles.title}>List modem</Text>
      </View>
    );
  };

  renderAddButton = () => {
    return (
      <Button
        style={styles.addButton}
        height={scaleSize(54)}
        title="Add New Modem"
        icon={images.icRoundedAdd}
        onClick={this.handleOnClickAdd}
      />
    );
  };

  renderContent = () => {
    const {isRefreshing} = this.state;
    const {listModems} = this.props;
    return (
      <View>
        <Text style={styles.modemCount}>{listModems.length + ' modems'}</Text>
        <FlatList
          style={styles.flatList}
          data={listModems}
          numColumns={2}
          renderItem={({item, index}) => (
            <ModemItem
              data={item}
              index={index}
              onClickDetail={() => this.handleOnClickItem(item)}
              onClickEdit={() => this.handleOnClickEdit(item)}
            />
          )}
          keyExtractor={item => item.id + ''}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={this.handleOnRefresh}
            />
          }
        />
      </View>
    );
  };

  render() {
    const {isFetching} = this.state;

    return (
      <View style={styles.container}>
        <RNParallax
          headerMinHeight={scaleSize(53)}
          headerMaxHeight={scaleSize(133)}
          extraScrollHeight={10}
          navbarColor={colors.primary}
          backgroundImage={images.imgMapList}
          backgroundImageScale={1}
          backgroundColor={colors.primary}
          renderAddButton={this.renderAddButton}
          renderContent={this.renderContent}
          renderNavBar={this.renderNavBar}
          containerStyle={styles.container}
          contentContainerStyle={styles.contentContainer}
          innerContainerStyle={styles.container}
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
  fetchModems: (userId, onSuccess, onError) =>
    dispatch(ModemActions.modemFetch({userId}, onSuccess, onError)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListModem);
