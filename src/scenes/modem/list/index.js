import React from 'react';
import {View, FlatList, BackHandler, Text, RefreshControl} from 'react-native';
import {connect} from 'react-redux';
import {images, colors} from '../../../themes';
import styles from './styles';
import Button from '../../../components/atoms/Button';
import ModemItem from '../../../components/organisms/ModemItem';
import {scaleSize} from '../../../themes/mixins';
import ModemActions from '../../../stores/modemRedux';
import Loading from '../../../components/organisms/Loading';
import RNParallax from '../../../components/organisms/RNParallax';

class ListModem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFetching: true,
      isRefreshing: false,
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
    const {navigation} = this.props;
    navigation.navigate('DeviceListScreen', {modemData});
  };

  handleOnClickAdd = () => {
    const {navigation} = this.props;
    navigation.navigate('CreateModemScreen');
  };

  handleOnClickEdit = modemData => {
    const {navigation} = this.props;
    navigation.navigate('EditModemScreen', {modemData});
  };

  handleOnRefresh = () => {
    this.setState({isRefreshing: true});
    this.fetchModems();
  };

  fetchModems = () => {
    const {user} = this.props;
    const userId = user.user_id;
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
    return (
      <View>
        <Button
          style={styles.addButton}
          height={scaleSize(54)}
          title="Add New Modem"
          icon={images.icRoundedAdd}
          onClick={this.handleOnClickAdd}
        />
      </View>
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
          headerMinHeight={scaleSize(54)}
          headerMaxHeight={scaleSize(133)}
          extraScrollHeight={10}
          navbarColor={colors.primary}
          backgroundImage={images.imgMapList}
          backgroundColor={colors.primary}
          renderAddButton={this.renderNavBar}
          renderContent={this.renderContent}
          containerStyle={styles.container}
          contentContainerStyle={styles.contentContainer}
          innerContainerStyle={styles.container}
          scrollViewProps={{
            onScrollBeginDrag: () => console.log('onScrollBeginDrag'),
            onScrollEndDrag: () => console.log('onScrollEndDrag'),
          }}
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
