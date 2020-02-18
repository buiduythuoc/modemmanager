import React from 'react';
import {TextInput} from 'react-native';
import PropTypes from 'prop-types';
import {colors} from '../../themes';
import {scaleSize} from '../../themes/mixins';

const Input = props => {
  const {
    rounded,
    borderColor,
    borderRadius,
    onChangeText,
    onFocus,
    style,
    ...attributes
  } = props;
  const inputStyle = rounded
    ? {
        ...style,
        borderColor,
        borderRadius: borderRadius,
        borderWidth: 1,
      }
    : {
        ...style,
        borderColor,
        borderBottomWidth: 1,
      };

  return (
    <TextInput
      style={inputStyle}
      onChangeText={text => (onChangeText ? onChangeText(text) : {})}
      onFocus={() => (onFocus ? onFocus() : {})}
      {...attributes}
    />
  );
};

export default Input;

Input.propTypes = {
  rounded: PropTypes.bool,
  borderColor: PropTypes.string,
  borderRadius: PropTypes.number,
  onChangeText: PropTypes.func,
  onFocus: PropTypes.func,
};

Input.defaultProps = {
  rounded: false,
  borderColor: colors.white,
  borderRadius: scaleSize(5),
  onChangeText: null,
  onFocus: null,
};
