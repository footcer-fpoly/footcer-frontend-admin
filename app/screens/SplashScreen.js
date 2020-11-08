import React, { useEffect } from 'react';
import { Image, ImageBackground, Text, View } from 'react-native';
import { persistStore } from 'redux-persist';
import { store } from '../redux/store';
import {
  HEIGHT,
  HEIGHT_SCALE,
  WIDTH,
  WIDTH_SCALE,
} from '../utils/ScaleAdaptor';
import IMAGE from '../utils/images.util';
import colors from '../theme/Colors';
import fonts from '../theme/ConfigStyle';
import { BarIndicator } from 'react-native-indicators';
import Colors from '../theme/Colors';
import API from '../server/api';
import { Message } from '../components/Message';
import { useDispatch } from 'react-redux';
import { REDUX } from '../redux/store/types';
import Axios from 'axios';

export default function SplashScreen({ route, navigation }) {
  const dispatch = useDispatch();
  const isCheckStadium = route?.params?.isCheckStadium
    ? route?.params?.isCheckStadium
    : false;
  useEffect(() => {
    isCheckStadium
      ? API.get('/stadium/info')
          .then(({ data }) => {
            const obj = data?.data;
            console.log('SplashScreen -> obj.latitude', obj);
            dispatch({ type: REDUX.UPDATE_STADIUM, payload: obj });
            obj?.latitude === -1 && obj?.longitude === -1
              ? navigation.replace('UpdateStadium')
              : navigation.replace('Dashboard');
          })
          .catch((onError) => {
            console.log('SignIn -> onError', onError);
            Message('Vui lòng kiểm tra thông tin đăng nhập');
          })
      : persistStore(store, null, () => {
          const isSignIn = store.getState().userReducer.loggedIn;
          const listStadium = store.getState().userReducer.listStadium;
          const token = store.getState().userReducer.token;
          isSignIn
            ? listStadium?.latitude === -1 && listStadium?.longitude === -1
              ? navigation.replace('UpdateStadium')
              : navigation.replace('Dashboard')
            : navigation.replace('Login');
          Axios.defaults.headers.common.Authorization = `Bearer ${token}`;
          API.defaults.headers.common.Authorization = `Bearer ${token}`;
        });
  }, []);
  return (
    <ImageBackground
      source={IMAGE.background}
      style={{
        width: WIDTH,
        height: HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={IMAGE.logo}
          style={{
            width: 140 * WIDTH_SCALE,
            height: 140 * WIDTH_SCALE,
            bottom: 20 * HEIGHT_SCALE,
          }}
        />
        <BarIndicator
          count={10}
          color={Colors.whiteColor}
          size={30 * HEIGHT_SCALE}
        />
        <Text
          style={{
            color: colors.whiteColor,
            fontSize: fonts.font16,
            fontWeight: fonts.bold,
            top: 20 * HEIGHT_SCALE,
          }}>
          Be healthier everyday
        </Text>
      </View>
    </ImageBackground>
  );
}
