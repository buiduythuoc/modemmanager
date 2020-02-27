import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import NavHeader from '../../../components/molecules/NavHeader';
import {images} from '../../../themes';

export default class NotificationDetail extends React.Component {
  constructor(props) {
    super(props);
    const {navigation} = props;
    this.state = {
      data: navigation.getParam('data', null),
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
    const {data} = this.state;
    const {title, description} = data;
    const time = data.created_at;
    return (
      <View style={styles.container}>
        <NavHeader
          title=""
          leftIcon={images.icBackBlack}
          onLeftClick={this.handleOnClickBack}
        />
        <View style={styles.content}>
          <Text style={styles.time}>{time}</Text>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
    );
  }
}
