import React from 'react';
import {View, FlatList} from 'react-native';
import {images} from '../../themes';
import styles from './styles';
import TabHeader from '../../components/organisms/TabHeader';
import TimelineItem from '../../components/organisms/TimelineItem';
import {scaleSize} from '../../themes/mixins';

export default class Timeline extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listTimeline: [
        {
          id: 1,
          title:
            'Something new about router \nOnly manage account can create this',
          time: '10:20AM 12/12/2019',
          backgroundImage: images.imgTimelineDefault,
        },
        {
          id: 2,
          title:
            'Something new about router \nOnly manage account can create this',
          time: '10:20AM 12/12/2019',
          backgroundImage: images.imgTimelineDefault,
        },
        {
          id: 3,
          title:
            'Something new about router \nOnly manage account can create this',
          time: '10:20AM 12/12/2019',
          backgroundImage: images.imgTimelineDefault,
        },
      ],
    };
  }

  static navigationOptions = {
    header: null,
  };

  render() {
    const {listTimeline} = this.state;
    return (
      <View style={styles.container}>
        <TabHeader
          source={images.imgMapTimeline}
          title={'Timeline'}
          height={scaleSize(167)}
        />
        <FlatList
          style={styles.flatList}
          data={listTimeline}
          renderItem={({item, index}) => <TimelineItem data={item} />}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}
