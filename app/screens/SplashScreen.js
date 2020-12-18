import React, { useEffect, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { REDUX } from '../redux/store/types';
import Axios from 'axios';
import database from '@react-native-firebase/database';
import { fcmService } from '../utils/FCMService';

export default function SplashScreen({ route, navigation }) {
  const domain = useSelector((state) => state?.userReducer?.domain);
  const [tokenNoti, setTokenNoti] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    async () => {
      await database()
        .ref('/settings/domain')
        .on('value', (snapshot) => {
          dispatch({ type: REDUX.ADD_DOMAIN, payload: snapshot.val() });
        });
    };
  }, []);
  useEffect(() => {
    fcmService.register(onRegister);
  }, []);

  function onRegister(token) {
    setTokenNoti(token);
    // console.log('[NotificationFCM] Registered: ', token);
  }
  useEffect(() => {
    persistStore(store, null, () => {
      const isSignIn = store.getState().userReducer.loggedIn;
      const token = store.getState().userReducer.token;
      console.log('SplashScreen -> token', token);
      Axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      API.defaults.headers.common.Authorization = `Bearer ${token}`;
      if (domain) {
        console.log(
          '🚀 ~ file: SplashScreen.js ~ line 43 ~ persistStore ~ domain',
          domain,
        );
        tokenNoti &&
          API.put(`${domain}/users/update-notify`, { tokenNotify: tokenNoti })
            .then(({ data }) => {
              const obj = data?.data;
              console.log(
                '🚀 ~ file: SplashScreen.js ~ line 33 ~ .then ~ obj',
                data,
              );
            })
            .catch((onError) => {
              console.log('Token Noti -> onError', onError);
            });
        if (isSignIn) {
          API.get(`${domain}/stadium/info`)
            .then(({ data }) => {
              const obj = data?.data;
              dispatch({ type: REDUX.UPDATE_STADIUM, payload: obj });
              obj?.latitude === -1 && obj?.longitude === -1
                ? navigation.replace('UpdateStadium')
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
      }
    });
  }, [domain]);

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
