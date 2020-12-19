/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './app/App';
import { name as appName } from './app.json';
import 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
Modal.defaultProps.backdropColor = '#00000080';
Modal.defaultProps.statusBarTranslucent = true;
Modal.defaultProps.animationIn = 'fadeIn';
Modal.defaultProps.animationOut = 'fadeOut';
Modal.defaultProps.backdropTransitionOutTiming = 0;
Modal.defaultProps.hideModalContentWhileAnimating = true;

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  // console.log('phat ~ file: index.js ~ line 57 ~ messaging ~ remoteMessage', remoteMessage)
});

PushNotification.createChannel({
  channelId: 'fcm', // (required)
  channelName: 'FCM', // (required)
  soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
  importance: 4, // (optional) default: 4. Int value of the Android notification importance
  vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
});

AppRegistry.registerComponent(appName, () => App);
