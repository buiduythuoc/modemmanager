import React from 'react';
import {View} from 'react-native';
import {images} from '../../themes';
import styles from './styles';
import TabHeader from '../../components/organisms/TabHeader';
import Button from '../../components/atoms/Button';
import {scaleSize} from '../../themes/mixins';

export default class ListModem extends React.Component {
  static navigationOptions = {
    header: null,
  };

  handleClickBack = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };

  render() {
    return (
      <View style={styles.container}>
        <TabHeader
          source={images.imgMapList}
          title={'List Modem'}
          height={scaleSize(133)}
        />
        <Button
          style={styles.addButton}
          height={scaleSize(60)}
          title="Add New Modem"
        />
      </View>
    );
  }
}
