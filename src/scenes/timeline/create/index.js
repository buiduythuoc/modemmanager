import React from 'react';
import {View, Text} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {images, colors} from '../../../themes';
import styles from './styles';
import Button from '../../../components/atoms/Button';
import NavHeader from '../../../components/molecules/NavHeader';
import LabelInput from '../../../components/molecules/LabelInput';
import ImagePicker from '../../../components/molecules/ImagePicker';
import {scaleSize} from '../../../themes/mixins';

export default class CreateTimeline extends React.Component {
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
          title="New Post"
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
            <LabelInput
              style={styles.inputContainer}
              label="Title"
              labelStyle={styles.label}
              borderColor={colors.gray04}
              inputStyle={styles.titleInput}
              rounded={true}
              placeholder="Write your own ......."
              placeholderTextColor={colors.gray05}
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
            />
            <Button
              style={styles.postButton}
              height={scaleSize(45)}
              title="POST"
            />
          </KeyboardAwareScrollView>
        </View>
      </View>
    );
  }
}
