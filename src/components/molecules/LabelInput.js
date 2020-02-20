import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import Input from '../atoms/Input';
import Icon from '../atoms/Icon';
import {colors} from '../../themes';
import {scaleSize, scaleFont} from '../../themes/mixins';
import {TextPropTypes, ViewPropTypes} from '../config';

const renderIcon = props => {
  const {iconWidth, iconHeight, iconSrc, iconStyle} = props;
  if (iconSrc) {
    return (
      <Icon
        source={iconSrc}
        width={iconWidth}
        height={iconHeight}
        style={{...styles.icon, ...iconStyle}}
      />
    );
  }
  return null;
};

const renderLabel = props => {
  const {label, labelStyle} = props;
  if (label) {
    return <Text style={[styles.label, labelStyle]}>{label}</Text>;
  }
  return null;
};

const renderInputText = props => {
  const {
    rounded,
    borderColor,
    borderRadius,
    onChangeText,
    onFocus,
    inputStyle,
    placeholder,
    placeholderTextColor,
    secureTextEntry,
    value,
    multiline,
    editable,
    renderInput,
  } = props;
  if (renderInput) {
    return renderInput();
  }
  return (
    <Input
      style={{...styles.input, ...inputStyle}}
      rounded={rounded}
      borderColor={borderColor}
      borderRadius={borderRadius}
      onChangeText={onChangeText}
      onFocus={onFocus}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      secureTextEntry={secureTextEntry}
      value={value}
      multiline={multiline}
      editable={editable}
    />
  );
};

const LabelInput = props => {
  const {style, children} = props;
  return (
    <View style={{...styles.container, ...style}}>
      <View style={styles.labelContainer}>
        {renderIcon(props)}
        {renderLabel(props)}
      </View>
      {renderInputText(props)}
      {children}
    </View>
  );
};

export default LabelInput;

LabelInput.propTypes = {
  rounded: PropTypes.bool,
  label: PropTypes.string,
  labelStyle: ViewPropTypes.style,
  iconStyle: ViewPropTypes.style,
  iconSrc: PropTypes.number,
  iconWidth: PropTypes.number,
  iconHeight: PropTypes.number,
  inputStyle: TextPropTypes.style,
  borderColor: PropTypes.string,
  borderRadius: PropTypes.number,
  placeholder: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  onChangeText: PropTypes.func,
  onFocus: PropTypes.func,
  secureTextEntry: PropTypes.bool,
  value: PropTypes.string,
  multiline: PropTypes.bool,
  editable: PropTypes.bool,
  renderInput: PropTypes.func,
};

LabelInput.defaultProps = {
  rounded: false,
  label: '',
  labelStyle: {},
  iconStyle: {},
  iconWidth: scaleSize(24),
  iconHeight: scaleSize(24),
  inputStyle: {},
  borderColor: colors.white,
  borderRadius: scaleSize(5),
  placeholder: '',
  placeholderTextColor: colors.white,
  onChangeText: null,
  onFocus: null,
  secureTextEntry: false,
  value: '',
  multiline: false,
  editable: true,
  renderInput: null,
};

const styles = StyleSheet.create({
  container: {},
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: scaleFont(12),
    color: colors.white,
  },
  icon: {
    marginRight: scaleSize(10),
  },
  input: {
    height: scaleSize(40),
    color: colors.white,
    padding: scaleSize(4),
  },
});
