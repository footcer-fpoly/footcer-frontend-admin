import React, { Component } from 'react';
import { StatusBar, Text, View } from 'react-native';
import AppNavigation from './AppNavigation';
import { Provider } from 'react-redux';
import { store } from './redux/store/index';
import FlashMessage from 'react-native-flash-message';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <StatusBar translucent backgroundColor={'transparent'} />
        <AppNavigation />
        <FlashMessage position="top" floating={true} />
      </Provider>
    );
  }
}
