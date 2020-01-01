import React from 'react';
import {Text} from 'react-native';
import styled from 'styled-components';
import NavHeader from '../../components/molecules/NavHeader';

const Wrapper = styled.View`
  flex: 1;
`;

export default class TimelineScreen extends React.Component {
  render() {
    return (
      <Wrapper>
        <NavHeader title="Title" />
        <Text>TimelineScreen</Text>
      </Wrapper>
    );
  }
}
