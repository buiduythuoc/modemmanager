import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import Icon from '../atoms/Icon';
import {colors, images, metrics} from '../../themes';

const renderLeftIcon = props => {
  const {onLeftClick, leftIcon} = props;
  return (
    <TouchableOpacity
      style={styles.leftIconContainer}
      onPress={() => (onLeftClick ? onLeftClick() : {})}>
      <Icon source={leftIcon} width={17} height={12} />
    </TouchableOpacity>
  );
};

const renderTitle = props => {
  const {title, titleColor} = props;
  return (
    <View style={styles.titleContainer}>
      <Text style={{...styles.title, color: titleColor}}>{title}</Text>
    </View>
  );
};

const renderRightIcon = props => {
  const {rightIcon, rightIconWidth, rightIconHeight, onRightClick} = props;
  if (rightIcon) {
    return (
      <TouchableOpacity
        style={styles.rightIconContainer}
        onPress={() => (onRightClick ? onRightClick() : {})}>
        <Icon
          source={rightIcon}
          width={rightIconWidth}
          height={rightIconHeight}
        />
      </TouchableOpacity>
    );
  }
  return <View style={styles.rightIconContainer} />;
};

const NavBar = props => {
  const {style, renderLeft} = props;

  return (
    <View style={[styles.container, style]}>
      {renderLeft ? renderLeft() : renderLeftIcon(props)}
      {renderTitle(props)}
      {renderRightIcon(props)}
    </View>
  );
};

export default NavBar;

NavBar.propTypes = {
  title: PropTypes.string,
  titleColor: PropTypes.string,
  renderRight: PropTypes.func,
  rightIcon: PropTypes.number,
  rightIconWidth: PropTypes.number,
  rightIconHeight: PropTypes.number,
  onRightClick: PropTypes.func,
  renderLeft: PropTypes.func,
  leftIcon: PropTypes.number,
  onLeftClick: PropTypes.func,
};

NavBar.defaultProps = {
  title: '',
  titleColor: colors.white,
  renderRight: null,
  rightIcon: null,
  rightIconWidth: 24,
  rightIconHeight: 24,
  renderLeft: null,
  leftIcon: images.icBackBlack,
  onLeftClick: null,
  onRightClick: null,
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: metrics.navBarHeight,
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  leftIconContainer: {
    height: metrics.navBarHeight,
    width: 66,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
  rightIconContainer: {
    height: metrics.navBarHeight,
    width: 66,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
