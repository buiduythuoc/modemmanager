import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, ImageBackground, StyleSheet} from 'react-native';
import Icon from '../atoms/Icon';
import {colors, images} from '../../themes';
import {scaleSize} from '../../themes/mixins';

const ImagePicker = props => {
  const {source, style, onSelect, onClickDelete} = props;
  const containerStyle = {...styles.container, ...style};
  if (source) {
    containerStyle.justifyContent = 'flex-end';
    containerStyle.alignItems = 'flex-end';
    return (
      <ImageBackground
        style={containerStyle}
        imageStyle={styles.image}
        resizeMode="cover"
        source={source}>
        <TouchableOpacity onPress={() => onClickDelete()}>
          <Icon
            width={scaleSize(16)}
            height={scaleSize(16)}
            source={images.icDelete}
            style={styles.deleteIcon}
          />
        </TouchableOpacity>
      </ImageBackground>
    );
  }
  return (
    <TouchableOpacity style={containerStyle} onPress={onSelect}>
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
  source: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  onSelect: PropTypes.func,
  onClickDelete: PropTypes.func,
};

ImagePicker.defaultProps = {
  source: null,
  onSelect: () => {},
  onClickDelete: () => {},
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
  image: {
    borderRadius: scaleSize(10),
  },
  deleteIcon: {
    marginRight: scaleSize(-8),
    marginBottom: scaleSize(-8),
  },
  iconCamera: {},
});
