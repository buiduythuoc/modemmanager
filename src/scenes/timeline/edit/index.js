import React from 'react';
import {View, Text, Alert} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import {images, colors} from '../../../themes';
import styles from './styles';
import Button from '../../../components/atoms/Button';
import NavHeader from '../../../components/molecules/NavHeader';
import LabelInput from '../../../components/molecules/LabelInput';
import ImagePicker from '../../../components/molecules/ImagePicker';
import {scaleSize} from '../../../themes/mixins';
import TimelineActions from '../../../stores/timelineRedux';
import ModemActions from '../../../stores/modemRedux';
import Loading from '../../../components/organisms/Loading';

class EditTimeline extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    const {navigation} = props;
    this.state = {
      modemItems: [],
      timelineData: navigation.getParam('timelineData', null),
      isLoading: false,
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

  handleOnClickUpdate = () => {
    const {editTimeline, fetchTimelines, navigation, user} = this.props;
    const {timelineData} = this.state;
    const params = {
      timelineId: timelineData.id,
      modemId: 1,
      title: timelineData.title,
      subTitle: timelineData.sub_title,
      content: timelineData.content,
      userId: user.user_id,
    };

    this.setState({isLoading: true});
    editTimeline(
      params,
      () => {
        this.setState({isLoading: false});
        fetchTimelines(user.user_id);
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
  };

  render() {
    const {modemItems, timelineData, isLoading} = this.state;
    return (
      <View style={styles.container}>
        <NavHeader
          title="Edit Post"
          titleColor={colors.gray01}
          leftIcon={images.icBackBlack}
          onLeftClick={this.handleOnClickBack}
        />
        <View style={styles.content}>
          <KeyboardAwareScrollView contentContainerStyle={styles.scrollView}>
            <Text style={styles.imageText}>Picture</Text>
            <View style={styles.imageContainer}>
              <ImagePicker style={styles.imagePicker} />
              <ImagePicker style={styles.imagePicker} />
              <ImagePicker style={styles.imagePicker} />
              <ImagePicker style={styles.imagePicker} />
              <ImagePicker />
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
              onChangeText={text =>
                this.setState({timelineData: {...timelineData, content: text}})
              }
            />
            <Button
              style={styles.postButton}
              height={scaleSize(45)}
              title="UPDATE"
              onClick={this.handleOnClickUpdate}
            />
          </KeyboardAwareScrollView>
        </View>
        <Loading isLoading={isLoading} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  listModems: state.modem.list,
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
  editTimeline: (params, onSuccess, onError) =>
    dispatch(TimelineActions.timelineEdit(params, onSuccess, onError)),
  fetchModems: (userId, onSuccess, onError) =>
    dispatch(ModemActions.modemFetch({userId}, onSuccess, onError)),
  fetchTimelines: (userId, onSuccess, onError) =>
    dispatch(TimelineActions.timelineFetch({userId}, onSuccess, onError)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditTimeline);
