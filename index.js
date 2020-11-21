/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './app/App';
import { name as appName } from './app.json';
import 'react-native-gesture-handler';
import Modal from 'react-native-modal';

Modal.defaultProps.backdropColor = '#00000080';
Modal.defaultProps.statusBarTranslucent = true;
Modal.defaultProps.animationIn = 'fadeIn';
Modal.defaultProps.animationOut = 'fadeOut';
Modal.defaultProps.backdropTransitionOutTiming = 0;
Modal.defaultProps.hideModalContentWhileAnimating = true;

AppRegistry.registerComponent(appName, () => App);
