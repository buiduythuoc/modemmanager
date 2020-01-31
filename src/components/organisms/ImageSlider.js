import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Image} from 'react-native';
import {colors, images} from '../../themes';
import Carousel, {Pagination} from 'react-native-snap-carousel';

export default class ImageSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: [
        images.imgTimelineDefault,
        images.imgTimelineDefault,
        images.imgTimelineDefault,
      ],
      activeSlide: 0,
    };
  }

  _renderItem({item, index}) {
    return (
      <View style={styles.itemContainer}>
        <Image source={item} />
      </View>
    );
  }

  get pagination() {
    const {entries, activeSlide} = this.state;
    return (
      <Pagination
        dotsLength={entries.length}
        activeDotIndex={activeSlide}
        containerStyle={styles.paginationContainer}
        dotStyle={styles.dot}
        inactiveDotStyle={
          {
            // Define styles for inactive dots here
          }
        }
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }

  render() {
    return (
      <View>
        <Carousel
          data={this.state.entries}
          renderItem={this._renderItem}
          onSnapToItem={index => this.setState({activeSlide: index})}
          sliderWidth={400}
          itemWidth={400}
        />
        {this.pagination}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  paginationContainer: {
    backgroundColor: colors.black,
  },
  itemContainer: {
    flex: 1,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
  },
});
