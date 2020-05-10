import React from 'react';
import {View, Text, Alert, SafeAreaView} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import {images, colors} from '../../../themes';
import styles, {pickerSelectStyles} from './styles';
import Button from '../../../components/atoms/Button';
import NavBar from '../../../components/molecules/NavBar';
import LabelInput from '../../../components/molecules/LabelInput';
import {scaleSize} from '../../../themes/mixins';
import AccountActions from '../../../stores/accountRedux';
import Loading from '../../../components/organisms/Loading';

class PushNotification extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      content: '',
      type: 1,
    };
  }

  handleOnClickPost = () => {
    const {pushNotification, user} = this.props;
    const {title, content, type} = this.state;
    if (!title || !content) {
      return;
    }
    this.setState({isLoading: true});
    const params = {
      userId: user.user_id,
      title,
      content,
      type,
    };

    pushNotification(
      params,
      () => {
        this.setState({isLoading: false});
        Alert.alert(
          'Success',
          'Push notification successfully',
          [{text: 'OK', onPress: () => {}}],
          {cancelable: false},
        );
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

  render() {
    const {title, content, isLoading} = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <NavBar
          title="Push Notification"
          titleColor={colors.gray01}
          leftIcon={images.icBackBlack}
          onLeftClick={this.handleOnClickBack}
        />
        <KeyboardAwareScrollView contentContainerStyle={styles.scrollView}>
          <Text style={styles.label}>Target</Text>
          <RNPickerSelect
            style={pickerSelectStyles}
            onValueChange={value => this.setState({type: value})}
            items={[
              {
                label: 'All',
                value: 0,
              },
              {
                label: 'Admin',
                value: 1,
              },
              {
                label: 'Guest',
                value: 2,
              },
            ]}
            useNativeAndroidPickerStyle={false}
          />
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
            title="SEND"
            onClick={() => this.handleOnClickPost()}
          />
        </KeyboardAwareScrollView>
        <Loading show={isLoading} />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
  pushNotification: (params, onSuccess, onError) =>
    dispatch(
      AccountActions.accountPushNotification(params, onSuccess, onError),
    ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PushNotification);
