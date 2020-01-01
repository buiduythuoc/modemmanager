import React from 'react';
import PropTypes from 'prop-types';
import {View, ImageBackground, StyleSheet} from 'react-native';
import NavHeader from '../molecules/NavHeader';
import {scaleSize} from '../../themes/mixins';
import {colors} from '../../themes';

const TabHeader = props => {
  const {title, height, source} = props;
  return (
    <ImageBackground
      resizeMode="cover"
      source={source}
      style={{...styles.container, height: height}}>
      <NavHeader
        title={title}
        renderLeftIcon={() => <View style={styles.leftNavHeader} />}
      />
    </ImageBackground>
  );
};

export default TabHeader;

TabHeader.propTypes = {
  height: PropTypes.number,
  source: PropTypes.number.isRequired,
  title: PropTypes.string,
};

TabHeader.defaultProps = {
  width: '100%',
  title: '',
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
  },
  leftNavHeader: {
    width: scaleSize(66),
  },
});
