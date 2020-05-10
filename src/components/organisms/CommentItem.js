import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet, Image} from 'react-native';
import {scaleSize, scaleFont} from '../../themes/mixins';
import {colors, images, metrics} from '../../themes';

const CommentItem = props => {
  const {data} = props;
  const avatar = data.avatar ? {uri: data.avatar} : images.imgAvatarDefault;
  const username = data.username ? data.username : '';
  const time = data.created_date;
  const comment = data.comment;

  return (
    <View style={styles.container}>
      <Image style={styles.avatar} source={avatar} />
      <View style={styles.flex}>
        <View style={styles.commentContainer}>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.comment}>{comment}</Text>
        </View>
        <Text style={styles.time}>{time}</Text>
      </View>
    </View>
  );
};

export default CommentItem;

CommentItem.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

CommentItem.defaultProps = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: metrics.largeBaseMargin,
  },
  avatar: {
    width: scaleSize(44),
    height: scaleSize(44),
    borderRadius: scaleSize(10),
  },
  flex: {
    flex: 1,
  },
  commentContainer: {
    flex: 1,
    marginLeft: scaleSize(10),
    borderRadius: scaleSize(10),
    padding: scaleSize(10),
    backgroundColor: colors.commentBg,
  },
  usernameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  username: {
    fontWeight: '600',
    fontSize: scaleFont(12),
    color: colors.primary,
  },
  time: {
    fontSize: scaleFont(8),
    color: colors.gray03,
    marginLeft: scaleSize(10),
    marginTop: scaleSize(10),
  },
  comment: {
    marginTop: scaleSize(6),
    fontSize: scaleFont(12),
    color: colors.gray02,
  },
});
