import React, {useEffect, useState} from 'react';
import { StatusBar, Text, View } from 'react-native';
import AppNavigation from './AppNavigation';
import { Provider } from 'react-redux';
import { store } from './redux/store/index';
import FlashMessage from 'react-native-flash-message';
import {notificationManager} from './utils/NotificationManager';

export default function App(props) {

  useEffect(() => {
    notificationManager.configure();
    console.log('aaaaaaaaaaaaaaaaa');
  })

    return (
      <Provider store={store}>
        <StatusBar translucent backgroundColor={'transparent'} />
        <AppNavigation />
        <FlashMessage position="top" floating={true} />
      </Provider>
    );
}
