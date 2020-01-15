import React, {Component} from 'react';
import {Provider} from 'react-redux';
import configureStore from './stores';
import AppNavigation from './navigation/Primary';

const store = configureStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigation />
      </Provider>
    );
  }
}
