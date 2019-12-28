import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import styled from 'styled-components';
import NavigationService from '../services/navigationService';
import AppNavigation from '../navigation/Primary';

const Wrapper = styled.View`
  flex: 1;
`;

class RootScreen extends Component {
  componentDidMount() {}

  render() {
    return (
      <Wrapper>
        <AppNavigation
          // Initialize the NavigationService (see https://reactnavigation.org/docs/en/navigating-without-navigation-prop.html)
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </Wrapper>
    );
  }
}

RootScreen.propTypes = {
  startup: PropTypes.func,
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(RootScreen);
