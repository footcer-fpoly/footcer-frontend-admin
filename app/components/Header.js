import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { HEIGHT_SCALE } from '../utils/ScaleAdaptor';
const Header = ({
  left,
  center,
  right,
  style,
  leftStyle,
  rightStyle,
  barStyle,
}) => {
  return (
    <View style={style}>
      <StatusBar barStyle={barStyle} />
      <View style={styles.statusbar} />
      <View style={styles.container}>
        <View style={[styles.iconStyle, styles.left, leftStyle]}>{left}</View>
        <View style={styles.center}>{center}</View>
        <View style={[styles.iconStyle, styles.right, rightStyle]}>
          {right}
        </View>
      </View>
    </View>
  );
};
export default Header;
const styles = StyleSheet.create({
  container: {
    height: 60 * HEIGHT_SCALE,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    alignItems: 'stretch',
  },
  statusbar: {
    height: Platform.select({
      ios: 0,
      android: StatusBar.currentHeight,
      default: 0,
    }),
  },
  iconStyle: {
    justifyContent: 'center',
    minWidth: '15%',
    maxWidth: '40%',
  },
  left: {
    alignItems: 'flex-start',
  },
  right: {
    alignItems: 'flex-end',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
