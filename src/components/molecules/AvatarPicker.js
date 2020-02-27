import React from 'react';
import PropTypes from 'prop-types';
import {ImageBackground, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from '../atoms/Icon';
import {colors, images} from '../../themes';
import {scaleSize} from '../../themes/mixins';

const AvatarPicker = props => {
  const {size, source, onClickLogout, onClickCamera} = props;
  const containerStyle = {
    ...styles.container,
    borderRadius: size / 2,
    width: size,
    height: size,
  };
  const imageStyle = {borderRadius: size / 2};
  return (
    <ImageBackground
      style={containerStyle}
      resizeMode="cover"
      imageStyle={imageStyle}
      source={source}>
      <TouchableOpacity
        style={styles.iconCameraContainer}
        onPress={() => onClickCamera()}>
        <Icon
          width={scaleSize(16)}
          height={scaleSize(12)}
          source={images.icCamera}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconLogoutContainer}
        onPress={() => onClickLogout()}>
        <Icon
          width={scaleSize(16)}
          height={scaleSize(16)}
          source={images.icLogout}
        />
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default AvatarPicker;

AvatarPicker.propTypes = {
  size: PropTypes.number,
  source: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  onClickLogout: PropTypes.func,
  onClickCamera: PropTypes.func,
};

AvatarPicker.defaultProps = {
  source: null,
  size: scaleSize(120),
  onClickLogout: () => {},
  onClickCamera: () => {},
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
  },
  iconLogoutContainer: {
    position: 'absolute',
    width: scaleSize(32),
    height: scaleSize(32),
    right: scaleSize(90),
    bottom: 0,
    borderRadius: 16,
    backgroundColor: colors.addButton,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCameraContainer: {
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
