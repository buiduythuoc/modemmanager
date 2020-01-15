import React from 'react';
import PropTypes from 'prop-types';
import {View, ImageBackground, StyleSheet} from 'react-native';
import NavHeader from '../molecules/NavHeader';
import {scaleSize} from '../../themes/mixins';
import {colors} from '../../themes';

const TabHeader = props => {
  const {
    title,
    height,
    source,
    rightIcon,
    rightIconHeight,
    rightIconWidth,
    onRightClick,
  } = props;
  return (
    <ImageBackground
      resizeMode="cover"
      source={source}
      style={{...styles.container, height: height}}>
      <NavHeader
        title={title}
        renderLeft={() => <View style={styles.leftNavHeader} />}
        rightIcon={rightIcon}
        rightIconWidth={rightIconWidth}
        rightIconHeight={rightIconHeight}
        onRightClick={onRightClick}
      />
    </ImageBackground>
  );
};

export default TabHeader;

TabHeader.propTypes = {
  height: PropTypes.number,
  source: PropTypes.number.isRequired,
  title: PropTypes.string,
  rightIcon: PropTypes.number,
  rightIconWidth: PropTypes.number,
  rightIconHeight: PropTypes.number,
};

TabHeader.defaultProps = {
  width: '100%',
  title: '',
  rightIcon: null,
  rightIconWidth: 24,
  rightIconHeight: 24,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
  },
  leftNavHeader: {
    width: scaleSize(66),
  },
});
