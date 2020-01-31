import React from 'react';
import {View, Text} from 'react-native';
import {images, colors} from '../../../themes';
import styles from './styles';
import Button from '../../../components/atoms/Button';
import NavHeader from '../../../components/molecules/NavHeader';
import LabelInput from '../../../components/molecules/LabelInput';
import {scaleSize} from '../../../themes/mixins';

export default class ForgotPassword extends React.Component {
  handleOnClickBack = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };

  render() {
    return (
      <View style={styles.container}>
        <NavHeader
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
      </View>
    );
  }
}
