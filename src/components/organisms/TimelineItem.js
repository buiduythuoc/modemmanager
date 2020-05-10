import React from 'react';
import PropTypes from 'prop-types';
import {
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {scaleSize, scaleFont} from '../../themes/mixins';
import {colors, images} from '../../themes';
import Icon from '../atoms/Icon';

const TimelineItem = props => {
  const {data, onClick} = props;
  const {title} = data;
  const time = data.created_date;
  const imageSrc = data.img_main
    ? {uri: data.img_main}
    : images.imgTimelineDefault;

  return (
    <TouchableOpacity onPress={() => (onClick ? onClick() : {})}>
      <ImageBackground
        style={styles.container}
        source={imageSrc}
        imageStyle={styles.image}>
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
            {title}
          </Text>
          <View style={styles.line} />
          <View style={styles.timeContainer}>
            <Icon
              style={styles.timeIcon}
              source={images.icTimeWhite}
              width={scaleSize(10)}
              height={scaleSize(10)}
            />
            <Text style={styles.time}>{time}</Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default TimelineItem;

TimelineItem.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object]).isRequired,
  onClick: PropTypes.func,
};

TimelineItem.defaultProps = {
  onClick: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: scaleSize(15),
    height: scaleSize(164),
    marginBottom: scaleSize(10),
    justifyContent: 'flex-end',
  },
  content: {
    backgroundColor: colors.windowTint,
    paddingHorizontal: scaleSize(17),
    paddingVertical: scaleSize(10),
    borderBottomLeftRadius: scaleSize(15),
    borderBottomRightRadius: scaleSize(15),
  },
  image: {
    borderRadius: scaleSize(15),
  },
  title: {
    height: scaleSize(38),
    fontSize: scaleFont(14),
    color: colors.white,
    fontWeight: '600',
    lineHeight: scaleSize(19),
  },
  line: {
    marginTop: scaleSize(10),
    width: scaleSize(28),
    height: 1,
    backgroundColor: colors.addButton,
  },
  timeContainer: {
    marginTop: scaleSize(6),
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeIcon: {
    marginRight: scaleSize(3),
  },
  time: {
    fontSize: scaleFont(10),
    color: colors.white,
    lineHeight: scaleSize(14),
  },
});
