import React from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
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
import Icon from '../../../components/atoms/Icon';
import CommentItem from '../../../components/organisms/CommentItem';

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
      commentInputHeight: scaleSize(47),
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

  handleOnClickDelete = () => {};

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

  fetchTimelineDetail = () => {
    const {postId} = this.state;
    const {fetchTimeline, user} = this.props;
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
    const {isLoading, comment, commentInputHeight, postId} = this.state;
    const {listTimeline} = this.props;
    const timelineData = listTimeline.find(item => item.id === postId);
    const comments = timelineData ? timelineData.comments : [];
    const sendImage =
      comment.trim() !== '' ? images.icSendActive : images.icSendInactive;
    const activeOpacity = comment.trim() !== '' ? 0.4 : 1;
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
          <View style={styles.inputContainer}>
            <Input
              style={{
                ...styles.input,
                height: commentInputHeight,
              }}
              rounded={true}
              borderColor={colors.gray04}
              borderRadius={scaleSize(30)}
              onChangeText={text => this.setState({comment: text})}
              placeholder="Write your own ......."
              placeholderTextColor={colors.gray04}
              multiline={true}
              value={comment}
              onContentSizeChange={e => {
                const inputHeight =
                  comment.trim() === ''
                    ? scaleSize(47)
                    : scaleSize(47) + e.nativeEvent.contentSize.height;
                console.log(
                  inputHeight,
                  e.nativeEvent.contentSize.height,
                  comment,
                );
                this.setState({
                  commentInputHeight: inputHeight,
                });
              }}
            />
            <TouchableOpacity
              activeOpacity={activeOpacity}
              onPress={this.handleOnClickPostComment}>
              <Icon
                source={sendImage}
                width={scaleSize(40)}
                height={scaleSize(40)}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            style={styles.flatList}
            data={comments}
            renderItem={({item, index}) => <CommentItem data={item} />}
            keyExtractor={item => item.id + ''}
          />
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
  fetchComments: (params, onSuccess, onError) =>
    dispatch(TimelineActions.timelineFetchComments(params, onSuccess, onError)),
  postComment: (params, onSuccess, onError) =>
    dispatch(TimelineActions.timelinePostComment(params, onSuccess, onError)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TimelineDetail);
