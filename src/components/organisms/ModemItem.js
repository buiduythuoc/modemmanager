import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {scaleSize, scaleFont, boxShadow} from '../../themes/mixins';
import {colors, images} from '../../themes';
import Icon from '../atoms/Icon';
import Button from '../atoms/Button';

const ModemItem = props => {
  const {data, index, onClickDetail, onClickEdit} = props;
  const {domain, port, description} = data;
  const modemName = data.modem_name;
  const marginRight = index % 2 ? 0 : scaleSize(10);

  return (
    <View style={{...styles.container, marginRight}}>
      <Text style={styles.modemName} numberOfLines={1} ellipsizeMode="tail">
        {modemName}
      </Text>
      <View style={styles.line} />
      <Text style={styles.domainName} numberOfLines={1} ellipsizeMode="tail">
        {domain}
      </Text>
      <Text style={styles.port} numberOfLines={1} ellipsizeMode="tail">
        {port ? port : 'Port'}
      </Text>
      {/* <Text style={styles.description}>
        {description ? description : 'Description'}
      </Text> */}
      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={styles.editButtonContainer}
          onPress={onClickEdit}>
          <Icon
            source={images.icEdit}
            width={scaleSize(20)}
            height={scaleSize(15)}
          />
        </TouchableOpacity>
        <Button
          style={styles.detailButton}
          height={scaleSize(23)}
          title="Detail"
          onClick={onClickDetail}
        />
      </View>
    </View>
  );
};

export default ModemItem;

ModemItem.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object]).isRequired,
  index: PropTypes.number.isRequired,
  onClickDetail: PropTypes.func,
  onClickEdit: PropTypes.func,
};

ModemItem.defaultProps = {
  onClickDetail: null,
  onClickEdit: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: '50%',
    backgroundColor: colors.white,
    borderRadius: scaleSize(6),
    padding: scaleSize(10),
    marginBottom: scaleSize(10),
    ...boxShadow(colors.gray01, {width: 0, height: 1}, 2, 0, 8),
  },
  modemName: {
    fontSize: scaleFont(16),
    color: colors.primary,
  },
  line: {
    marginTop: scaleSize(16),
    width: scaleSize(28),
    height: 1,
    backgroundColor: colors.primary,
  },
  domainName: {
    marginTop: scaleSize(6),
    fontSize: scaleFont(14),
    lineHeight: scaleSize(19),
    color: colors.gray01,
  },
  port: {
    marginTop: scaleSize(6),
    fontSize: scaleFont(14),
    color: colors.gray01,
  },
  description: {
    marginTop: scaleSize(8),
    fontSize: scaleFont(12),
    color: colors.gray03,
  },
  actionContainer: {
    width: '100%',
    marginTop: scaleSize(20),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButtonContainer: {
    paddingTop: scaleSize(3),
    paddingBottom: scaleSize(3),
    paddingRight: scaleSize(20),
  },
  detailButton: {
    backgroundColor: colors.addButton,
    borderColor: colors.addButton,
    width: scaleSize(76),
    height: scaleSize(23),
  },
});
