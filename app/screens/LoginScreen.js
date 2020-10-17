import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  ViewBase,
  ToastAndroid,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import API from '../server/api';

export default function LoginScreen({navigation}) {
  const [phone, setPhone] = useState();
  const [verifyCode, setVerifyCode] = useState();
  const [confirmResult, setConfirmResult] = useState();
  const [isHandleSentCode, setIsHandleSentCode] = useState(false);
  const [isHandleVerifyCode, setIsHandleVerifyCode] = useState(false);
  const [user, setUser] = useState({
    phone: '',
    image: 'http://footcer.tk:4000/static/user/avatar.png',
    password: '',
    confirmPassword: '',
    displayName: '',
    role: 1,
  });
  const checkPhone = () => {
    return API.post('/users/valid-phone', {phone: phone})
      .then(({data}) => {
        if (data.code === 200) {
          setIsHandleSentCode(true);
          ToastAndroid.showWithGravity(
            'Please! Click button sent verify code',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        } else {
          ToastAndroid.showWithGravity(
            'Number phone was sign up',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          setIsHandleSentCode(false);
        }
      })
      .catch((onError) => {
        setIsHandleSentCode(false);
        console.log(onError);
      });
  };
  const signUp = () => {
    setUser({...user, phone: phone});
    return API.post('/users/sign-up-phone', {
      phone: user.phone,
      password: user.password,
      avatar: user.avatar,
      displayName: user.displayName,
      role: 1,
    })
      .then(({data}) => {
        if (data.code === 200) {
          setIsHandleSentCode(true);
          ToastAndroid.showWithGravity(
            'Sign up successfully',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          navigation.replace('Dashboard');
        } else {
          ToastAndroid.showWithGravity(
            'Sign up failed',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          setIsHandleSentCode(false);
        }
      })
      .catch((onError) => {
        setIsHandleSentCode(false);
        console.log(onError);
      });
  };
  const handleSendCode = async () => {
    const confirmation = await auth().signInWithPhoneNumber(`+84${phone}`);
    ToastAndroid.showWithGravity(
      'Sent OTP code',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
    setConfirmResult(confirmation);
  };
  const handleVerifyCode = async () => {
    if (verifyCode.length === 6) {
      try {
        await confirmResult.confirm(verifyCode);
        ToastAndroid.showWithGravity(
          'Verify code successfully',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
        setIsHandleVerifyCode(true);
      } catch (error) {
        ToastAndroid.showWithGravity(
          'Verify code fail',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
        setIsHandleVerifyCode(false);
      }
    } else {
      ToastAndroid.showWithGravity(
        'Verify code 6 characters',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
  };
  return (
    <SafeAreaView>
      <Text> Login </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <TextInput
          keyboardType={'phone-pad'}
          placeholder="Number phone"
          onChangeText={(text) => setPhone(text)}
        />
        <TouchableOpacity onPress={() => checkPhone()}>
          <Text>Check phone</Text>
        </TouchableOpacity>
      </View>

      {isHandleSentCode && (
        <View>
          <TouchableOpacity onPress={() => handleSendCode()}>
            <Text>Sent Verify Code</Text>
          </TouchableOpacity>
          <TextInput
            keyboardType={'number-pad'}
            placeholder="Verify Code"
            onChangeText={(text) => setVerifyCode(text)}
          />
          <TouchableOpacity onPress={() => handleVerifyCode()}>
            <Text>Handle Verify Code</Text>
          </TouchableOpacity>
        </View>
      )}
      {isHandleVerifyCode && (
        <View>
          <TextInput
            secureTextEntry={true}
            keyboardType={'number-pad'}
            placeholder="Password"
            onChangeText={(text) => setUser({...user, password: text})}
          />
          <TextInput
            secureTextEntry={true}
            keyboardType={'number-pad'}
            placeholder="Confirm password"
            onChangeText={(text) => setUser({...user, confirmPassword: text})}
          />
          <TextInput
            placeholder="Display name"
            onChangeText={(text) => setUser({...user, displayName: text})}
          />
          <TouchableOpacity
            onPress={() => {
              if (user.password && user.confirmPassword && user.displayName) {
                user.password === user.confirmPassword
                  ? signUp()
                  : ToastAndroid.showWithGravity(
                      'Confirm password not match',
                      ToastAndroid.SHORT,
                      ToastAndroid.CENTER,
                    );
              } else
                ToastAndroid.showWithGravity(
                  'Please fill in all information',
                  ToastAndroid.SHORT,
                  ToastAndroid.CENTER,
                );
              // signUp();
            }}>
            <Text>Sign Up</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
