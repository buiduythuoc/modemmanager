import React from 'react';
import {View, FlatList, Text} from 'react-native';
import {connect} from 'react-redux';
import {images} from '../../../themes';
import styles from './styles';
import TabHeader from '../../../components/organisms/TabHeader';
import AccountItem from '../../../components/organisms/AccountItem';
import {scaleSize} from '../../../themes/mixins';
import AccountActions from '../../../stores/accountRedux';
import Loading from '../../../components/organisms/Loading';

class AccountList extends React.Component {
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
    const {fetchAccounts, user} = this.props;
    fetchAccounts(
      user.user_id,
      () => {
        this.setState({isFetching: false});
      },
      () => {
        this.setState({isFetching: false});
      },
    );
  }

  handleOnClickAccountDetail = account => {
    const {navigation} = this.props;
    navigation.navigate('AccountDetailDetailScreen', {userId: account.id});
  };

  handleOnClickModemManagement = account => {
    const {navigation} = this.props;
    navigation.navigate('ListModemScreen', {adminId: account.id});
  };

  handleOnClickSettingNotification = () => {
    const {navigation} = this.props;
    navigation.navigate('NotificationSettingScreen');
  };

  render() {
    const {isFetching} = this.state;
    const {accounts} = this.props;
    return (
      <View style={styles.container}>
        <TabHeader
          source={images.imgMapAccount}
          title={'List Accounts'}
          height={scaleSize(100)}
          rightIcon={images.icSetting}
          onRightClick={this.handleOnClickSettingNotification}
        />
        <Text style={styles.accountCount}>{accounts.length + ' Accounts'}</Text>
        <FlatList
          style={styles.flatList}
          data={accounts}
          renderItem={({item}) => (
            <AccountItem
              data={item}
              onClickAccountDetail={() => this.handleOnClickAccountDetail(item)}
              onClickModemManagement={() =>
                this.handleOnClickModemManagement(item)
              }
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
  user: state.auth.user,
  accounts: state.account.list,
});

const mapDispatchToProps = dispatch => ({
  fetchAccounts: (userId, onSuccess, onError) =>
    dispatch(AccountActions.accountFetch({userId}, onSuccess, onError)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccountList);
