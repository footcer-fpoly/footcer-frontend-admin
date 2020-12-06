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
import TextInputCustom from '../components/TextInputCustom';

export default function PasswordScreen({ route, navigation }) {
  const phone = route?.params?.phone;
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState({ value: false, text: '' });
  const onLogIn = () => {
    Spinner.show();
    password
      ? password.length >= 6
        ? (setIsError({ value: false, text: '' }),
          dispatch(
            SignIn(phone, password, () => {
              Spinner.hide();
              navigation.replace('Splash', { isCheckStadium: true });
            }),
          ))
        : (setIsError({ value: true, text: 'Mật khẩu phải trên 6 kí tự' }),
          Spinner.hide())
      : (setIsError({ value: true, text: 'Vui lòng nhập mật khẩu' }),
        Spinner.hide());
  };
  return (
    <ImageBackground
      source={IMAGE.background}
      style={{ width: WIDTH, height: HEIGHT }}>
      <View
        style={{
          flex: 0.3,
          justifyContent: 'center',
          marginHorizontal: 20 * WIDTH_SCALE,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            source={IMAGE.logo}
            style={{
              height: 100 * WIDTH_SCALE,
              width: 100 * WIDTH_SCALE,
              marginRight: 10 * WIDTH_SCALE,
            }}
          />
          <View
            style={{
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
                marginTop: 10 * HEIGHT_SCALE,
              }}>
              Xin chào bạn!
            </Text>
          </View>
        </View>
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
              fontSize: fonts.font20,
              marginTop: 20 * HEIGHT_SCALE,
              color: colors.colorGreen,
              textAlign: 'center',
              fontWeight: fonts.bold,
            }}>
            {phone}
          </Text>
          <View
            style={{
              borderColor: isError ? colors.colorGreen : colors.colorRed,
              width: 0.8 * WIDTH,
              marginTop: 20 * HEIGHT_SCALE,
              alignItems: 'center',
            }}>
            <TextInputCustom
              style={{
                fontSize: fonts.font16,
                width: '100%',
              }}
              secureTextEntry={true}
              textError={isError.text}
              validate={isError.value}
              value={password}
              label="Nhập mật khẩu"
              onChangeText={setPassword}
              returnKeyType="done"
              onSubmitEditing={onLogIn}
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
            onPress={() => navigation.goBack()}
            style={{ marginVertical: 10 * HEIGHT_SCALE }}>
            <Text
              style={{
                fontSize: fonts.font14,
                color: colors.colorGrayText,
                textAlign: 'right',
              }}>
              Đổi số điện khác
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: colors.colorGreen,
            borderRadius: 10 * HEIGHT_SCALE,
            paddingVertical: 15 * HEIGHT_SCALE,
            paddingHorizontal: 40 * WIDTH_SCALE,
            alignItems: 'center',
          }}
          onPress={onLogIn}>
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
