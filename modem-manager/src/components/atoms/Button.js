import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import Icon from './Icon';
import {colors} from '../../themes';
import {scaleSize} from '../../themes/mixins';

const Button = props => {
  const {
    title,
    height,
    borderColor,
    backgroundColor,
    textColor,
    onClick,
    style,
    icon,
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
      activeOpacity={0.8}
      onPress={() => (onClick ? onClick() : {})}>
      {icon ? (
        <Icon
          source={icon}
          width={scaleSize(40)}
          height={scaleSize(40)}
          style={styles.icon}
        />
      ) : null}
      <Text style={titleStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

Button.propTypes = {
  title: PropTypes.string,
  height: PropTypes.number,
  borderColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  onClick: PropTypes.func,
  icon: PropTypes.number,
};

Button.defaultProps = {
  title: '',
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
    flexDirection: 'row',
  },
  text: {},
  icon: {
    marginRight: scaleSize(13),
  },
});
