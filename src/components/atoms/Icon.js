import React from 'react';
import PropTypes from 'prop-types';
import {Image, StyleSheet} from 'react-native';
import {scaleSize} from '../../themes/mixins';

const Icon = props => {
  const {width, height, source, style, ...attributes} = props;
  return (
    <Image
      style={{...styles.icon, width, height, ...style}}
      resizeMode="cover"
      source={source}
      {...attributes}
    />
  );
};

export default Icon;

Icon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  source: PropTypes.number.isRequired,
};

Icon.defaultProps = {
  width: scaleSize(24),
  height: scaleSize(24),
};

const styles = StyleSheet.create({
  icon: {},
});
