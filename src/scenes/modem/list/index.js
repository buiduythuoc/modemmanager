import React from 'react';
import {View, FlatList, BackHandler, Text} from 'react-native';
import {connect} from 'react-redux';
import {images} from '../../../themes';
import styles from './styles';
import TabHeader from '../../../components/organisms/TabHeader';
import Button from '../../../components/atoms/Button';
import ModemItem from '../../../components/organisms/ModemItem';
import {scaleSize} from '../../../themes/mixins';
import ModemActions from '../../../stores/modemRedux';
import Loading from '../../../components/organisms/Loading';

class ListModem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFetching: true,
    };
  }

  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    this.props.fetchModems(
      1,
      () => {
        this.setState({isFetching: false});
      },
      () => {
        this.setState({isFetching: false});
      },
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    return true;
  }

  handleOnClickItem = () => {
    const {navigation} = this.props;
    navigation.navigate('DeviceListScreen');
  };

  handleOnClickAdd = () => {
    const {navigation} = this.props;
    navigation.navigate('CreateModemScreen');
  };

  handleOnClickEdit = () => {
    const {navigation} = this.props;
    navigation.navigate('EditModemScreen');
  };

  render() {
    const {isFetching} = this.state;
    const {listModems} = this.props;

    return (
      <View style={styles.container}>
        <TabHeader
          source={images.imgMapList}
          title={'List Modem'}
          height={scaleSize(133)}
        />
        <Button
          style={styles.addButton}
          height={scaleSize(60)}
          title="Add New Modem"
          icon={images.icRoundedAdd}
          onClick={this.handleOnClickAdd}
        />
        <Text style={styles.modemCount}>{listModems.length + ' modems'}</Text>
        <FlatList
          style={styles.flatList}
          data={listModems}
          numColumns={2}
          renderItem={({item, index}) => (
            <ModemItem
              data={item}
              index={index}
              onClickDetail={this.handleOnClickItem}
              onClickEdit={this.handleOnClickEdit}
            />
          )}
          keyExtractor={item => item.id + ''}
        />
        <Loading show={isFetching} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  listModems: state.modem.list,
});

const mapDispatchToProps = dispatch => ({
  fetchModems: (userId, onSuccess, onError) =>
    dispatch(ModemActions.modemFetch({userId}, onSuccess, onError)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListModem);
