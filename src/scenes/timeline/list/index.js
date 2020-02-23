import React from 'react';
import {View, FlatList, RefreshControl} from 'react-native';
import {connect} from 'react-redux';
import {images} from '../../../themes';
import styles from './styles';
import TabHeader from '../../../components/organisms/TabHeader';
import TimelineItem from '../../../components/organisms/TimelineItem';
import {scaleSize} from '../../../themes/mixins';
import TimelineActions from '../../../stores/timelineRedux';
import Loading from '../../../components/organisms/Loading';

class Timeline extends React.Component {
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
  }

  fetchTimelines = () => {
    const {fetchTimelines, user} = this.props;
    fetchTimelines(
      user.user_id,
      user.type,
      () => {
        this.setState({isFetching: false, isRefreshing: false});
      },
      () => {
        this.setState({isFetching: false, isRefreshing: false});
      },
    );
  };

  renderTabHeader = () => {
    const {user} = this.props;
    if (user && (user.type === 'admin' || user.type === 'root')) {
      return (
        <TabHeader
          source={images.imgMapAccount}
          title={'Timeline'}
          height={scaleSize(100)}
          rightIcon={images.icAdd}
          rightIconWidth={scaleSize(20)}
          rightIconHeight={scaleSize(20)}
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

  render() {
    const {isFetching, isRefreshing} = this.state;
    const {listTimeline} = this.props;

    return (
      <View style={styles.container}>
        {this.renderTabHeader()}
        <FlatList
          style={styles.flatList}
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
        <Loading show={isFetching} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  listTimeline: state.timeline.list,
});

const mapDispatchToProps = dispatch => ({
  fetchTimelines: (userId, role, onSuccess, onError) =>
    dispatch(TimelineActions.timelineFetch({userId, role}, onSuccess, onError)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Timeline);
