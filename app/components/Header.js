import React, { useEffect, useState } from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import Colors from '../theme/Colors';
import {
  HEIGHT_SCALE,
  WIDTH_SCALE,
  getStatusBarHeight,
} from '../utils/ScaleAdaptor';
import Icon from 'react-native-vector-icons/FontAwesome5';
const Header = ({
  left,
  center,
  right,
  style,
  leftStyle,
  rightStyle,
  barStyle,
  navigation,
  hideBack,
}) => {
  return (
    <View style={[{ backgroundColor: Colors.colorGreen }, style]}>
      <StatusBar barStyle={barStyle} />
      <View style={styles.statusbar} />
      <View style={styles.container}>
        <View style={[styles.iconStyle, styles.left, leftStyle]}>
          {hideBack ? null : (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Icon
                style={styles.iconHeader}
                name="chevron-left"
                size={21}
                color="white"
              />
            </TouchableOpacity>
          )}
        </View>
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
    height: 48 * HEIGHT_SCALE,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'transparent',
    paddingHorizontal: 10 * WIDTH_SCALE,
    alignItems: 'center',
  },
  statusbar: {
    height: Platform.select({
      ios: getStatusBarHeight(true),
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
