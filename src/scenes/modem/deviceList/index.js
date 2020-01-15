import React from 'react';
import {View, FlatList, Text} from 'react-native';
import styles from './styles';
import NavHeader from '../../../components/molecules/NavHeader';
import DeviceItem from '../../../components/organisms/DeviceItem';
import {colors, images} from '../../../themes';
import {scaleSize} from '../../../themes/mixins';

export default class DeviceList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listDevices: [
        {
          id: 1,
          deviceName: 'Modem Device Name 1',
          description:
            'Detailed descriptions are provided in the project report.',
          time: '10:20AM 12/12/2019',
        },
        {
          id: 2,
          deviceName: 'Modem Device Name 1',
          description:
            'Detailed descriptions are provided in the project report.',
          time: '10:20AM 12/12/2019',
        },
        {
          id: 3,
          deviceName: 'Modem Device Name 1',
          description:
            'Detailed descriptions are provided in the project report.',
          time: '10:20AM 12/12/2019',
        },
        {
          id: 4,
          deviceName: 'Modem Device Name 1',
          description:
            'Detailed descriptions are provided in the project report.',
          time: '10:20AM 12/12/2019',
        },
      ],
    };
  }

  static navigationOptions = {
    header: null,
  };

  handleOnClickBack = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };

  handleOnClickBlockList = () => {
    const {navigation} = this.props;
    navigation.navigate('BlockListScreen');
  };

  render() {
    const {listDevices} = this.state;
    return (
      <View style={styles.container}>
        <NavHeader
          title="Device Management"
          titleColor={colors.gray01}
          leftIcon={images.icBackBlack}
          onLeftClick={this.handleOnClickBack}
          rightIcon={images.icBlockList}
          rightIconWidth={scaleSize(16)}
          rightIconHeight={scaleSize(19)}
          onRightClick={this.handleOnClickBlockList}
        />
        <Text style={styles.deviceCount}>
          {listDevices.length + ' devices'}
        </Text>
        <FlatList
          style={styles.flatList}
          data={listDevices}
          renderItem={({item}) => <DeviceItem data={item} />}
          keyExtractor={item => item.id + ''}
        />
      </View>
    );
  }
}
