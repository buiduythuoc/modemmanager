import React from 'react';
import {View, FlatList} from 'react-native';
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
    };
  }

  static navigationOptions = {
    header: null,
  };

  handleOnClickAdd = () => {
    const {navigation} = this.props;
    navigation.navigate('CreateTimelineScreen');
  };

  componentDidMount() {
    const {fetchTimelines} = this.props;
    fetchTimelines(
      1,
      () => {
        this.setState({isFetching: false});
      },
      () => {
        this.setState({isFetching: false});
      },
    );
  }

  render() {
    const {isFetching} = this.state;
    const {listTimeline} = this.props;

    return (
      <View style={styles.container}>
        <TabHeader
          source={images.imgMapTimeline}
          title={'Timeline'}
          height={scaleSize(167)}
          rightIcon={images.icAdd}
          rightIconWidth={scaleSize(20)}
          rightIconHeight={scaleSize(20)}
          onRightClick={this.handleOnClickAdd}
        />
        <FlatList
          style={styles.flatList}
          data={listTimeline}
          renderItem={({item, index}) => <TimelineItem data={item} />}
          keyExtractor={item => item.id + ''}
        />
        <Loading show={isFetching} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  listTimeline: state.timeline.list,
});

const mapDispatchToProps = dispatch => ({
  fetchTimelines: (userId, onSuccess, onError) =>
    dispatch(TimelineActions.timelineFetch({userId}, onSuccess, onError)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Timeline);
