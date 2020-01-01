import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {colors} from '../../themes';

const Button = props => {
  const {
    title,
    height,
    borderColor,
    backgroundColor,
    textColor,
    onClick,
    style,
  } = props;

  const containerStyle = {
    ...styles.container,
    borderColor,
    backgroundColor,
    height: height,
    borderRadius: height / 2,
  };
  const titleStyle = {
    ...styles.title,
    color: textColor,
  };

  return (
    <TouchableOpacity
      style={[containerStyle, style]}
      onPress={() => (onClick ? onClick() : {})}>
      <Text style={titleStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

Button.propTypes = {
  title: PropTypes.string.isRequired,
  height: PropTypes.number,
  borderColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  borderColor: colors.white,
  backgroundColor: colors.primary,
  textColor: colors.white,
  height: 40,
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  text: {},
});
