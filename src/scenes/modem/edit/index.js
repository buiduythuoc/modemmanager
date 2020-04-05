import React from 'react';
import {View, Alert, SafeAreaView} from 'react-native';
import {connect} from 'react-redux';
import {images, colors} from '../../../themes';
import styles from './styles';
import Button from '../../../components/atoms/Button';
import NavBar from '../../../components/molecules/NavBar';
import LabelInput from '../../../components/molecules/LabelInput';
import {scaleSize} from '../../../themes/mixins';
import ModemActions from '../../../stores/modemRedux';
import Loading from '../../../components/organisms/Loading';

class EditModem extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    const {navigation} = props;
    this.state = {
      modemData: navigation.getParam('modemData', null),
      userId: navigation.getParam('userId', 0),
      isLoading: false,
    };
  }

  handleOnClickBack = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };

  handleOnClickUpdate = () => {
    const {editModem, fetchModems, navigation, user} = this.props;
    const {modemData, userId} = this.state;
    const params = {
      modemId: modemData.id,
      modemName: modemData.modem_name,
      domainName: modemData.domain,
      port: modemData.port,
      loginName: modemData.login_name,
      loginPassword: modemData.login_pass,
      userId: user.user_id,
    };
    this.setState({isFetching: true});
    editModem(
      params,
      () => {
        this.setState({isFetching: false});
        fetchModems(userId);
        Alert.alert(
          'Success',
          'Modem updated',
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
    const {modemData, isLoading} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <NavBar
          title="Edit modem"
          titleColor={colors.gray01}
          leftIcon={images.icBackBlack}
          onLeftClick={this.handleOnClickBack}
        />
        <View style={styles.content}>
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
            value={modemData.modem_name}
            onChangeText={text =>
              this.setState({modemData: {...modemData, modem_name: text}})
            }
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
            value={modemData.domain}
            onChangeText={text =>
              this.setState({modemData: {...modemData, domain: text}})
            }
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
            value={modemData.port + ''}
            onChangeText={text =>
              this.setState({modemData: {...modemData, port: text}})
            }
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
            value={modemData.login_name}
            onChangeText={text =>
              this.setState({modemData: {...modemData, login_name: text}})
            }
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
            value={modemData.login_pass}
            onChangeText={text =>
              this.setState({modemData: {...modemData, login_pass: text}})
            }
          />
          <Button
            style={styles.updateButton}
            height={scaleSize(45)}
            title="UPDATE"
            onClick={this.handleOnClickUpdate}
          />
        </View>
        <Loading show={isLoading} />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
  editModem: (params, onSuccess, onError) =>
    dispatch(ModemActions.modemEdit(params, onSuccess, onError)),
  fetchModems: (userId, onSuccess, onError) =>
    dispatch(ModemActions.modemFetch({userId}, onSuccess, onError)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditModem);
