import React from 'react';
import {View} from 'react-native';
import {images, colors} from '../../../themes';
import styles from './styles';
import Button from '../../../components/atoms/Button';
import NavHeader from '../../../components/molecules/NavHeader';
import LabelInput from '../../../components/molecules/LabelInput';
import {scaleSize} from '../../../themes/mixins';

export default class EditModem extends React.Component {
  static navigationOptions = {
    header: null,
  };

  handleOnClickBack = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };

  render() {
    return (
      <View style={styles.container}>
        <NavHeader
          title="Edit modem"
          titleColor={colors.gray01}
          leftIcon={images.icBackBlack}
          onLeftClick={this.handleOnClickBack}
        />
        <View style={styles.content}>
          <LabelInput
            style={styles.modemNameInput}
            label="Modem Name"
            labelStyle={styles.labelStyle}
            borderColor={colors.gray04}
            iconSrc={images.icWifiBlack}
            iconWidth={scaleSize(13)}
            iconHeight={scaleSize(10)}
            placeholder="New modem name"
            placeholderTextColor={colors.gray05}
          />
          <LabelInput
            style={styles.domainNameInput}
            label="Domain Name"
            labelStyle={styles.labelStyle}
            borderColor={colors.gray04}
            iconSrc={images.icDomainBlack}
            iconWidth={scaleSize(13)}
            iconHeight={scaleSize(13)}
            placeholder="Domain Name"
            placeholderTextColor={colors.gray05}
          />
          <LabelInput
            style={styles.portInput}
            label="Port"
            labelStyle={styles.labelStyle}
            borderColor={colors.gray04}
            iconSrc={images.icPortBlack}
            iconWidth={scaleSize(13)}
            iconHeight={scaleSize(13)}
            placeholder="Port"
            placeholderTextColor={colors.gray05}
          />
          <LabelInput
            style={styles.userNameInput}
            label="User Name"
            labelStyle={styles.labelStyle}
            borderColor={colors.gray04}
            iconSrc={images.icUserBlack}
            iconWidth={scaleSize(11)}
            iconHeight={scaleSize(14)}
            placeholder="User Name"
            placeholderTextColor={colors.gray05}
          />
          <LabelInput
            style={styles.passwordInput}
            label="Password"
            labelStyle={styles.labelStyle}
            borderColor={colors.gray04}
            iconSrc={images.icLockBlack}
            iconWidth={scaleSize(11)}
            iconHeight={scaleSize(13)}
            placeholder="Password"
            placeholderTextColor={colors.gray05}
          />
          <Button
            style={styles.updateButton}
            height={scaleSize(45)}
            title="UPDATE"
          />
        </View>
      </View>
    );
  }
}
