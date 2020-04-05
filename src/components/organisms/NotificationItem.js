import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {scaleSize, scaleFont} from '../../themes/mixins';
import {colors, images} from '../../themes';
import Icon from '../atoms/Icon';

const NotificationItem = props => {
  const {data, onClick} = props;
  const {title} = data;
  const time = data.created_at;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => (onClick ? onClick() : {})}>
      <Icon
        style={styles.avatar}
        source={images.imgNotificationAvatarDefault}
      />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={3} ellipsizeMode="tail">
          {title}
        </Text>
        <View style={styles.timeContainer}>
          <Icon
            style={styles.timeIcon}
            source={images.icTimeGray}
            width={scaleSize(10)}
            height={scaleSize(10)}
          />
          <Text style={styles.time}>{time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NotificationItem;

NotificationItem.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object]).isRequired,
  onClick: PropTypes.func,
};

NotificationItem.defaultProps = {
  onClick: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: scaleSize(6),
    padding: scaleSize(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    marginBottom: scaleSize(10),
  },
  avatar: {
    width: scaleSize(79),
    height: scaleSize(79),
  },
  content: {
    height: scaleSize(79),
    flex: 1,
    marginLeft: scaleSize(10),
    justifyContent: 'space-between',
  },
  title: {
    fontSize: scaleFont(14),
    color: colors.black,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeIcon: {
    marginRight: scaleSize(3),
  },
  time: {
    fontSize: scaleFont(10),
    color: colors.gray03,
    lineHeight: scaleSize(14),
  },
});
