import React from 'react';
import {Text} from 'react-native';
import styled from 'styled-components';

const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default class SplashScreen extends React.Component {
  render() {
    return (
      <Wrapper>
        <Text>LOGO</Text>
      </Wrapper>
    );
  }
}
