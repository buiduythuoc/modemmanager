import React from 'react';
import {View, Alert, Text} from 'react-native';
import {connect} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import RNPickerSelect from 'react-native-picker-select';
import {images, colors} from '../../../themes';
import styles from './styles';
import Button from '../../../components/atoms/Button';
import NavHeader from '../../../components/molecules/NavHeader';
import LabelInput from '../../../components/molecules/LabelInput';
import {scaleSize} from '../../../themes/mixins';
import ModemActions from '../../../stores/modemRedux';
import Loading from '../../../components/organisms/Loading';

class CreateModem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modemName: '',
      domainName: '',
      port: '',
      loginName: '',
      loginPassword: '',
      isFetching: false,
    };
  }

  static navigationOptions = {
    header: null,
  };

  handleOnClickBack = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };

  handleOnClickSave = () => {
    const {addModem, fetchModems, navigation, user} = this.props;
    const {modemName, domainName, port, loginName, loginPassword} = this.state;
    const params = {
      modemName,
      domainName,
      port,
      loginName,
      loginPassword,
      userId: user.user_id,
    };
    if (!modemName || !domainName || !port || !loginName || !loginPassword) {
      return;
    }
    this.setState({isFetching: true});
    addModem(
      params,
      () => {
        this.setState({isFetching: false});
        fetchModems(user.user_id);
        Alert.alert(
          'Success',
          'Modem created',
          [{text: 'OK', onPress: () => navigation.goBack()}],
          {cancelable: false},
        );
      },
      () => {
        this.setState({isFetching: false});
        Alert.alert('Error', 'Some error');
      },
    );
  };

  render() {
    const {
      isFetching,
      modemName,
      domainName,
      port,
      loginName,
      loginPassword,
    } = this.state;

    return (
      <View style={styles.container}>
        <NavHeader
          title="Add a new modem"
          titleColor={colors.gray01}
          leftIcon={images.icBackBlack}
          onLeftClick={this.handleOnClickBack}
        />
        <KeyboardAwareScrollView style={styles.content}>
          <LabelInput
            style={styles.modemNameInput}
            inputStyle={styles.input}
            label="Modem Name"
            labelStyle={styles.labelStyle}
            borderColor={colors.gray04}
            iconSrc={images.icWifiBlack}
            iconWidth={scaleSize(13)}
            iconHeight={scaleSize(10)}
            placeholder="New modem name"
            placeholderTextColor={colors.gray05}
            onChangeText={text => this.setState({modemName: text})}
            value={modemName}
          />
          <LabelInput
            style={styles.domainNameInput}
            inputStyle={styles.input}
            label="Domain Name"
            labelStyle={styles.labelStyle}
            borderColor={colors.gray04}
            iconSrc={images.icDomainBlack}
            iconWidth={scaleSize(13)}
            iconHeight={scaleSize(13)}
            placeholder="Domain Name"
            placeholderTextColor={colors.gray05}
            onChangeText={text => this.setState({domainName: text})}
            value={domainName}
          />
          <LabelInput
            style={styles.portInput}
            inputStyle={styles.input}
            label="Port"
            labelStyle={styles.labelStyle}
            borderColor={colors.gray04}
            iconSrc={images.icPortBlack}
            iconWidth={scaleSize(13)}
            iconHeight={scaleSize(13)}
            placeholder="Port"
            placeholderTextColor={colors.gray05}
            onChangeText={text => this.setState({port: text})}
            value={port}
          />
          <LabelInput
            style={styles.portInput}
            inputStyle={styles.input}
            label="Provider"
            labelStyle={styles.labelStyle}
            borderColor={colors.gray04}
            iconSrc={images.icProvider}
            iconWidth={scaleSize(15)}
            iconHeight={scaleSize(15)}
            renderInput={() => (
              <View style={styles.picker}>
                <RNPickerSelect
                  onValueChange={value => this.setState({modemId: value})}
                  items={[
                    {label: 'FPT', value: 'fpt'},
                    {label: 'VNPT', value: 'vnpt'},
                    {label: 'VIETTEL', value: 'viettel'},
                  ]}
                />
              </View>
            )}
          />
          <LabelInput
            style={styles.portInput}
            inputStyle={styles.input}
            label="Provider Modem"
            labelStyle={styles.labelStyle}
            borderColor={colors.gray04}
            iconSrc={images.icProvider}
            iconWidth={scaleSize(15)}
            iconHeight={scaleSize(15)}
            renderInput={() => (
              <View style={styles.picker}>
                <RNPickerSelect
                  onValueChange={value => this.setState({modemId: value})}
                  items={[
                    {label: 'FPT', value: 'fpt'},
                    {label: 'VNPT', value: 'vnpt'},
                    {label: 'VIETTEL', value: 'viettel'},
                  ]}
                />
              </View>
            )}
          />
          <LabelInput
            style={styles.userNameInput}
            inputStyle={styles.input}
            label="User Name"
            labelStyle={styles.labelStyle}
            borderColor={colors.gray04}
            iconSrc={images.icUserBlack}
            iconWidth={scaleSize(11)}
            iconHeight={scaleSize(14)}
            placeholder="User Name"
            placeholderTextColor={colors.gray05}
            onChangeText={text => this.setState({loginName: text})}
            value={loginName}
          />
          <LabelInput
            style={styles.passwordInput}
            inputStyle={styles.input}
            label="Password"
            labelStyle={styles.labelStyle}
            borderColor={colors.gray04}
            iconSrc={images.icLockBlack}
            iconWidth={scaleSize(11)}
            iconHeight={scaleSize(13)}
            placeholder="Password"
            placeholderTextColor={colors.gray05}
            secureTextEntry={true}
            onChangeText={text => this.setState({loginPassword: text})}
            value={loginPassword}
          />
          <Button
            style={styles.saveButton}
            height={scaleSize(45)}
            title="SAVE"
            onClick={this.handleOnClickSave}
          />
        </KeyboardAwareScrollView>
        <Loading show={isFetching} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
  addModem: (params, onSuccess, onError) =>
    dispatch(ModemActions.modemAdd(params, onSuccess, onError)),
  fetchModems: (userId, onSuccess, onError) =>
    dispatch(ModemActions.modemFetch({userId}, onSuccess, onError)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateModem);
