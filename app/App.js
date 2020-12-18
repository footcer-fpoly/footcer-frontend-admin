import React, { useEffect, useState } from 'react';
import { StatusBar, Text, View, Alert } from 'react-native';
import AppNavigation from './AppNavigation';
import { Provider } from 'react-redux';
import { store } from './redux/store/index';
import FlashMessage from 'react-native-flash-message';
import CodePush from 'react-native-code-push';
import Analytics from 'appcenter-analytics';
import Crashes from 'appcenter-crashes';
import { Message } from './components/Message';
import { notificationManager } from './utils/NotificationManager';
import { fcmService } from './utils/FCMService';
import API from './server/api';

let DEBUG = __DEV__ ? true : false;
export default function () {
  useEffect(() => {
    Crashes.setEnabled(!DEBUG);
    Analytics?.setEnabled(!DEBUG);
  }, []);
  useEffect(() => {
    CodePush?.disallowRestart();
    CodePush?.sync(
      { installMode: CodePush.InstallMode.IMMEDIATE },
      (status) => {
        switch (status) {
          case CodePush.SyncStatus.UPDATE_INSTALLED:
            Alert.alert(
              'Cập nhật thành công!',
              'Muốn sài bản mới nhất thì tắt app mở lại. OK!.',
            );
            break;
        }
      },
    );
  }, []);
  useEffect(() => {
    fcmService.register(onRegister, onNotification, onOpenNotification);
  }, []);

  function onRegister(token) {
    // console.log('[NotificationFCM] Registered: ', token);
  }

  function onNotification(notify) {
    onPressSendNotification(notify);
  }

  function onOpenNotification(notify) {
    console.log(
      '🚀 ~ file: App.js ~ line 58 ~ onOpenNotification ~ notify',
      notify,
    );
    // Alert.alert('Open Notification');
  }

  const onPressCancelNotification = () => {
    notificationManager.cancelAllLocalNotification();
  };

  const onPressSendNotification = (notify) => {
    console.log(
      '🚀 ~ file: App.js ~ line 67 ~ onPressSendNotification ~ notify',
      notify,
    );
    const options = {
      soundName: 'default',
      playSound: true,
      vibrate: true,
    };
    notificationManager.showNotification(
      1,
      notify?.title,
      notify?.body,
      {},
      options,
    );
  };
  return (
    <Provider store={store}>
      <StatusBar translucent backgroundColor={'transparent'} />
      <AppNavigation />
      <FlashMessage position="top" floating={true} />
    </Provider>
  );
}
