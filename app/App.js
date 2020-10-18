import React, {Component} from 'react';
import {Text, View} from 'react-native';
import AppNavigation from './AppNavigation';
import {Provider} from 'react-redux';
import {store} from './redux/store/index';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigation />
      </Provider>
    );
  }
}
