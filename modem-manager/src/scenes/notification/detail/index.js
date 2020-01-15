import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import NavHeader from '../../../components/molecules/NavHeader';
import {colors, images} from '../../../themes';

export default class BlockList extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    header: null,
  };

  handleOnClickBack = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };

  render() {
    return (
      <View style={styles.container}>
        <NavHeader
          title=""
          leftIcon={images.icBackBlack}
          onLeftClick={this.handleOnClickBack}
        />
        <View style={styles.content}>
          <Text style={styles.time}>10:20AM 12/12/2019</Text>
          <Text style={styles.title}>How to cofo DDNS for Router Easy way</Text>
          <Text style={styles.description}>
            This guide will help you setup and configure Dynamic DNS within your
            Router. Configuring DDNS in your router means that you don’t have to
            use our Dynamic Update Client to keep your hostname updated with the
            correct IP address. Instead, you use the Integrated Dynamic DNS. Not
            all router manufacturers include No-IP as an Integrated Dynamic DNS
            provider. If you find that yours does not, drop them a Tweet or
            Email and ask them to add us.
          </Text>
        </View>
      </View>
    );
  }
}
