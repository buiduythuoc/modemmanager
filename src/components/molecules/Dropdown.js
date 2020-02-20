import React from 'react';
import PropTypes from 'prop-types';
import ModalDropdown from 'react-native-modal-dropdown';
import {View, Text, StyleSheet} from 'react-native';
import Icon from '../atoms/Icon';
import {colors, images} from '../../themes';
import {scaleSize, scaleFont} from '../../themes/mixins';

const Dropdown = props => {
  const {style, label, options, defaultValue, onSelect} = props;
  return (
    <View style={{...styles.container, ...style}}>
      <View style={styles.labelContainer}>
        <Icon
          source={images.icRole}
          width={scaleSize(17)}
          height={scaleSize(17)}
          style={styles.iconRole}
        />
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={styles.dropdownContainer}>
        <ModalDropdown
          options={options}
          defaultValue={defaultValue}
          style={styles.dropdown}
          textStyle={styles.dropdownText}
          dropdownStyle={styles.dropdownModal}
          dropdownTextStyle={styles.dropdownModalText}
          dropdownTextHighlightStyle={styles.dropdownModalTextHighlight}
          onSelect={(index, value) => (onSelect ? onSelect(index, value) : {})}
        />
        <Icon
          width={scaleSize(15)}
          height={scaleSize(8)}
          source={images.icDropdown}
        />
      </View>
    </View>
  );
};

export default Dropdown;

Dropdown.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  defaultValue: PropTypes.string.isRequired,
  onSelect: PropTypes.func,
};

Dropdown.defaultProps = {
  onSelect: null,
};

const styles = StyleSheet.create({
  container: {},
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: scaleFont(12),
    color: colors.white,
  },
  dropdownContainer: {
    flexDirection: 'row',
    height: scaleSize(40),
    justifyContent: 'space-between',
    borderBottomColor: colors.white,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  iconRole: {
    marginRight: scaleSize(10),
  },
  dropdown: {
    flex: 1,
    height: scaleSize(40),
    justifyContent: 'center',
  },
  dropdownText: {
    color: colors.white,
    fontSize: scaleFont(12),
  },
  dropdownModal: {
    width: scaleSize(150),
    height: scaleSize(70),
  },
  dropdownModalText: {
    color: colors.primary,
    fontSize: scaleFont(12),
  },
  dropdownModalTextHighlight: {
    color: colors.primary,
  },
});
