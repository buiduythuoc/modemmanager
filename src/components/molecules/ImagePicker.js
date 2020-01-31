import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, ImageBackground, StyleSheet} from 'react-native';
import Icon from '../atoms/Icon';
import {colors, images, metrics} from '../../themes';
import {scaleSize} from '../../themes/mixins';

const ImagePicker = props => {
  const {source, style} = props;
  const containerStyle = {...styles.container, ...style};
  if (source) {
    containerStyle.justifyContent = 'flex-end';
    containerStyle.alignItems = 'flex-end';
    return (
      <ImageBackground
        style={containerStyle}
        resizeMode="cover"
        source={source}>
        <Icon
          width={scaleSize(16)}
          height={scaleSize(16)}
          source={images.icDelete}
          style={styles.deleteIcon}
        />
      </ImageBackground>
    );
  }
  return (
    <TouchableOpacity style={containerStyle}>
      <Icon
        width={scaleSize(16)}
        height={scaleSize(12)}
        source={images.icCamera}
      />
    </TouchableOpacity>
  );
};

export default ImagePicker;

ImagePicker.propTypes = {
  source: PropTypes.number,
};

ImagePicker.defaultProps = {
  source: null,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray05,
    borderRadius: scaleSize(10),
    flex: 1,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteIcon: {
    marginRight: scaleSize(-8),
    marginBottom: scaleSize(-8),
  },
  iconCamera: {},
});
