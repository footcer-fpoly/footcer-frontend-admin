import React, { useEffect, createRef } from 'react';
import { StatusBar, Text, View, Alert } from 'react-native';
import AppNavigation from './AppNavigation';
import { Provider } from 'react-redux';
import { store } from './redux/store/index';
import FlashMessage from 'react-native-flash-message';
import CodePush from 'react-native-code-push';
import Analytics from 'appcenter-analytics';
import Crashes from 'appcenter-crashes';

import API from './server/api';
import PushNotification from 'react-native-push-notification';
import { NavigationContainer } from '@react-navigation/native';
import { firebase } from '@react-native-firebase/messaging';
import Spinner from './components/Spinner';
import Colors from './theme/Colors';

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
  const navigation = createRef();
  useEffect(() => {
    // firebase
    //   .messaging()
    //   .getToken()
    //   .then((token) => {
    //     Clipboard.setString(token);
    //     console.log(
    //       'phat ~ file: App.js ~ line 82 ~  FCM registration tokens ',
    //       token,
    //     );
    //   });
    PushNotification.configure({
      onNotification: (notification) => {
        if (notification) {
          navigation.current?.navigate('OrderDetails', {
            id: notification?.generalId,
          });
        }
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
    const unsubscribe = firebase
      .messaging()
      .onMessage(async (remoteMessage) => {
        console.log(
          '🚀 ~ file: App.js ~ line 70 ~ .onMessage ~ remoteMessage',
          remoteMessage,
        );
        PushNotification.localNotification({
          largeIcon: 'ic_launcher',
          smallIcon: 'ic_notification',
          color: Colors.colorGreen,
          groupSummary: false,
          ongoing: false,
          priority: 'high',
          visibility: 'private',
          ignoreInForeground: false,
          onlyAlertOnce: true,
          channelId: 'fcm',
          messageId: remoteMessage?.id,
          autoCancel: false,
          generalId: JSON.parse(remoteMessage?.data?.body)?.generalId,
          title: JSON.parse(remoteMessage?.data?.body)?.title, // (optional)
          message: JSON.parse(remoteMessage?.data?.body)?.content, // (required)
          userInfo: {}, // (optional) default: {} (using null throws a JSON value '<null>' error)
          playSound: true, // (optional) default: true
          soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
          // repeatType: 'day', // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
        });
        // }
      });

    firebase.messaging().onNotificationOpenedApp(async (remoteMessage) => {
      tapOnNotification(remoteMessage, false);
    });
    firebase
      .messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          tapOnNotification(remoteMessage, true);
        }
      });

    return unsubscribe;
  }, []);
  const tapOnNotification = (remoteMessage, isInitApp) => {
    console.log(
      '🚀 ~ file: App.js ~ line 96 ~ tapOnNotification ~ remoteMessage',
      remoteMessage,
      isInitApp,
    );
    const delayTime = isInitApp ? 2000 : 0;
    // if (remoteMessage?.data?.reviewId) {
    //   setTimeout(
    //     () =>
    //       navigation.current?.navigate(ROUTE_KEY.ReviewDetails, {
    //         id: remoteMessage?.data?.reviewId,
    //       }),
    //     delayTime,
    //   );
    // } else if (remoteMessage?.data?.menuId) {
    //   setTimeout(
    //     () => navigation.current?.navigate(ROUTE_KEY.MenuChoice),
    //     delayTime,
    //   );
    // }
  };

  return (
    <Provider store={store}>
      <NavigationContainer ref={navigation}>
        <StatusBar translucent backgroundColor={'transparent'} />
        <AppNavigation />
        <FlashMessage position="top" floating={true} />
        <Spinner />
      </NavigationContainer>
    </Provider>
  );
}
