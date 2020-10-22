import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  RefreshControl,
} from 'react-native';
import PropTypes from 'prop-types';
import {getStatusBarHeight} from '../../utils/ScaleAdaptor';

const Container = (props) => {
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  useEffect(() => {
    if (Platform.OS === 'android') {
      setStatusBarHeight(StatusBar.currentHeight);
    } else {
      setStatusBarHeight(getStatusBarHeight(true));
    }
  }, []);
  return (
    <View style={styles.wrapper}>
      {props.header}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.wrapper}
      >
        <ScrollView
          keyboardShouldPersistTaps={
            props.keyboardShouldPersistTaps ? 'handled' : 'never'
          }
          scrollEnabled={!props.notScroll}
          style={{
            marginTop: props.headerHeight
              ? props.headerHeight + statusBarHeight
              : 0,
            ...styles.container,
          }}
          refreshControl={
            props.onRefresh ? (
              <RefreshControl
                refreshing={props.refreshing}
                onRefresh={props.onRefresh}
              />
            ) : null
          }
        >
        </ScrollView>
      </KeyboardAvoidingView>
      {props.footer ? props.footer : null}
    </View>
  );
};

Container.propTypes = {
  title: PropTypes.string,
  header: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  footer: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  headerHeight: PropTypes.number,
  keyboardAvoidingView: PropTypes.bool,
  keyboardShouldPersistTaps: PropTypes.bool,
  notScroll: PropTypes.bool,
};
export default Container;
const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
  },
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
