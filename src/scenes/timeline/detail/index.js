import React from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import NavHeader from '../../../components/molecules/NavHeader';
import ImageSlider from '../../../components/organisms/ImageSlider';
import Button from '../../../components/atoms/Button';
import Input from '../../../components/atoms/Input';
import {colors, images} from '../../../themes';
import TimelineActions from '../../../stores/timelineRedux';
import Loading from '../../../components/organisms/Loading';
import {scaleSize} from '../../../themes/mixins';

class TimelineDetail extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      timelineData: null,
      isLoading: false,
    };
  }

  componentDidMount() {
    this.fetchTimelineDetail();
  }

  handleOnClickBack = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };

  handleOnClickEdit = () => {
    const {timelineData} = this.state;
    const {navigation} = this.props;
    navigation.navigate('TimelineEditScreen', {timelineData: timelineData});
  };

  handleOnClickDelete = () => {};

  fetchTimelineDetail = () => {
    const {fetchTimeline, user, navigation, listTimeline} = this.props;
    const postId = navigation.getParam('timelineId', 0);
    if (postId === 0) {
      return;
    }

    const params = {
      userId: user.user_id,
      postId,
    };
    this.setState({isLoading: true});
    fetchTimeline(
      params,
      () => {
        const timelineData = listTimeline.find(
          timeline => timeline.id === postId,
        );
        console.log(listTimeline, timelineData);
        this.setState({isLoading: false, timelineData});
      },
      () => {
        this.setState({isLoading: false});
      },
    );
  };

  renderButtonContainer() {
    const {user} = this.props;
    if (user.type === 'admin' || user.type === 'root') {
      return (
        <View style={styles.buttonContainer}>
          <Button
            style={styles.editButton}
            title="EDIT"
            onClick={this.handleOnClickEdit}
          />
          <Button
            style={styles.deleteButton}
            title="DELETE"
            onClick={this.handleOnClickDelete}
          />
        </View>
      );
    }

    return null;
  }

  render() {
    const {isLoading, timelineData} = this.state;
    if (!timelineData) {
      return null;
    }

    return (
      <View style={styles.container}>
        <NavHeader
          title="Post Detail"
          titleColor={colors.gray01}
          leftIcon={images.icBackBlack}
          onLeftClick={this.handleOnClickBack}
        />
        {/* <ImageSlider /> */}
        <KeyboardAwareScrollView style={styles.content}>
          <Text style={styles.time}>{timelineData.created_date}</Text>
          <Text style={styles.title}>{timelineData.title}</Text>
          <Text style={styles.subTitle}>{timelineData.sub_title}</Text>
          <Text style={styles.postContent}>{timelineData.content}</Text>
          {/* <Input
            style={styles.input}
            rounded={true}
            borderColor={colors.gray04}
            borderRadius={scaleSize(30)}
            onChangeText={() => {}}
            placeholder="Write your own ......."
            placeholderTextColor={colors.gray04}
          /> */}
        </KeyboardAwareScrollView>
        {this.renderButtonContainer()}
        <Loading isLoading={isLoading} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  listTimeline: state.timeline.list,
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
  fetchTimeline: (params, onSuccess, onError) =>
    dispatch(TimelineActions.timelineDetail(params, onSuccess, onError)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TimelineDetail);
