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
    onLeftClick,
    style,
  } = props;
  if (source) {
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
          onLeftClick={onLeftClick}
        />
      </ImageBackground>
    );
  }
  return (
    <View style={{...styles.container, height: height, ...style}}>
      <NavHeader
        title={title}
        titleColor={colors.gray01}
        rightIcon={rightIcon}
        rightIconWidth={rightIconWidth}
        rightIconHeight={rightIconHeight}
        onRightClick={onRightClick}
        onLeftClick={onLeftClick}
      />
    </View>
  );
};

export default TabHeader;

TabHeader.propTypes = {
  height: PropTypes.number,
  source: PropTypes.number,
  title: PropTypes.string,
  rightIcon: PropTypes.number,
  rightIconWidth: PropTypes.number,
  rightIconHeight: PropTypes.number,
  onLeftClick: PropTypes.func,
  onRightClick: PropTypes.func,
};

TabHeader.defaultProps = {
  width: '100%',
  title: '',
  source: null,
  rightIcon: null,
  rightIconWidth: 24,
  rightIconHeight: 24,
  onLeftClick: () => {},
  onRightClick: () => {},
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
  },
  leftNavHeader: {
    width: scaleSize(66),
  },
});
