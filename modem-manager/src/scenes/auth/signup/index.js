import React from 'react';
import {Image, View, Text} from 'react-native';
import {images} from '../../../themes';
import styles from './styles';
import Button from '../../../components/atoms/Button';
import LabelInput from '../../../components/molecules/LabelInput';
import NavHeader from '../../../components/molecules/NavHeader';
import {scaleSize} from '../../../themes/mixins';

export default class SignupScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClickBack = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };

  handleClickSignup = () => {
    const {navigation} = this.props;
    navigation.navigate('TabBar');
  };

  render() {
    return (
      <View style={styles.container}>
        <Image source={images.imgMapSignup} resizeMode="cover" />
        <View style={styles.content}>
          <NavHeader
            style={styles.navHeader}
            leftIcon={images.icBackWhite}
            onLeftClick={this.handleClickBack}
          />
          <Text style={styles.managementText}>Management</Text>
          <LabelInput
            style={styles.emailInput}
            iconSrc={images.icEmail}
            iconWidth={scaleSize(12)}
            iconHeight={scaleSize(12)}
            label="Email"
          />
          <LabelInput
            style={styles.userNameInput}
            iconSrc={images.icUserWhite}
            iconWidth={scaleSize(10)}
            iconHeight={scaleSize(13)}
            label="Username"
          />
          <LabelInput
            style={styles.passwordInput}
            iconSrc={images.icLockWhite}
            iconWidth={scaleSize(10)}
            iconHeight={scaleSize(11)}
            label="Password"
          />
          <Button
            style={styles.signupButton}
            height={scaleSize(45)}
            title="SIGNUP"
            onClick={this.handleClickSignup}
          />
          <Text style={styles.copyrightText}>Copyright ABC@ </Text>
        </View>
      </View>
    );
  }
}
