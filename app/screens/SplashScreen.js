import React, {useEffect} from 'react';
import {Text, View, SafeAreaView, TouchableOpacity} from 'react-native';
import {persistStore} from 'redux-persist';
import {store} from '../redux/store';

export default function SplashScreen({navigation}) {
  useEffect(() => {
    persistStore(store, null, () => {
      const isSignIn = store.getState().userReducer.loggedIn;
      console.log('SplashScreen -> isSignIn', isSignIn);
      isSignIn ? navigation.replace('Dashboard') : navigation.replace('Login');
    });
  }, []);
  return (
    <SafeAreaView>
      <Text> SplashScreen </Text>
    </SafeAreaView>
  );
}
