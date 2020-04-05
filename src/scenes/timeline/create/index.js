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

class CreateTimeline extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      subTitle: '',
      modemId: '',
      content: '',
      modemItems: [],
      isLoading: false,
      imageSource1: {uri: null, base64: ''},
      imageSource2: {uri: null, base64: ''},
      imageSource3: {uri: null, base64: ''},
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
    const {user} = this.props;
    const userId = user.user_id;
    this.setState({isLoading: true});
    this.props.fetchModems(
      userId,
      listModems => {
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

  handleOnClickPost = () => {
    const {addTimeline, fetchTimelines, navigation, user} = this.props;
    const {
      modemId,
      title,
      subTitle,
      content,
      imageSource1,
      imageSource2,
      imageSource3,
    } = this.state;
    const params = {
      modemId,
      title,
      subTitle,
      content,
      userId: user.user_id,
      imgMain: imageSource1.base64,
      img1: imageSource2.base64,
      img2: imageSource3.base64,
    };
    if (!modemId || !title || !subTitle || !content) {
      return;
    }
    this.setState({isLoading: true});
    addTimeline(
      params,
      () => {
        this.setState({isLoading: false});
        fetchTimelines(user.user_id);
        Alert.alert(
          'Success',
          'Post created',
          [{text: 'OK', onPress: () => navigation.goBack()}],
          {cancelable: false},
        );
      },
      () => {
        this.setState({isLoading: false});
        Alert.alert('Error', 'Some error');
      },
    );
  };

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
        const source = {uri: response.uri, base64: response.data};
        setState(source);
        console.log(setState);
      }
    });
  };

  render() {
    const {
      title,
      subTitle,
      content,
      modemItems,
      isLoading,
      imageSource1,
      imageSource2,
      imageSource3,
    } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <NavBar
          title="New Post"
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
                  this.setState({imageSource1: {uri: null, base64: ''}})
                }
              />
              <ImagePicker
                style={styles.imagePicker}
                source={imageSource2.uri ? {uri: imageSource2.uri} : null}
                onSelect={this.handleOnSelectImage(source =>
                  this.setState({imageSource2: source}),
                )}
                onClickDelete={() =>
                  this.setState({imageSource2: {uri: null, base64: ''}})
                }
              />
              <ImagePicker
                style={styles.imagePicker}
                source={imageSource3.uri ? {uri: imageSource3.uri} : null}
                onSelect={this.handleOnSelectImage(source =>
                  this.setState({imageSource3: source}),
                )}
                onClickDelete={() =>
                  this.setState({imageSource3: {uri: null, base64: ''}})
                }
              />
            </View>
            <Text style={styles.label}>Modem Name</Text>
            <View style={styles.modemPicker}>
              <RNPickerSelect
                onValueChange={value => this.setState({modemId: value})}
                items={modemItems}
              />
            </View>
            <LabelInput
              style={styles.inputContainer}
              label="Title"
              labelStyle={styles.label}
              borderColor={colors.gray04}
              inputStyle={styles.titleInput}
              rounded={true}
              placeholder="Write your own ......."
              placeholderTextColor={colors.gray05}
              value={title}
              onChangeText={text => this.setState({title: text})}
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
              value={subTitle}
              multiline={true}
              onChangeText={text => this.setState({subTitle: text})}
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
              value={content}
              multiline={true}
              onChangeText={text => this.setState({content: text})}
            />
            <Button
              style={styles.postButton}
              height={scaleSize(45)}
              title="POST"
              onClick={this.handleOnClickPost}
            />
          </KeyboardAwareScrollView>
        </View>
        <Loading isLoading={isLoading} />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  listModems: state.modem.list,
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
  addTimeline: (params, onSuccess, onError) =>
    dispatch(TimelineActions.timelineAdd(params, onSuccess, onError)),
  fetchModems: (userId, onSuccess, onError) =>
    dispatch(ModemActions.modemFetch({userId}, onSuccess, onError)),
  fetchTimelines: (userId, onSuccess, onError) =>
    dispatch(TimelineActions.timelineFetch({userId}, onSuccess, onError)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateTimeline);
