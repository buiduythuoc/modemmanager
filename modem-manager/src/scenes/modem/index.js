import React from 'react';
import {View, FlatList} from 'react-native';
import {images} from '../../themes';
import styles from './styles';
import TabHeader from '../../components/organisms/TabHeader';
import Button from '../../components/atoms/Button';
import ModemItem from '../../components/organisms/ModemItem';
import {scaleSize} from '../../themes/mixins';

export default class ListModem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listModems: [
        {
          id: 1,
          modemName: 'Modem Name',
          domainName: 'Domain Name',
          port: 'Port',
          description:
            'Detailed descriptions are provided in the project report.',
        },
        {
          id: 2,
          modemName: 'Modem Name',
          domainName: 'Domain Name',
          port: 'Port',
          description:
            'Detailed descriptions are provided in the project report.',
        },
        {
          id: 3,
          modemName: 'Modem Name',
          domainName: 'Domain Name',
          port: 'Port',
          description:
            'Detailed descriptions are provided in the project report.',
        },
        {
          id: 4,
          modemName: 'Modem Name',
          domainName: 'Domain Name',
          port: 'Port',
          description:
            'Detailed descriptions are provided in the project report.',
        },
      ],
    };
  }

  static navigationOptions = {
    header: null,
  };

  handleOnClickItem = () => {
    const {navigation} = this.props;
    navigation.navigate('DeviceListScreen');
  };

  handleOnClickAdd = () => {
    const {navigation} = this.props;
    navigation.navigate('CreateModemScreen');
  };

  handleOnClickEdit = () => {
    const {navigation} = this.props;
    navigation.navigate('EditModemScreen');
  };

  render() {
    const {listModems} = this.state;
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
          icon={images.icAdd}
          onClick={this.handleOnClickAdd}
        />
        <FlatList
          style={styles.flatList}
          data={listModems}
          numColumns={2}
          renderItem={({item, index}) => (
            <ModemItem
              data={item}
              index={index}
              onClickDetail={this.handleOnClickItem}
              onClickEdit={this.handleOnClickEdit}
            />
          )}
          keyExtractor={item => item.id + ''}
        />
      </View>
    );
  }
}
