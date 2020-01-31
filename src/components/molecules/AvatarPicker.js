import React from 'react';
import PropTypes from 'prop-types';
import {View, ImageBackground, StyleSheet} from 'react-native';
import Icon from '../atoms/Icon';
import {colors, images} from '../../themes';
import {scaleSize} from '../../themes/mixins';

const AvatarPicker = props => {
  const {size, source} = props;
  const containerStyle = {
    ...styles.container,
    borderRadius: size / 2,
    width: size,
    height: size,
  };
  return (
    <ImageBackground style={containerStyle} resizeMode="cover" source={source}>
      <View style={styles.iconContainer}>
        <Icon
          width={scaleSize(16)}
          height={scaleSize(12)}
          source={images.icCamera}
        />
      </View>
    </ImageBackground>
  );
};

export default AvatarPicker;

AvatarPicker.propTypes = {
  size: PropTypes.number,
  source: PropTypes.number.isRequired,
};

AvatarPicker.defaultProps = {
  size: scaleSize(120),
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
  },
  iconContainer: {
    position: 'absolute',
    width: scaleSize(32),
    height: scaleSize(32),
    right: 0,
    bottom: 0,
    borderRadius: 16,
    backgroundColor: colors.addButton,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {},
});
