import React, {Component} from 'react';
import {Provider} from 'react-redux';
import createStore from './redux';
import AppNavigation from './navigation/Primary';

const store = createStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigation />
      </Provider>
    );
  }
}
