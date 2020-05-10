import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import Icon from '../atoms/Icon';
import NotificationActions from '../../stores/notificationRedux';
import {images, colors} from '../../themes';

class NotificationIcon extends React.PureComponent {
  render() {
    const {focused, isNew} = this.props;
    return (
      <View style={styles.container}>
        <Icon
          source={
            focused
              ? images.icTabNotificationActive
              : images.icTabNotificationInactive
          }
          width={15}
          height={17}
        />
        {isNew && (
          <View style={styles.newContainer}>
            <View style={styles.newTextContent}>
              <Text style={styles.newText}>New</Text>
            </View>
          </View>
        )}
      </View>
    );
  }
}

NotificationIcon.propTypes = {
  focused: PropTypes.bool,
};

NotificationIcon.defaultProps = {
  focused: false,
};

const mapStateToProps = state => ({
  isNew: state.notification.isNew,
});

const mapDispatchToProps = dispatch => ({
  setIsNew: isNew => dispatch(NotificationActions.notificationSetIsNew(isNew)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NotificationIcon);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  newContainer: {
    position: 'absolute',
    top: -5,
    left: 26,
    right: 0,
    alignItems: 'center',
  },
  newTextContent: {
    backgroundColor: colors.lightRed,
    borderRadius: 5,
    padding: 1,
  },
  newText: {
    color: colors.white,
    fontSize: 10,
  },
});
