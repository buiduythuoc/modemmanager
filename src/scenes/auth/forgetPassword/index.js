import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {images, colors} from '../../../themes';
import styles from './styles';
import Button from '../../../components/atoms/Button';
import NavBar from '../../../components/molecules/NavBar';
import LabelInput from '../../../components/molecules/LabelInput';
import {scaleSize} from '../../../themes/mixins';

export default class ForgotPassword extends React.Component {
  handleOnClickBack = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <NavBar
          title="Forgot password"
          titleColor={colors.gray01}
          leftIcon={images.icBackBlack}
          onLeftClick={this.handleOnClickBack}
        />
        <View style={styles.content}>
          <Text style={styles.descriptionText}>
            A link to reactivate account will be sent to your email{' '}
          </Text>
          <LabelInput
            style={styles.emailInputContainer}
            label="Email"
            labelStyle={styles.labelStyle}
            borderColor={colors.gray04}
            placeholder="example@mail.com"
            placeholderTextColor={colors.gray05}
          />
          <Button
            style={styles.sendButton}
            height={scaleSize(45)}
            title="SEND"
          />
        </View>
      </SafeAreaView>
    );
  }
}
