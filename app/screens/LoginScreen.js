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
import API from '../server/api';
import ModalComponent from '../components/ModalComponent';
import Spinner from '../components/Spinner';
import { Message } from '../components/Message';
export default function LoginScreen({ navigation }) {
  const [phone, setPhone] = useState('');
  const checkPhone = () => {
    Spinner.show();
    return API.post('/users/valid-phone', { phone: phone })
      .then(({ data }) => {
        if (data.code === 200) {
          Spinner.hide();
          ref.current.show();
        } else if (data.code === 203) {
          Spinner.hide();
          navigation.replace('PasswordScreen', { phone: phone });
        } else if (data.code === 209) {
          Spinner.hide();
          Message('Bạn là người dùng, không thể đăng nhập ứng dụng');
        }
      })
      .catch((onError) => {
        Spinner.hide();
        Message('Lỗi kiểm tra số điện thoại');
        console.log(onError);
      });
  };
  const ref = useRef();

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
        <Text
          style={{
            fontSize: fonts.font16,
            marginTop: 50 * HEIGHT_SCALE,
            color: colors.blackColor,
          }}>
          Dùng số điện thoại để đăng nhập hoặc đăng kí
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
          autoFocus
          keyboardType={'phone-pad'}
          maxLength={10}
          placeholder="Nhập số điện thoại của bạn"
          onChangeText={(text) => setPhone(text)}
        />
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
            if (validatePhone(phone)) {
              checkPhone();
            } else {
              Message('Số điện thoại không hợp lệ');
              Spinner.hide();
            }
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
      <ModalComponent
        ref={ref}
        title="Xác nhận đăng nhập"
        onPress={() => {
          ref.current.hide();
          navigation.navigate('OTPScreen', { phone: phone });
        }}>
        <Text style={{ fontWeight: fonts.bold }}>{phone}</Text>
        <Text style={{ fontSize: fonts.font16 }}>
          Mã xác thực sẽ gửi đến số điện thoại của bạn đã nhâp. Bạn có muốn tiếp
          tục?
        </Text>
      </ModalComponent>
    </ImageBackground>
  );
}
