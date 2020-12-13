import React, { useEffect, useState } from 'react';
import { StatusBar, Text, View } from 'react-native';
import AppNavigation from './AppNavigation';
import { Provider } from 'react-redux';
import { store } from './redux/store/index';
import FlashMessage from 'react-native-flash-message';
import CodePush from 'react-native-code-push';
import Analytics from 'appcenter-analytics';
import { Message } from './components/Message';
import { notificationManager } from './utils/NotificationManager';

export default function () {
  useEffect(() => {
    CodePush?.disallowRestart();
    CodePush?.sync(
      { installMode: CodePush.InstallMode.IMMEDIATE },
      (status) => {
        switch (status) {
          case CodePush.SyncStatus.UPDATE_INSTALLED:
            Message(
              'Update successful!',
              'Please reset the app to complete the update.',
            );
            break;
        }
      },
    );
  }, []);
  useEffect(() => {
    // notificationManager.configure();
    console.log('aaaaaaaaaaaaaaaaa');
  }, []);
  return (
    <Provider store={store}>
      <StatusBar translucent backgroundColor={'transparent'} />
      <AppNavigation />
      <FlashMessage position="top" floating={true} />
    </Provider>
  );
}
