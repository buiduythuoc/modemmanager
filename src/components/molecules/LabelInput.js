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

const LabelInput = props => {
  const {
    style,
    rounded,
    borderColor,
    borderRadius,
    onChangeText,
    inputStyle,
    placeholder,
    placeholderTextColor,
  } = props;

  console.log(inputStyle);

  return (
    <View style={{...styles.container, ...style}}>
      <View style={styles.labelContainer}>
        {renderIcon(props)}
        {renderLabel(props)}
      </View>
      <Input
        style={{...styles.input, ...inputStyle}}
        rounded={rounded}
        borderColor={borderColor}
        borderRadius={borderRadius}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
      />
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
};

const styles = StyleSheet.create({
  container: {},
  labelContainer: {
    display: 'flex',
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
  },
});
