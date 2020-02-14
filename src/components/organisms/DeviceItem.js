import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {scaleSize, scaleFont} from '../../themes/mixins';
import {colors, images} from '../../themes';
import Icon from '../atoms/Icon';

const DeviceItem = props => {
  const {data, isLocked} = props;
  const deviceName = data.name;
  const macAddress = data.mac_address;
  const status = data.online_status;
  const icon = isLocked ? images.icLockOpen : images.icLockWhite;
  const actionContentBackgroundColor = isLocked
    ? colors.lightGreen
    : colors.lightRed;
  const actionContainerBackgroundColor = isLocked
    ? colors.lightGreenOpacity01
    : colors.lightRedOpacity01;

  return (
    <View style={styles.container}>
      <Text style={styles.deviceName}>{deviceName}</Text>
      <Text style={styles.description}>{macAddress}</Text>
      <Text style={styles.description}>{status}</Text>
      <TouchableOpacity
        style={{
          ...styles.actionContainer,
          backgroundColor: actionContainerBackgroundColor,
        }}>
        <View
          style={{
            ...styles.actionContent,
            backgroundColor: actionContentBackgroundColor,
          }}>
          <Icon
            source={icon}
            width={scaleSize(12)}
            height={scaleSize(13)}
            style={styles.icon}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default DeviceItem;

DeviceItem.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object]).isRequired,
  isLocked: PropTypes.bool,
};

DeviceItem.defaultProps = {
  isLocked: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: scaleSize(6),
    paddingVertical: scaleSize(10),
    paddingLeft: scaleSize(10),
    paddingRight: scaleSize(10 + 51),
    marginBottom: scaleSize(10),
    overflow: 'hidden',
  },
  deviceName: {
    fontSize: scaleFont(16),
    color: colors.primary,
    lineHeight: scaleSize(22),
  },
  description: {
    marginTop: scaleSize(4),
    fontSize: scaleFont(12),
    color: colors.gray03,
    lineHeight: scaleSize(16),
  },
  time: {
    marginTop: scaleSize(12),
    fontSize: scaleFont(10),
    color: colors.timeText,
    lineHeight: scaleSize(14),
  },
  actionContainer: {
    position: 'absolute',
    bottom: scaleSize(-17),
    right: scaleSize(-17),
    width: scaleSize(68),
    height: scaleSize(68),
    borderRadius: scaleSize(34),
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionContent: {
    width: scaleSize(54),
    height: scaleSize(54),
    borderRadius: scaleSize(27),
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: scaleSize(5),
    marginBottom: scaleSize(5),
  },
});
