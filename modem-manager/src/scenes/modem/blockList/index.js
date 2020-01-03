import React from 'react';
import {View, FlatList, Text} from 'react-native';
import styles from './styles';
import NavHeader from '../../../components/molecules/NavHeader';
import DeviceItem from '../../../components/organisms/DeviceItem';
import {colors, images} from '../../../themes';

export default class BlockList extends React.Component {
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

  render() {
    const {listDevices} = this.state;
    return (
      <View style={styles.container}>
        <NavHeader
          title="BlockList"
          titleColor={colors.gray01}
          leftIcon={images.icBackBlack}
          onLeftClick={this.handleOnClickBack}
        />
        <Text style={styles.deviceCount}>
          {listDevices.length + ' devices'}
        </Text>
        <FlatList
          style={styles.flatList}
          data={listDevices}
          renderItem={({item}) => <DeviceItem data={item} isLocked={true} />}
          keyExtractor={item => item.id + ''}
        />
      </View>
    );
  }
}
