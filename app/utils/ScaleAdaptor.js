import { Dimensions, Platform, StatusBar } from 'react-native';

export function isIphoneX() {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 812 ||
      dimen.width === 812 ||
      dimen.height === 896 ||
      dimen.height === 896)
  );
}

export function ifIphoneX(iPhoneXStyle, regularStyle) {
  if (isIphoneX()) {
    return iPhoneXStyle;
  }
  return regularStyle;
}

export function getStatusBarHeight(safe) {
  return Platform.select({
    ios: ifIphoneX(safe ? 44 : 30, 20),
  });
}

export function getHeight(safe) {
  return Platform.select({
    ios: ifIphoneX(safe ? 82 : 62, 62),
  });
}

export function getHeightAnimated(safe) {
  return Platform.select({
    ios: ifIphoneX(safe ? 62 : 42, 62),
  });
}

export function getBottomSpace(safe) {
  return Platform.select({
    ios: ifIphoneX(safe ? 20 : 0, 0),
  });
}

export function getBottomCommentStream(safe) {
  return Platform.select({
    ios: ifIphoneX(safe ? 15 : 50, null),
  });
}

export function getHeaderStream(safe) {
  return Platform.select({
    ios: ifIphoneX(safe ? 55 : 55, null),
  });
}
//! TODO: check lại do modal của android
const { width, height } = Dimensions.get('screen');
const WIDTH = width;
const HEIGHT = height;
const IS_ANDROID = Platform.OS === 'android';
const IS_IOS = Platform.OS === 'ios';
const IS_IPAD = IS_ANDROID ? WIDTH / height < 1.6 : Platform.isPad;
// Use iPhone6 as base size which is 375 x 667
const baseWidth = 398;
const baseHeight = 736;
const WIDTH_SCALE = WIDTH / baseWidth;
const HEIGHT_SCALE = HEIGHT / baseHeight;

export {
  WIDTH,
  HEIGHT,
  IS_ANDROID,
  IS_IOS,
  IS_IPAD,
  baseWidth,
  baseHeight,
  WIDTH_SCALE,
  HEIGHT_SCALE,
};
