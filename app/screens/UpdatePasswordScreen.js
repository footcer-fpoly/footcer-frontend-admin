import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import { useDispatch } from 'react-redux';
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
import TextInputCustom from '../components/TextInputCustom';

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
  const [isError, setIsError] = useState({
    name: false,
    password: false,
    confirmPassword: false,
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
        <View
          style={{
            borderColor: props?.isCheck ? colors.colorGreen : colors.colorRed,

            borderWidth: 1 * HEIGHT_SCALE,
            width: 0.8 * WIDTH,
            borderRadius: 10 * HEIGHT_SCALE,
            paddingHorizontal: 20 * WIDTH_SCALE,
            marginTop: 20 * HEIGHT_SCALE,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            source={props?.image ? props?.image : IMAGE.username}
            style={{
              height: 20 * WIDTH_SCALE,
              width: 20 * WIDTH_SCALE,
              marginRight: 10 * WIDTH_SCALE,
            }}
          />
          <TextInput
            style={{
              fontSize: fonts.font16,
              width: '100%',
            }}
            secureTextEntry={
              props?.secureTextEntry ? props?.secureTextEntry : false
            }
            maxLength={props?.maxLength ? props.maxLength : null}
            keyboardType={props?.keyboardType ? props?.keyboardType : null}
            onChangeText={props.onChangeText}
            returnKeyType={props.isDone ? 'done' : null}
            onSubmitEditing={props.isDone ? checkValidate : null}
          />
        </View>
      </View>
    );
  };
  const signUp = () => {
    setIsError({
      ...isError,
      name: false,
      password: false,
      confirmPassword: false,
    });
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
  const checkValidate = () => {
    Spinner.show();
    userSignUp.displayName
      ? userSignUp.password
        ? userSignUp.password >= 6
          ? userSignUp.confirmPassword
            ? userSignUp.password === userSignUp.confirmPassword
              ? signUp()
              : (Message('Nhập lại mật khẩu không đúng'), Spinner.hide())
            : (Message('Vui lòng nhập lại mật khẩu'),
              setIsError({
                ...isError,
                name: false,
                password: false,
                confirmPassword: true,
              }),
              Spinner.hide())
          : (Message('Mật khẩu phải trên 6 kí tự'),
            setIsError({
              ...isError,
              name: true,
              password: true,
              confirmPassword: true,
            }),
            Spinner.hide())
        : (Message('Vui lòng nhập mật khẩu'),
          setIsError({
            ...isError,
            name: false,
            password: true,
            confirmPassword: true,
          }),
          Spinner.hide())
      : (Message('Vui lòng nhập tên tài khoản'),
        setIsError({
          ...isError,
          name: true,
          password: true,
          confirmPassword: true,
        }),
        Spinner.hide());
  };
  return (
    <ImageBackground source={IMAGE.background} style={{ flex: 1 }}>
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
        <View
          style={{
            width: 0.8 * WIDTH,
            marginTop: 20 * HEIGHT_SCALE,
            alignItems: 'center',
          }}>
          <TextInputCustom
            style={{
              fontSize: fonts.font16,
              width: '100%',
            }}
            validate={isError.name}
            textError={'Vui lòng nhập họ và tên'}
            value={userSignUp.displayName}
            label="Nhập họ và tên"
            onChangeText={(text) =>
              setUserSignUp({ ...userSignUp, displayName: text?.trim() })
            }
            icon={() => (
              <Image
                source={IMAGE.username}
                style={{
                  top: 4 * WIDTH_SCALE,
                  height: 20 * WIDTH_SCALE,
                  width: 20 * WIDTH_SCALE,
                  marginRight: 10 * WIDTH_SCALE,
                }}
              />
            )}
          />
          <TextInputCustom
            style={{
              fontSize: fonts.font16,
              width: '100%',
            }}
            validate={isError.password}
            secureTextEntry={true}
            textError={'Vui lòng nhập mật khẩu'}
            value={userSignUp.password}
            label="Nhập mật khẩu"
            onChangeText={(text) =>
              setUserSignUp({ ...userSignUp, password: text?.trim() })
            }
            icon={() => (
              <Image
                source={IMAGE.password}
                style={{
                  top: 4 * WIDTH_SCALE,
                  height: 20 * WIDTH_SCALE,
                  width: 20 * WIDTH_SCALE,
                  marginRight: 10 * WIDTH_SCALE,
                }}
              />
            )}
          />
          <TextInputCustom
            style={{
              fontSize: fonts.font16,
              width: '100%',
            }}
            secureTextEntry={true}
            validate={isError.confirmPassword}
            textError={'Vui lòng nhập lại mật khẩu'}
            value={userSignUp.confirmPassword}
            label="Nhập lại mật khẩu"
            onChangeText={(text) =>
              setUserSignUp({ ...userSignUp, confirmPassword: text?.trim() })
            }
            icon={() => (
              <Image
                source={IMAGE.password}
                style={{
                  top: 4 * WIDTH_SCALE,
                  height: 20 * WIDTH_SCALE,
                  width: 20 * WIDTH_SCALE,
                  marginRight: 10 * WIDTH_SCALE,
                }}
              />
            )}
          />
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: colors.colorGreen,
            marginTop: 20 * HEIGHT_SCALE,
            borderRadius: 10 * HEIGHT_SCALE,
            paddingVertical: 15 * HEIGHT_SCALE,
            paddingHorizontal: 40 * WIDTH_SCALE,
            alignItems: 'center',
          }}
          onPress={checkValidate}>
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
