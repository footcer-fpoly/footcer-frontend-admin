import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
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
import auth from '@react-native-firebase/auth';
import Spinner from '../components/Spinner';
import { Message } from '../components/Message';

export default function OTPScreen({ route, navigation }) {
  const phone = route?.params?.phone;
  const [confirmResult, setConfirmResult] = useState({});
  const dispatch = useDispatch();
  const [pin1, setPin1] = useState('');
  const [pin2, setPin2] = useState('');
  const [pin3, setPin3] = useState('');
  const [pin4, setPin4] = useState('');
  const [pin5, setPin5] = useState('');
  const [pin6, setPin6] = useState('');
  const pin1ref = useRef(null);
  const pin2ref = useRef(null);
  const pin3ref = useRef(null);
  const pin4ref = useRef(null);
  const pin5ref = useRef(null);
  const pin6ref = useRef(null);
  const [timer, setTimer] = useState(0);
  const handleSendCode = async () => {
    console.log(
      '🚀 ~ file: OTPScreen.js ~ line 61 ~ handleSendCode ~ `+84${phone}`',
      `+84${phone}`,
    );
    try {
      console.log('🚀 ~ begin send code');
      const confirmation = await auth().signInWithPhoneNumber(`+84${phone}`);
      Message('Đã gửi mã xác thực');
      Spinner.hide();
      setConfirmResult(confirmation);
      setTimer(59);
    } catch (error) {
      Message('Lỗi gửi mã xác thực');
      Spinner.hide();
    }
  };

  const handleVerifyCode = async () => {
    Spinner.show();
    const pin = `${pin1}${pin2}${pin3}${pin4}${pin5}${pin6}`;
    if (pin.length === 6) {
      try {
        await confirmResult.confirm(pin);
        auth().signOut();
        navigation.replace('UpdatePasswordScreen', { phone: phone });
        Spinner.hide();
      } catch (error) {
        Message('Mã xác thực không đúng');
        Spinner.hide();
      }
    } else {
      Message('Mã xác thực phải 6 số');
      Spinner.hide();
    }
  };
  useEffect(() => {
    Spinner.show();
    console.log('🚀 ~ start send code');
    phone && handleSendCode();
    console.log('🚀 ~ end send code');
  }, []);
  const focusInput = (changePin, pin, next, prev) => {
    changePin;
    if (!pin.length) {
      if (next) {
        next.current.focus();
      }
    } else {
      if (prev) {
        prev.current.focus();
      }
    }
  };
  useEffect(() => {
    if (timer > 0) {
      setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
    }
  }, [timer]);
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
            fontSize: fonts.font20,
            marginTop: 50 * HEIGHT_SCALE,
            color: colors.colorGreen,
            textAlign: 'center',
            fontWeight: fonts.bold,
          }}>
          {phone}
        </Text>
        <Text
          style={{
            fontSize: fonts.font16,
            marginTop: 20 * HEIGHT_SCALE,
            color: colors.blackColor,
          }}>
          Vui lòng nhập mã xác thực
        </Text>
        <View style={styles.warpperInputOTP}>
          <TextInput
            ref={pin1ref}
            keyboardType="numeric"
            maxLength={2}
            onChangeText={(val) =>
              focusInput(setPin1(val), pin1, pin2ref, null)
            }
            value={pin1}
            style={styles.inputOTP}
            autoFocus
          />
          <TextInput
            ref={pin2ref}
            keyboardType="numeric"
            maxLength={1}
            onChangeText={(val) =>
              focusInput(setPin2(val), pin2, pin3ref, pin1ref)
            }
            value={pin2}
            style={styles.inputOTP}
          />
          <TextInput
            ref={pin3ref}
            keyboardType="numeric"
            maxLength={1}
            onChangeText={(val) =>
              focusInput(setPin3(val), pin3, pin4ref, pin2ref)
            }
            value={pin3}
            style={styles.inputOTP}
          />
          <TextInput
            ref={pin4ref}
            maxLength={1}
            keyboardType="numeric"
            onChangeText={(val) =>
              focusInput(setPin4(val), pin4, pin5ref, pin3ref)
            }
            value={pin4}
            style={styles.inputOTP}
          />
          <TextInput
            ref={pin5ref}
            maxLength={1}
            keyboardType="numeric"
            onChangeText={(val) =>
              focusInput(setPin5(val), pin5, pin6ref, pin4ref)
            }
            value={pin5}
            style={styles.inputOTP}
          />
          <TextInput
            ref={pin6ref}
            maxLength={1}
            keyboardType="numeric"
            onChangeText={(val) =>
              focusInput(setPin6(val), pin6, null, pin5ref)
            }
            value={pin6}
            style={styles.inputOTP}
            returnKeyType="done"
            onSubmitEditing={handleVerifyCode}
          />
        </View>
        {timer === 0 ? (
          <TouchableOpacity onPress={handleSendCode}>
            <Text style={{ fontSize: fonts.font14 }} t>
              Gửi lại
            </Text>
          </TouchableOpacity>
        ) : (
          <Text style={{ color: colors.colorGrayText, fontSize: fonts.font14 }}>
            Gửi lại sau: {timer}
          </Text>
        )}
        <TouchableOpacity
          style={{
            backgroundColor: colors.colorGreen,
            marginTop: 10 * HEIGHT_SCALE,
            borderRadius: 10 * HEIGHT_SCALE,
            paddingVertical: 15 * HEIGHT_SCALE,
            paddingHorizontal: 40 * WIDTH_SCALE,
            alignItems: 'center',
          }}
          onPress={handleVerifyCode}>
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
const styles = StyleSheet.create({
  inputOTP: {
    textAlign: 'center',
    fontSize: 30,
    margin: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'white',
    color: '#16a085',
    width: 35,
    backgroundColor: '#ecf0f1',
    paddingVertical: 5,
    height: 50,
    borderRadius: 5,
  },
  warpperInputOTP: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
