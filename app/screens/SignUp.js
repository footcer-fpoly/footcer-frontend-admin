import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import API from '../server/api';

export default function SignUp({navigation}) {
  const [verifyCode, setVerifyCode] = useState();
  const [confirmResult, setConfirmResult] = useState();
  const [isHandleSentCode, setIsHandleSentCode] = useState(false);
  const [isHandleVerifyCode, setIsHandleVerifyCode] = useState(false);
  const [userSignUp, setUserSignUp] = useState({
    phone: '0789301100',
    image: 'http://footcer.tk:4000/static/user/avatar.png',
    password: '',
    confirmPassword: '',
    displayName: '',
    role: 1,
  });
  const checkPhone = () => {
    return API.post('/users/valid-phone', {phone: userSignUp.phone})
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
  const handleSendCode = async () => {
    const confirmation = await auth().signInWithPhoneNumber(
      `+84${userSignUp.phone}`,
    );
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
  const signUp = () => {
    return API.post('/users/sign-up-phone', {
      phone: userSignUp.phone,
      password: userSignUp.password,
      avatar: userSignUp.avatar,
      displayName: userSignUp.displayName,
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
          navigation.goBack();
          setIsSignIn(true);
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
  //   useEffect(() => {
  //     setUserSignUp({...userSignUp, phone: phone});
  //   }, [phone]);
  return (
    <SafeAreaView>
      <View>
        <Text> Sign Up </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TextInput
            keyboardType={'phone-pad'}
            placeholder="Number phone"
            maxLength={10}
            onChangeText={(text) => setUserSignUp({...userSignUp, phone: text})}
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
              maxLength={6}
              placeholder="Password"
              onChangeText={(text) =>
                setUserSignUp({...userSignUp, password: text})
              }
            />
            <TextInput
              secureTextEntry={true}
              maxLength={6}
              keyboardType={'number-pad'}
              placeholder="Confirm password"
              onChangeText={(text) =>
                setUserSignUp({...userSignUp, confirmPassword: text})
              }
            />
            <TextInput
              placeholder="Display name"
              onChangeText={(text) =>
                setUserSignUp({...userSignUp, displayName: text})
              }
            />
            <TouchableOpacity
              onPress={() => {
                if (
                  userSignUp.password &&
                  userSignUp.confirmPassword &&
                  userSignUp.displayName
                ) {
                  userSignUp.password === userSignUp.confirmPassword
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
      </View>
    </SafeAreaView>
  );
}
