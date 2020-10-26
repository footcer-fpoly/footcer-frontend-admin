import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { SignIn } from '../redux/actions/userAction';
import IMAGE from '../utils/images.util';
import colors from '../theme/Colors';
import fonts from '../theme/ConfigStyle';
import {
  HEIGHT,
  HEIGHT_SCALE,
  WIDTH,
  WIDTH_SCALE,
} from '../utils/ScaleAdaptor';
import API from '../server/api';
import Spinner from '../components/Spinner';
import Axios from 'axios';
import { REDUX } from '../redux/store/types';
import { Message } from '../components/Message';

export default function UpdatePasswordScreen({ route, navigation }) {
  const phone = route?.params?.phone;
  const [userSignUp, setUserSignUp] = useState({
    phone: phone,
    image: 'http://footcer.tk:4000/static/user/avatar.png',
    password: '',
    confirmPassword: '',
    displayName: '',
    role: 1,
  });
  const dispatch = useDispatch();
  const inputCell = (props) => {
    return (
      <View>
        <Text
          style={{
            fontSize: fonts.font16,
            marginTop: 20 * HEIGHT_SCALE,
            color: colors.blackColor,
          }}>
          {props.title}
        </Text>
        <TextInput
          style={{
            borderColor: colors.borderGreen,
            borderWidth: 1 * HEIGHT_SCALE,
            width: 0.8 * WIDTH,
            marginTop: 10 * HEIGHT_SCALE,
            borderRadius: 10 * HEIGHT_SCALE,
            fontSize: fonts.font16,
            paddingHorizontal: 20 * WIDTH_SCALE,
          }}
          secureTextEntry={
            props?.secureTextEntry ? props?.secureTextEntry : false
          }
          maxLength={props?.maxLength ? props.maxLength : null}
          keyboardType={props?.keyboardType ? props?.keyboardType : null}
          onChangeText={props.onChangeText}
        />
      </View>
    );
  };
  const signUp = () => {
    Spinner.show();
    return API.post('/users/sign-up-phone', {
      phone: userSignUp.phone,
      password: userSignUp.password,
      avatar: userSignUp.avatar,
      displayName: userSignUp.displayName,
      role: 1,
    })
      .then(({ data }) => {
        const obj = data?.data;
        if (data.code === 200) {
          Axios.defaults.headers.common.Authorization = `Bearer ${obj.token}`;
          API.defaults.headers.common.Authorization = `Bearer ${obj.token}`;
          dispatch({ type: REDUX.UPDATE_USER_DATA, payload: obj });
          dispatch({ type: REDUX.UPDATE_USER_TOKEN, payload: obj.token });
          dispatch({ type: REDUX.LOGGED_IN });
          Spinner.hide();
          navigation.replace('Splash', { isCheckStadium: true });
        } else {
          Spinner.hide();
          Message('Đăng kí thất bại');
        }
      })
      .catch((onError) => {
        console.log(onError);
        Spinner.hide();
      });
  };
  return (
    <ImageBackground
      source={IMAGE.background}
      style={{ width: WIDTH, height: HEIGHT, flex: 1 }}>
      <View
        style={{
          marginHorizontal: 20 * WIDTH_SCALE,
          flex: 0.3,
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: colors.colorWhite,
            fontSize: fonts.font25,
            fontWeight: fonts.bold,
          }}>
          Cập nhật thông tin chủ sân
        </Text>
        <Text
          style={{
            color: colors.colorWhite,
            fontSize: fonts.font16,
            top: 20 * HEIGHT_SCALE,
          }}>
          Xin chào bạn!
        </Text>
      </View>
      <View
        style={{
          flex: 0.7,
          backgroundColor: colors.colorWhite,
          borderTopRightRadius: 50 * WIDTH_SCALE,
          borderTopLeftRadius: 50 * WIDTH_SCALE,
          alignItems: 'center',
        }}>
        {inputCell({
          title: 'Nhập họ và tên:',
          onChangeText: (text) =>
            setUserSignUp({ ...userSignUp, displayName: text?.trim() }),
        })}
        {inputCell({
          title: 'Nhập mật khẩu:',
          onChangeText: (text) =>
            setUserSignUp({ ...userSignUp, password: text?.trim() }),
          maxLength: 6,
          secureTextEntry: true,
          keyboardType: 'number-pad',
        })}
        {inputCell({
          title: 'Nhập mật khẩu:',
          onChangeText: (text) =>
            setUserSignUp({ ...userSignUp, confirmPassword: text?.trim() }),
          maxLength: 6,
          secureTextEntry: true,
          keyboardType: 'number-pad',
        })}
        <TouchableOpacity
          style={{
            backgroundColor: colors.colorGreen,
            marginTop: 20 * HEIGHT_SCALE,
            borderRadius: 10 * HEIGHT_SCALE,
            paddingVertical: 15 * HEIGHT_SCALE,
            paddingHorizontal: 40 * WIDTH_SCALE,
            alignItems: 'center',
          }}
          onPress={() => {
            if (
              userSignUp.password &&
              userSignUp.confirmPassword &&
              userSignUp.displayName
            ) {
              userSignUp.password === userSignUp.confirmPassword
                ? signUp()
                : Message('Nhập lại mật khẩu không đúng');
            } else Message('Vui lòng nhập đầy đủ thông tin');
          }}>
          <Text
            style={{
              color: colors.colorWhite,
              fontSize: fonts.font16,
              fontWeight: fonts.bold,
            }}>
            Tiếp tục
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
