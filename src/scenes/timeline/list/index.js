import React from 'react';
import {View, FlatList, RefreshControl, Text} from 'react-native';
import {connect} from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import {images, colors} from '../../../themes';
import styles, {pickerSelectStyles} from './styles';
import TabHeader from '../../../components/organisms/TabHeader';
import TimelineItem from '../../../components/organisms/TimelineItem';
import {scaleSize} from '../../../themes/mixins';
import TimelineActions from '../../../stores/timelineRedux';
import ModemActions from '../../../stores/modemRedux';
import Loading from '../../../components/organisms/Loading';
import Icon from '../../../components/atoms/Icon';

class Timeline extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFetching: true,
      isRefreshing: false,
      modemItems: [],
    };
  }

  static navigationOptions = {
    header: null,
  };

  handleOnClickAdd = () => {
    const {navigation} = this.props;
    navigation.navigate('CreateTimelineScreen');
  };

  handleOnClickDetail = timelineId => {
    const {navigation} = this.props;
    navigation.navigate('TimelineDetailScreen', {timelineId});
  };

  handleOnRefresh = () => {
    this.setState({isRefreshing: true});
    this.fetchTimelines();
  };

  componentDidMount() {
    this.fetchTimelines();
    if (this.props.user.type !== 'guest') {
      this.fetchModems();
    }
  }

  fetchTimelines = () => {
    const {fetchTimelines, user, ipList} = this.props;
    fetchTimelines(
      user.user_id,
      user.type,
      ipList,
      () => {
        this.setState({isFetching: false, isRefreshing: false});
      },
      () => {
        this.setState({isFetching: false, isRefreshing: false});
      },
    );
  };

  fetchTimelinesByModemId = modemId => {
    const {fetchTimelinesByModemId, user} = this.props;
    fetchTimelinesByModemId(
      {
        userId: user.user_id,
        modemId,
      },
      () => {
        this.setState({isFetching: false, isRefreshing: false});
      },
      () => {
        this.setState({isFetching: false, isRefreshing: false});
      },
    );
  };

  fetchModems = () => {
    const {user} = this.props;
    const userId = user.user_id;
    this.props.fetchModems(
      userId,
      listModems => {
        let modemItems = listModems.map(item => {
          return {label: item.modem_name, value: item.id};
        });
        modemItems.unshift({label: 'All Modems', value: 0});
        this.setState({modemItems});
      },
      () => {},
    );
  };

  handleOnSelectModem = modemId => {
    if (modemId == 0) {
      this.fetchTimelines();
    } else {
      this.fetchTimelinesByModemId(modemId);
    }
  };

  renderTabHeader = () => {
    const {user} = this.props;
    if (user && user.type === 'admin') {
      return (
        <TabHeader
          source={images.imgMapAccount}
          title={'Timeline'}
          height={scaleSize(100)}
          rightIcon={images.icAdd}
          rightIconWidth={20}
          rightIconHeight={20}
          onRightClick={this.handleOnClickAdd}
        />
      );
    }

    return (
      <TabHeader
        source={images.imgMapAccount}
        title={'Timeline'}
        height={scaleSize(100)}
      />
    );
  };

  renderModemSelect = () => {
    const {modemItems} = this.state;
    const {user} = this.props;
    const placeholder = {
      label: 'Select a modem...',
      value: null,
      color: colors.gray06,
    };
    if (user.type === 'guest') {
      return null;
    }

    return (
      <View style={styles.modemPickerContainer}>
        <View style={styles.modemPicker}>
          <View style={styles.flatList}>
            <RNPickerSelect
              placeholder={placeholder}
              style={pickerSelectStyles}
              useNativeAndroidPickerStyle={false}
              onValueChange={modemId => this.handleOnSelectModem(modemId)}
              items={modemItems}
            />
          </View>
          <Icon
            style={{tintColor: colors.primary}}
            width={scaleSize(15)}
            height={scaleSize(8)}
            source={images.icDropdown}
          />
        </View>
      </View>
    );
  };

  renderNoData = () => {
    return (
      <View style={styles.noPostContainer}>
        <Text style={styles.noPostText}>No posts to show</Text>
      </View>
    );
  };

  render() {
    const {isFetching, isRefreshing} = this.state;
    const {listTimeline} = this.props;

    return (
      <View style={styles.container}>
        {this.renderTabHeader()}
        {listTimeline && listTimeline.length > 0 ? (
          <>
            {this.renderModemSelect()}
            <FlatList
              style={styles.flatList}
              contentContainerStyle={styles.flatListContent}
              data={listTimeline}
              renderItem={({item, index}) => (
                <TimelineItem
                  data={item}
                  onClick={() => this.handleOnClickDetail(item.id)}
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
          </>
        ) : (
          this.renderNoData()
        )}
        <Loading show={isFetching} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  listTimeline: state.timeline.list,
  ipList: state.ip.list,
});

const mapDispatchToProps = dispatch => ({
  fetchModems: (userId, onSuccess, onError) =>
    dispatch(ModemActions.modemFetch({userId}, onSuccess, onError)),
  fetchTimelines: (userId, role, listIp, onSuccess, onError) =>
    dispatch(
      TimelineActions.timelineFetch({userId, role, listIp}, onSuccess, onError),
    ),
  fetchTimelinesByModemId: (params, onSuccess, onError) =>
    dispatch(
      TimelineActions.timelineFetchByModemId(params, onSuccess, onError),
    ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Timeline);
