import React from 'react';
import {View, FlatList, RefreshControl} from 'react-native';
import {connect} from 'react-redux';
import _ from 'lodash';
import {images} from '../../../themes';
import styles from './styles';
import TabHeader from '../../../components/organisms/TabHeader';
import NotificationItem from '../../../components/organisms/NotificationItem';
import NotificationActions from '../../../stores/notificationRedux';
import {scaleSize} from '../../../themes/mixins';
import Loading from '../../../components/organisms/Loading';
import Firebase from '../../../configs/firebase';

class Notification extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listNotifications: [],
      isFetching: true,
      isRefreshing: false,
    };
  }

  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    this.fetchNotifications();
  }

  fetchNotifications() {
    const {user, setIsNew} = this.props;

    if (user.type === 'admin') {
      const adminId = user.user_id;
      const ref = 'admins/' + adminId + '/modems';
      Firebase.database()
        .ref(ref)
        .on('value', snap => {
          const listNotifications = [];
          snap.forEach(modem => {
            const notifications = modem.val().notifications;
            for (let key in notifications) {
              listNotifications.push(notifications[key]);
            }
          });
          // get notification which is pushed by root
          Firebase.database()
            .ref('notifications/admins')
            .on('value', snap1 => {
              for (let key1 in snap1.val()) {
                listNotifications.push(snap1.val()[key1]);
              }
              listNotifications.sort((a, b) => {
                const date1 = new Date(a.created_at);
                const date2 = new Date(b.created_at);
                return date2 - date1;
              });
              // if (
              //   listNotifications.length >
              //     this.state.listNotifications.length &&
              //   this.state.listNotifications.length !== 0
              // ) {
              //   setIsNew(true);
              // }
              this.setState({
                listNotifications,
                isFetching: false,
                isRefreshing: false,
              });
            });
        });
    } else {
      const ref = 'notifications/guest';
      Firebase.database()
        .ref(ref)
        .on('value', snap => {
          const listNotifications = [];
          for (let key in snap.val()) {
            listNotifications.push(snap.val()[key]);
          }
          listNotifications.sort((a, b) => {
            const date1 = new Date(a.created_at);
            const date2 = new Date(b.created_at);
            return date2 - date1;
          });
          if (!_.isEqual(listNotifications, this.state.listNotifications)) {
            setIsNew(true);
          }
          this.setState({
            listNotifications,
            isFetching: false,
            isRefreshing: false,
          });
        });
    }
  }

  handleOnRefresh = () => {
    this.setState({isRefreshing: true, isFetching: false});
    this.fetchNotifications();
  };

  handleOnClickItem = item => {
    const {navigation} = this.props;
    navigation.navigate('NotificationDetailScreen', {data: item});
  };

  render() {
    const {listNotifications, isFetching, isRefreshing} = this.state;
    return (
      <View style={styles.container}>
        <TabHeader
          source={images.imgMapAccount}
          title={'Notification'}
          height={scaleSize(100)}
        />
        <FlatList
          style={styles.flatList}
          contentContainerStyle={styles.flatListContainer}
          data={listNotifications}
          renderItem={({item}) => (
            <NotificationItem
              data={item}
              onClick={() => this.handleOnClickItem(item)}
            />
          )}
          keyExtractor={(item, index) => index + ''}
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

const mapDispatchToProps = dispatch => ({
  setIsNew: isNew => dispatch(NotificationActions.notificationSetIsNew(isNew)),
});

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Notification);
