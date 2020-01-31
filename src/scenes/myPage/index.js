import React from 'react';
import {View} from 'react-native';
import {images, colors} from '../../themes';
import styles from './styles';
import TabHeader from '../../components/organisms/TabHeader';
import AvatarPicker from '../../components/molecules/AvatarPicker';
import LabelInput from '../../components/molecules/LabelInput';
import Button from '../../components/atoms/Button';
import {scaleSize} from '../../themes/mixins';

export default class MyPage extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <TabHeader
          source={images.imgMapTimeline}
          title={'My profile'}
          height={scaleSize(167)}
        />
        <View style={styles.content}>
          <AvatarPicker source={images.imgAvatarDefault} />
          <LabelInput
            style={styles.userNameInput}
            labelStyle={styles.labelInput}
            borderColor={colors.gray04}
            iconSrc={images.icUserBlack}
            iconWidth={scaleSize(10)}
            iconHeight={scaleSize(13)}
            label="Username"
          />
          <LabelInput
            style={styles.passwordInput}
            labelStyle={styles.labelInput}
            borderColor={colors.gray04}
            iconSrc={images.icLockBlack}
            iconWidth={scaleSize(10)}
            iconHeight={scaleSize(11)}
            label="Password"
          />
          <LabelInput
            style={styles.expiredAtInput}
            labelStyle={styles.labelInput}
            borderColor={colors.gray04}
            iconSrc={images.icExpiredBlack}
            iconWidth={scaleSize(11)}
            iconHeight={scaleSize(10)}
            label="Expired At"
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
