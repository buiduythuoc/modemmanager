import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  SafeAreaView,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import NavBar from '../../../components/molecules/NavBar';
import ImageSlider from 'react-native-image-slider';
import {colors, images} from '../../../themes';
import TimelineActions from '../../../stores/timelineRedux';
import Loading from '../../../components/organisms/Loading';
import {scaleSize} from '../../../themes/mixins';
import Icon from '../../../components/atoms/Icon';
import CommentItem from '../../../components/organisms/CommentItem';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';

class TimelineDetail extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    const {navigation} = this.props;
    this.state = {
      isLoading: false,
      comment: '',
      postId: navigation.getParam('timelineId', 0),
    };
  }

  componentDidMount() {
    this.fetchTimelineDetail();
    this.fetchComments();
  }

  handleOnClickBack = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };

  handleOnClickEdit = () => {
    const {postId} = this.state;
    const {navigation} = this.props;
    navigation.navigate('TimelineEditScreen', {postId});
  };

  handleOnClickPostComment = () => {
    const {postId} = this.state;
    const {postComment, user} = this.props;
    const {comment} = this.state;
    if (postId === 0) {
      return;
    }

    const params = {
      userId: user.user_id,
      postId,
      comment,
    };
    this.setState({isLoading: true});
    postComment(
      params,
      () => {
        this.setState({isLoading: false, comment: ''});
        this.fetchComments();
      },
      () => {
        this.setState({isLoading: false});
      },
    );
  };

  handleOnClickDelete = () => {
    const {postId} = this.state;
    const {user, deleteTimeline, fetchTimeline, navigation} = this.props;
    if (postId === 0) {
      return;
    }

    Alert.alert(
      'Warning',
      'Do you want to delete this post',
      [
        {
          text: 'OK',
          onPress: () => {
            const params = {
              userId: user.user_id,
              postId,
            };
            this.setState({isLoading: true});
            deleteTimeline(
              params,
              () => {
                this.setState({isFetching: false});
                fetchTimeline({userId: user.user_id});
                navigation.goBack();
                // Alert.alert(
                //   'Success',
                //   ' Post has been deleted',
                //   [{text: 'OK', onPress: () => navigation.goBack()}],
                //   {cancelable: false},
                // );
              },
              () => {
                this.setState({isFetching: false});
              },
            );
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => {},
        },
      ],
      {cancelable: false},
    );
  };

  fetchTimelineDetail = () => {
    const {postId} = this.state;
    const {fetchTimelineDetail, user} = this.props;
    if (postId === 0) {
      return;
    }

    const params = {
      userId: user.user_id,
      postId,
    };
    this.setState({isLoading: true});
    fetchTimelineDetail(
      params,
      () => {
        this.setState({isLoading: false});
      },
      () => {
        this.setState({isLoading: false});
      },
    );
  };

  fetchComments = () => {
    const {fetchComments, user} = this.props;
    const {postId} = this.state;
    if (postId === 0) {
      return;
    }

    const params = {
      userId: user.user_id,
      postId,
    };
    this.setState({isLoading: true});
    fetchComments(
      params,
      () => {
        this.setState({isLoading: false});
      },
      () => {
        this.setState({isLoading: false});
      },
    );
  };

  getImages = (timelineData) => {
    const sliderImages = [];
    if (timelineData.img_main) {
      sliderImages.push(timelineData.img_main);
    }
    if (timelineData.img_sub1) {
      sliderImages.push(timelineData.img_sub1);
    }
    if (timelineData.img_sub2) {
      sliderImages.push(timelineData.img_sub2);
    }

    return sliderImages;
  };

  renderActionPost = () => {
    const {user} = this.props;
    if (user.type === 'admin' || user.type === 'root') {
      return (
        <View style={styles.actionPostContainer}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={this.handleOnClickEdit}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={this.handleOnClickDelete}>
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };

  render() {
    const {isLoading, comment, postId} = this.state;
    const {listTimeline} = this.props;
    const timelineData = listTimeline.find((item) => item.id === postId);
    if (!timelineData) {
      return null;
    }
    const sliderImages = this.getImages(timelineData);
    const comments = timelineData.comments;
    const isShowSendButton = comment.trim() !== '' ? true : false;
    const activeOpacity = comment.trim() !== '' ? 0.4 : 1;

    return (
      <SafeAreaView style={styles.container}>
        <NavBar
          style={styles.navBar}
          title="Post Detail"
          titleColor={colors.gray01}
          leftIcon={images.icBackBlack}
          onLeftClick={this.handleOnClickBack}
        />
        <KeyboardAwareScrollView style={styles.content}>
          {sliderImages.length > 0 && (
            <ImageSlider
              images={sliderImages}
              customSlide={({index, item, style, width}) => (
                <Image
                  source={{uri: item}}
                  style={styles.slider}
                  key={index + ''}
                />
              )}
            />
          )}
          <Text style={styles.time}>{timelineData.created_date}</Text>
          <Text style={styles.title}>{timelineData.title}</Text>
          <Text style={styles.subTitle}>{timelineData.sub_title}</Text>
          <Text style={styles.postContent}>{timelineData.content}</Text>
          {this.renderActionPost()}
          <View style={styles.inputContainer}>
            <AutoGrowingTextInput
              style={styles.input}
              placeholder="Write your own ......."
              value={comment}
              onChangeText={(text) => this.setState({comment: text})}
            />
            {isShowSendButton && (
              <TouchableOpacity
                activeOpacity={activeOpacity}
                onPress={this.handleOnClickPostComment}>
                <Icon
                  style={styles.sendIcon}
                  source={images.icSendActive}
                  width={scaleSize(35)}
                  height={scaleSize(35)}
                />
              </TouchableOpacity>
            )}
          </View>
          <FlatList
            style={styles.flatList}
            data={comments}
            renderItem={({item, index}) => <CommentItem data={item} />}
            keyExtractor={(item) => item.id + ''}
          />
        </KeyboardAwareScrollView>
        <Loading isLoading={isLoading} />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  listTimeline: state.timeline.list,
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTimelineDetail: (params, onSuccess, onError) =>
    dispatch(TimelineActions.timelineDetail(params, onSuccess, onError)),
  fetchTimeline: (params, onSuccess, onError) =>
    dispatch(TimelineActions.timelineFetch(params, onSuccess, onError)),
  fetchComments: (params, onSuccess, onError) =>
    dispatch(TimelineActions.timelineFetchComments(params, onSuccess, onError)),
  postComment: (params, onSuccess, onError) =>
    dispatch(TimelineActions.timelinePostComment(params, onSuccess, onError)),
  deleteTimeline: (params, onSuccess, onError) =>
    dispatch(TimelineActions.timelineDelete(params, onSuccess, onError)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TimelineDetail);
