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
import { validatePhone } from '../utils/validatePhone';
import IMAGE from '../utils/images.util';
import colors from '../theme/Colors';
import fonts from '../theme/ConfigStyle';
import {
  HEIGHT,
  HEIGHT_SCALE,
  WIDTH,
  WIDTH_SCALE,
} from '../utils/ScaleAdaptor';
import { Message } from '../components/Message';
import Spinner from '../components/Spinner';

export default function PasswordScreen({ route, navigation }) {
  const phone = route?.params?.phone;
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const onLogIn = () => {
    Number.isInteger(parseInt(password))
      ? password.length === 6
        ? dispatch(
            SignIn(phone, password, () => {
              Spinner.hide();
              navigation.replace('Splash', { isCheckStadium: true });
            }),
          )
        : (Message('Mật khẩu phải 6 số'), Spinner.hide())
      : (Message('Vui lòng nhập mật khẩu'), Spinner.hide());
  };
  return (
    <ImageBackground
      source={IMAGE.background}
      style={{ width: WIDTH, height: HEIGHT }}>
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
          Đăng Nhập
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
        <View>
          <Text
            style={{
              fontSize: fonts.font16,
              marginTop: 50 * HEIGHT_SCALE,
              color: colors.blackColor,
            }}>
            Nhập mật khẩu:
          </Text>

          <TextInput
            style={{
              borderColor: colors.borderGreen,
              borderWidth: 1 * HEIGHT_SCALE,
              width: 0.8 * WIDTH,
              marginTop: 20 * HEIGHT_SCALE,
              borderRadius: 10 * HEIGHT_SCALE,
              fontSize: fonts.font16,
              paddingHorizontal: 20 * WIDTH_SCALE,
            }}
            secureTextEntry={true}
            autoFocus
            keyboardType={'number-pad'}
            maxLength={6}
            onChangeText={(text) => setPassword(text)}
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
          onPress={() => {
            Spinner.show();
            onLogIn();
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
