import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Platform,
  Image,
} from 'react-native';
import {Text} from 'react-native-elements';
import PropTypes from 'prop-types';
import {getStatusBarHeight} from '../../utils/ScaleAdaptor';
import Styles from '../../theme/MainStyles';
import ImageUtils from '../../utils/images.util';
import ConfigStyle from '../../theme/ConfigStyle';
import Colors from '../../theme/Colors';

const width = Dimensions.get('window').width;

const StatusBarMain = (props) => {
  const [statusBarHeight, setStatusBarHeight] = useState(0);

  useEffect(() => {
    if (Platform.OS === 'android') {
      setStatusBarHeight(StatusBar.currentHeight);
    } else {
      setStatusBarHeight(getStatusBarHeight(true));
    }
  }, []);

  return (
    <View
      style={[styles.supperWrapper]}
    >
      <View
        style={[
          styles.headerWrapper,
          props.headerHeight
            ? {height: props.headerHeight + statusBarHeight}
            : {},
        ]}
      >
        <View
          style={{
            ...styles.container,
            marginTop: statusBarHeight,
            height:
              (props.headerHeight
                ? props.headerHeight + statusBarHeight
                : ConfigStyle.statusBarHeight) -
              (Platform.OS === 'ios'
                ? getStatusBarHeight(true)
                : StatusBar.currentHeight),
          }}
        >
          <View
            style={{
              ...styles.contentBar,
              ...props.contentBarStyles,
              marginBottom: Platform.OS === 'android' ? statusBarHeight / 2 : 0,
            }}
          >
            {/* action left */}
            {props.textLeft || props.arrowBack ? (
              <View style={{...styles.holdAction}}>
                {props.textLeft ? (
                  <TouchableOpacity onPress={() => props.actionLeft}>
                    <Text style={styles.textAction}>{props.textLeft}</Text>
                  </TouchableOpacity>
                ) : <View style={{...styles.holdAction}}/>}
                {props.arrowBack ? (
                  <TouchableOpacity
                    onPress={() => props.navigation.goBack()}
                    style={styles.wrapArrowLeft}
                  >
                    <Image
                      style={styles.iconArrowLeft}
                      source={ImageUtils.iconArrowLeft}
                    />
                  </TouchableOpacity>
                ) : <View style={{...styles.holdAction}}/>}
              </View>
            ) : <View style={{...styles.holdAction}}/>}
            {/* content */}
            <View style={styles.mainContent}>
              {props.title ? (
                <View style={styles.wrapTitle}>
                  <Text
                    style={[
                      Styles.title1RS,
                      styles.title,
                      props.tabLabels ? {marginBottom: 8} : {},
                    ]}
                  >
                    {props.title}
                  </Text>
                </View>
              ) : null}
            </View>
            <View style={{...styles.holdAction}}/>
          </View>
        </View>
      </View>
    </View>
  );
};
StatusBarMain.prototype = {
  title: PropTypes.string,
  textLeft: PropTypes.string,
  actionLeft: PropTypes.func,
};
export default StatusBarMain;

const styles = StyleSheet.create({
  supperWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 99,
    shadowColor: Colors.greyShadow,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5
  },
  headerWrapper: {
    backgroundColor: Colors.whiteColor,
    overflow: 'hidden',
  },
  container: {
    // minHeight: 90,
    marginTop: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width,
    paddingHorizontal: 18,
    alignItems: 'center',
    zIndex: 99,
  },
  contentBar: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  title: {
    color: '#000',
    fontFamily:'Roboto-Medium',
  },
  wrapTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 0,
  },
  holdAction: {
    width: 30,
    justifyContent: 'center',
  },
  mainContent: {
    justifyContent: 'flex-start',
    flex: 1,
  },
  textAction: {
    color: '#fff',
  },
  iconArrowLeft: {
    width: 11,
    height: 22,
  },
  wrapArrowLeft: {
    paddingVertical: 10,
    paddingLeft: 5,
  },
});
