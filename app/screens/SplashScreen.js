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
  const isCheckStadium = route?.params?.isCheckStadium;
  const dispatch = useDispatch();
  useEffect(() => {
    persistStore(store, null, () => {
      const isSignIn = store.getState().userReducer.loggedIn;
      const token = store.getState().userReducer.token;
      console.log('SplashScreen -> token', token);
      if (isSignIn) {
        Axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        API.defaults.headers.common.Authorization = `Bearer ${token}`;
        API.get('/stadium/info')
          .then(({ data }) => {
            const obj = data?.data;
            dispatch({ type: REDUX.UPDATE_STADIUM, payload: obj });
            obj?.latitude === -1 && obj?.longitude === -1
              ? navigation.replace('UpdateStadium', {
                  isCheckStadium: isCheckStadium,
                })
              : navigation.replace('Home');
          })
          .catch((onError) => {
            console.log('Stadium -> onError', onError);
            Message('Lỗi');
          });
      } else {
        setTimeout(() => {
          navigation.replace('Login');
        }, 2000);
      }
    });
  }, []);
  return (
    <ImageBackground
      source={IMAGE.background}
      style={{
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
      }}>
      <View
        style={{
          top: 0.25 * HEIGHT,
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
