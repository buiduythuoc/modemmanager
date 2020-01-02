import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet} from 'react-native';
import {scaleSize, scaleFont} from '../../themes/mixins';
import {colors, images} from '../../themes';
import Icon from '../atoms/Icon';

const NotificationItem = props => {
  const {data} = props;
  const {avatar, title, time} = data;

  return (
    <View style={styles.container}>
      <Icon style={styles.avatar} source={avatar} />
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
    </View>
  );
};

export default NotificationItem;

NotificationItem.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

NotificationItem.defaultProps = {};

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
    height: scaleSize(57),
    marginLeft: scaleSize(10),
  },
  title: {
    fontSize: scaleFont(14),
    color: colors.black,
    lineHeight: scaleSize(19),
  },
  timeContainer: {
    marginTop: scaleSize(14),
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
