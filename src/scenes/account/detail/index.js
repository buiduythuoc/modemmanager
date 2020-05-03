import React from 'react';
import {View, Alert, Image} from 'react-native';
import {connect} from 'react-redux';
import {images, colors} from '../../../themes';
import styles from './styles';
import TabHeader from '../../../components/organisms/TabHeader';
import LabelInput from '../../../components/molecules/LabelInput';
import Button from '../../../components/atoms/Button';
import {scaleSize} from '../../../themes/mixins';
import AccountActions from '../../../stores/accountRedux';
import Loading from '../../../components/organisms/Loading';

class AccountDetail extends React.Component {
  constructor(props) {
    super(props);

    const {navigation} = props;
    this.state = {
      isFetching: true,
      username: '',
      expiredAt: '',
      userPass: '',
      avatar: images.imgAvatarDefault,
      userId: navigation.getParam('userId', 0),
    };
  }

  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    const {userId} = this.state;
    const {fetchProfile} = this.props;
    fetchProfile(
      userId,
      profileData => {
        this.setState({
          isFetching: false,
          username: profileData.user_name,
          userPass: profileData.user_pass,
          avatar: profileData.image_url
            ? {uri: profileData.image_url}
            : images.imgAvatarDefault,
        });
      },
      () => {
        this.setState({isFetching: false});
      },
    );
  }

  handelOnClickBack = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };

  handleOnClickUpdateProfile = () => {
    const {username, expiredAt, userId} = this.state;
    const {updateProfile, fetchAccounts, user, navigation} = this.props;
    this.setState({isFetching: true});
    const params = {
      userId,
      username,
      status: 1,
      expiredAt,
    };
    updateProfile(
      params,
      () => {
        fetchAccounts(user.user_id, null, null);
        this.setState({isFetching: false});
        Alert.alert(
          'Success',
          'User profile has been updated',
          [
            {
              text: 'OK',
              onPress: () => {
                navigation.goBack();
              },
            },
          ],
          {cancelable: false},
        );
      },
      () => {
        this.setState({isFetching: false});
      },
    );
  };

  handleOnClickDeleteAccount = () => {
    const {userId} = this.state;
    const {deleteAccount, fetchAccounts, user} = this.props;
    Alert.alert(
      'Warning',
      'Do you want to delete this account',
      [
        {
          text: 'OK',
          onPress: () => {
            this.setState({isFetching: true});
            const params = {
              userId: user.user_id,
              deleteId: userId,
            };

            deleteAccount(
              params,
              () => {
                fetchAccounts(user.user_id, null, null);
                this.setState({isFetching: false});
                Alert.alert(
                  'Success',
                  'Account has been deleted',
                  [{text: 'OK', onPress: () => {}}],
                  {cancelable: false},
                );
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
          onPress: () => console.log('OK Pressed'),
        },
      ],
      {cancelable: false},
    );
  };

  render() {
    const {isFetching, username, userPass, expiredAt, avatar} = this.state;
    return (
      <View style={styles.container}>
        <TabHeader
          style={styles.tabHeader}
          title={'Account Detail'}
          height={scaleSize(160)}
          onLeftClick={this.handelOnClickBack}
        />
        <View style={styles.content}>
          <Image style={styles.avatar} resizeMode="cover" source={avatar} />
          <LabelInput
            style={styles.userNameInput}
            labelStyle={styles.labelInput}
            inputStyle={styles.input}
            borderColor={colors.gray04}
            iconSrc={images.icUserBlack}
            iconWidth={scaleSize(10)}
            iconHeight={scaleSize(13)}
            label="Username"
            value={username}
            onChangeText={text => this.setState({username: text})}
          />
          <LabelInput
            style={styles.passwordInput}
            labelStyle={styles.labelInput}
            inputStyle={styles.input}
            borderColor={colors.gray04}
            iconSrc={images.icLockBlack}
            iconWidth={scaleSize(10)}
            iconHeight={scaleSize(11)}
            label="Password"
            value={userPass}
            secureTextEntry={true}
            editable={false}
          />
          <LabelInput
            style={styles.expiredAtInput}
            labelStyle={styles.labelInput}
            borderColor={colors.gray04}
            iconSrc={images.icExpiredBlack}
            iconWidth={scaleSize(11)}
            iconHeight={scaleSize(10)}
            label="Expired At"
            value={expiredAt}
          />
          <View style={styles.actionContainer}>
            <Button
              style={styles.updateButton}
              height={scaleSize(45)}
              title="UPDATE"
              onClick={this.handleOnClickUpdateProfile}
            />
            <Button
              style={styles.deleteButton}
              height={scaleSize(45)}
              title="DELETE"
              onClick={this.handleOnClickDeleteAccount}
            />
          </View>
        </View>
        <Loading show={isFetching} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  accounts: state.account.list,
});

const mapDispatchToProps = dispatch => ({
  fetchProfile: (userId, onSuccess, onError) =>
    dispatch(AccountActions.accountFetchProfile({userId}, onSuccess, onError)),
  updateProfile: (params, onSuccess, onError) =>
    dispatch(AccountActions.accountUpdateProfile(params, onSuccess, onError)),
  fetchAccounts: (userId, onSuccess, onError) =>
    dispatch(AccountActions.accountFetch({userId}, onSuccess, onError)),
  deleteAccount: (params, onSuccess, onError) =>
    dispatch(AccountActions.accountDelete(params, onSuccess, onError)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccountDetail);
