import React from 'react';
import {View, Text, Alert, SafeAreaView} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import RNImagePicker from 'react-native-image-picker';
import {images, colors} from '../../../themes';
import styles from './styles';
import Button from '../../../components/atoms/Button';
import NavBar from '../../../components/molecules/NavBar';
import LabelInput from '../../../components/molecules/LabelInput';
import ImagePicker from '../../../components/molecules/ImagePicker';
import {scaleSize} from '../../../themes/mixins';
import TimelineActions from '../../../stores/timelineRedux';
import ModemActions from '../../../stores/modemRedux';
import Loading from '../../../components/organisms/Loading';
import ImagePickerHelper from '../../../helpers/ImagePickerHelper';

class EditTimeline extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    const {navigation, listTimeline} = props;
    const postId = navigation.getParam('postId', 0);
    const timelineData = listTimeline.find(item => item.id === postId);

    this.state = {
      modemItems: [],
      isLoading: false,
      timelineData,
      imageSource1: {uri: timelineData.img_main, image: ''},
      imageSource2: {uri: timelineData.img_sub1, image: ''},
      imageSource3: {uri: timelineData.img_sub2, image: ''},
    };
  }

  componentDidMount() {
    const {listModems} = this.props;
    if (listModems.length === 0) {
      this.fetchModems();
    } else {
      const modemItems = listModems.map(item => {
        return {label: item.modem_name, value: item.id};
      });
      this.setState({modemItems});
    }
  }

  fetchModems = () => {
    const {user, listModems} = this.props;
    const userId = user.user_id;
    this.setState({isLoading: true});
    this.props.fetchModems(
      userId,
      () => {
        const modemItems = listModems.map(item => {
          return {label: item.modem_name, value: item.id};
        });
        this.setState({isLoading: false, modemItems});
      },
      () => {
        this.setState({isLoading: false});
      },
    );
  };

  handleOnClickBack = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };

  async handleOnClickUpdate() {
    const {editTimeline, fetchTimelines, navigation, user, ipList} = this.props;
    const {timelineData, imageSource1, imageSource2, imageSource3} = this.state;

    this.setState({isLoading: true});
    const params = {
      timelineId: timelineData.id,
      modemId: 1,
      title: timelineData.title,
      subTitle: timelineData.sub_title,
      content: timelineData.content,
      userId: user.user_id,
      imgMain: await ImagePickerHelper.resizeImage(imageSource1.image),
      img1: await ImagePickerHelper.resizeImage(imageSource2.image),
      img2: await ImagePickerHelper.resizeImage(imageSource3.image),
    };
    editTimeline(
      params,
      () => {
        this.setState({isLoading: false});
        fetchTimelines(user.user_id, user.type, ipList);
        Alert.alert(
          'Success',
          'Post updated',
          [{text: 'OK', onPress: () => navigation.goBack()}],
          {cancelable: false},
        );
      },
      () => {
        this.setState({isLoading: false});
        Alert.alert('Error', 'Some error');
      },
    );
  }

  handleOnSelectImage = setState => () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    RNImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri, image: response};
        setState(source);
        console.log(setState);
      }
    });
  };

  render() {
    const {
      imageSource1,
      imageSource2,
      imageSource3,
      timelineData,
      isLoading,
    } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <NavBar
          title="Edit Post"
          titleColor={colors.gray01}
          leftIcon={images.icBackBlack}
          onLeftClick={this.handleOnClickBack}
        />
        <View style={styles.content}>
          <KeyboardAwareScrollView contentContainerStyle={styles.scrollView}>
            <Text style={styles.imageText}>Picture</Text>
            <View style={styles.imageContainer}>
              <ImagePicker
                style={styles.imagePicker}
                source={imageSource1.uri ? {uri: imageSource1.uri} : null}
                onSelect={this.handleOnSelectImage(source =>
                  this.setState({imageSource1: source}),
                )}
                onClickDelete={() =>
                  this.setState({imageSource1: {uri: null, image: 'delete'}})
                }
              />
              <ImagePicker
                style={styles.imagePicker}
                source={imageSource2.uri ? {uri: imageSource2.uri} : null}
                onSelect={this.handleOnSelectImage(source =>
                  this.setState({imageSource2: source}),
                )}
                onClickDelete={() =>
                  this.setState({imageSource2: {uri: null, image: 'delete'}})
                }
              />
              <ImagePicker
                style={styles.imagePicker}
                source={imageSource3.uri ? {uri: imageSource3.uri} : null}
                onSelect={this.handleOnSelectImage(source =>
                  this.setState({imageSource3: source}),
                )}
                onClickDelete={() =>
                  this.setState({imageSource3: {uri: null, image: 'delete'}})
                }
              />
            </View>
            <Text style={styles.label}>Modem Name</Text>
            <LabelInput
              style={styles.inputContainer}
              label="Title"
              labelStyle={styles.label}
              borderColor={colors.gray04}
              inputStyle={styles.titleInput}
              rounded={true}
              placeholder="Write your own ......."
              placeholderTextColor={colors.gray05}
              value={timelineData.title}
              onChangeText={text =>
                this.setState({timelineData: {...timelineData, title: text}})
              }
            />
            <LabelInput
              style={styles.inputContainer}
              label="Summary"
              labelStyle={styles.label}
              borderColor={colors.gray04}
              inputStyle={styles.summaryInput}
              rounded={true}
              placeholder="Write your own ......."
              placeholderTextColor={colors.gray05}
              value={timelineData.sub_title}
              multiline={true}
              onChangeText={text =>
                this.setState({
                  timelineData: {...timelineData, sub_title: text},
                })
              }
            />
            <LabelInput
              style={styles.inputContainer}
              label="Content"
              labelStyle={styles.label}
              borderColor={colors.gray04}
              inputStyle={styles.contentInput}
              rounded={true}
              placeholder="Write your own ......."
              placeholderTextColor={colors.gray05}
              value={timelineData.content}
              multiline={true}
              onChangeText={text =>
                this.setState({timelineData: {...timelineData, content: text}})
              }
            />
            <Button
              style={styles.postButton}
              height={scaleSize(45)}
              title="UPDATE"
              onClick={() => this.handleOnClickUpdate()}
            />
          </KeyboardAwareScrollView>
        </View>
        <Loading show={isLoading} />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  listTimeline: state.timeline.list,
  listModems: state.modem.list,
  user: state.auth.user,
  ipList: state.ip.list,
});

const mapDispatchToProps = dispatch => ({
  editTimeline: (params, onSuccess, onError) =>
    dispatch(TimelineActions.timelineEdit(params, onSuccess, onError)),
  fetchModems: (userId, onSuccess, onError) =>
    dispatch(ModemActions.modemFetch({userId}, onSuccess, onError)),
  fetchTimelines: (userId, role, listIp, onSuccess, onError) =>
    dispatch(
      TimelineActions.timelineFetch({userId, role, listIp}, onSuccess, onError),
    ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditTimeline);
