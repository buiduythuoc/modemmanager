import React from 'react';
import {View, FlatList} from 'react-native';
import {images} from '../../../themes';
import styles from './styles';
import TabHeader from '../../../components/organisms/TabHeader';
import NotificationItem from '../../../components/organisms/NotificationItem';
import {scaleSize} from '../../../themes/mixins';

export default class Notification extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listNotifications: [
        {
          id: 1,
          avatar: images.imgTimelineDefault,
          title:
            'Something new about router\nOnly manage account can create this',
          time: '10:20AM 12/12/2019',
        },
        {
          id: 2,
          avatar: images.imgTimelineDefault,
          title:
            'Something new about router\nOnly manage account can create this',
          time: '10:20AM 12/12/2019',
        },
        {
          id: 3,
          avatar: images.imgTimelineDefault,
          title:
            'Something new about router\nOnly manage account can create this',
          time: '10:20AM 12/12/2019',
        },
        {
          id: 4,
          avatar: images.imgTimelineDefault,
          title:
            'Something new about router\nOnly manage account can create this',
          time: '10:20AM 12/12/2019',
        },
        {
          id: 5,
          avatar: images.imgTimelineDefault,
          title:
            'Something new about router\nOnly manage account can create this',
          time: '10:20AM 12/12/2019',
        },
      ],
    };
  }

  static navigationOptions = {
    header: null,
  };

  handleOnClickItem = () => {
    const {navigation} = this.props;
    navigation.navigate('NotificationDetailScreen');
  };

  render() {
    const {listNotifications} = this.state;
    return (
      <View style={styles.container}>
        <TabHeader
          source={images.imgMapAccount}
          title={'Notification'}
          height={scaleSize(100)}
        />
        <FlatList
          style={styles.flatList}
          data={listNotifications}
          renderItem={({item}) => (
            <NotificationItem data={item} onClick={this.handleOnClickItem} />
          )}
          keyExtractor={item => item.id + ''}
        />
      </View>
    );
  }
}
