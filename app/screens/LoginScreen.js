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
import API from '../server/api';
import ModalComponent from '../components/ModalComponent';
import Spinner from '../components/Spinner';
import { Message } from '../components/Message';
import TextInputCustom from '../components/TextInputCustom';
import { notificationManager } from '../utils/NotificationManager';

export default function LoginScreen({ navigation, route }) {
  const phoneBack = route?.params?.phone;
  const [phone, setPhone] = useState('');
  const [isError, setIsError] = useState(false);
  const checkPhone = () => {
    setIsError(false);
    Spinner.show();
    if (validatePhone(phone)) {
      return API.post('/users/valid-phone', { phone: phone })
        .then(({ data }) => {
          console.log(
            '🚀 ~ file: LoginScreen.js ~ line 45 ~ checkPhone ~ data',
            data,
          );

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
    } else {
      setIsError(true);
      Spinner.hide();
    }
  };

  const senderID = '645190559310';

  useEffect(() => {
    phoneBack && setPhone(phoneBack);
    notificationManager.configure(
      onRegister,
      onNotification,
      onOpenNotification,
      senderID,
    );
  }, []);

  function onRegister(token) {
    console.log('[Notification] Registered: ', token);
  }

  function onNotification(notify) {
    console.log('[Notification] onNotification: ', notify);
  }

  function onOpenNotification(notify) {
    console.log('[Notification] onOpenNotification: ', notify);
    alert('Open Notification');
  }

  const onPressCancelNotification = () => {
    notificationManager.cancelAllLocalNotification();
  };

  const onPressSendNotification = () => {
    const options = {
      soundName: 'default',
      playSound: true,
      vibrate: true,
    };

    notificationManager.showNotification(
      1,
      'App notification',
      'Local notification',
      {},
      options,
    );
  };

  const ref = useRef();
  return (
    <ImageBackground source={IMAGE.background} style={{ flex: 1 }}>
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
        <Text
          style={{
            fontSize: fonts.font16,
            marginTop: 50 * HEIGHT_SCALE,
            color: colors.blackColor,
          }}>
          Dùng số điện thoại để đăng nhập hoặc đăng kí
        </Text>
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
            textError={'Số điện thoại không hợp lệ'}
            validate={isError}
            value={phone}
            keyboardType={'phone-pad'}
            maxLength={10}
            label="Nhập số điện thoại"
            onChangeText={setPhone}
            returnKeyType="done"
            onSubmitEditing={checkPhone}
            icon={() => (
              <Image
                source={IMAGE.phone}
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
          onPress={checkPhone}>
          <Text
            style={{
              color: colors.colorWhite,
              fontSize: fonts.font16,
              fontWeight: fonts.bold,
            }}>
            Tiếp tục
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: colors.colorGreen,
            marginTop: 20 * HEIGHT_SCALE,
            borderRadius: 10 * HEIGHT_SCALE,
            paddingVertical: 15 * HEIGHT_SCALE,
            paddingHorizontal: 40 * WIDTH_SCALE,
            alignItems: 'center',
          }}
          onPress={onPressSendNotification}>
          <Text
            style={{
              color: colors.colorWhite,
              fontSize: fonts.font16,
              fontWeight: fonts.bold,
            }}>
            Send Notifications
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: colors.colorGreen,
            marginTop: 20 * HEIGHT_SCALE,
            borderRadius: 10 * HEIGHT_SCALE,
            paddingVertical: 15 * HEIGHT_SCALE,
            paddingHorizontal: 40 * WIDTH_SCALE,
            alignItems: 'center',
          }}
          onPress={onPressCancelNotification}>
          <Text
            style={{
              color: colors.colorWhite,
              fontSize: fonts.font16,
              fontWeight: fonts.bold,
            }}>
            Cancel Notifications
          </Text>
        </TouchableOpacity>
      </View>
      <ModalComponent
        ref={ref}
        title="Xác nhận số điện thoại"
        onPress={() => {
          ref.current.hide();
          navigation.replace('OTPScreen', { phone: phone });
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
