import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, View, Text, StyleSheet, Image} from 'react-native';
import {scaleSize, scaleFont} from '../../themes/mixins';
import {colors, images} from '../../themes';

const AccountItem = props => {
  const {data, onClickModemManagement, onClickAccountDetail} = props;
  const {username} = data;
  const avatar = data.url ? {uri: data.url} : images.imgAvatarDefault;

  return (
    <View style={styles.container}>
      <Image style={styles.avatar} source={avatar} />
      <Text style={styles.username} ellipsizeMode="tail">
        {username}
      </Text>
      <View style={styles.actionContainer}>
        <TouchableOpacity onPress={() => onClickAccountDetail()}>
          <Text style={styles.accountDetail}>Account Detail</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.modemManagementContainer}
          onPress={() => onClickModemManagement()}>
          <Text style={styles.modemManagement}>Modem Management</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AccountItem;

AccountItem.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object]).isRequired,
  onClickAccountDetail: PropTypes.func,
  onClickModemManagement: PropTypes.func,
};

AccountItem.defaultProps = {
  onClickAccountDetail: () => {},
  onClickModemManagement: () => {},
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: scaleSize(6),
    padding: scaleSize(10),
    flexDirection: 'row',
    backgroundColor: colors.white,
    alignItems: 'center',
    marginBottom: scaleSize(10),
  },
  avatar: {
    width: scaleSize(53),
    height: scaleSize(53),
    borderRadius: scaleSize(53),
  },
  username: {
    fontSize: scaleFont(16),
    color: colors.primary,
    marginHorizontal: scaleSize(10),
    flex: 1,
  },
  actionContainer: {},
  accountDetail: {
    fontSize: scaleFont(10),
    color: colors.addButton,
    textDecorationLine: 'underline',
    textAlign: 'right',
  },
  modemManagementContainer: {
    marginTop: scaleSize(16),
    borderRadius: scaleSize(20),
    backgroundColor: colors.primary,
    paddingVertical: scaleSize(5),
    paddingHorizontal: scaleSize(10),
  },
  modemManagement: {
    fontSize: scaleFont(10),
    color: colors.white,
  },
});
