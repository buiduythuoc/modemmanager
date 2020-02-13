import React from 'react';
import PropTypes from 'prop-types';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {colors} from '../../themes';

const Loading = props => {
  const {show} = props;
  if (show) {
    return (
      <View style={styles.container}>
        <ActivityIndicator animating size="large" color={colors.white} />
      </View>
    );
  }
  return null;
};

Loading.propTypes = {
  show: PropTypes.bool,
};
Loading.defaultProps = {
  show: false,
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.windowTint,
  },
});
