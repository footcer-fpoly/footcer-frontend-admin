import React, {useEffect, useState} from 'react';
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
import {useDispatch, useSelector} from 'react-redux';
import {SignIn} from '../redux/actions/userAction';
import {persistStore} from 'redux-persist';
import {store} from '../redux/store';

export default function LoginScreen({navigation}) {
  const [phone, setPhone] = useState();
  const [verifyCode, setVerifyCode] = useState();
  const [confirmResult, setConfirmResult] = useState();
  const [isHandleSentCode, setIsHandleSentCode] = useState(false);
  const [isHandleVerifyCode, setIsHandleVerifyCode] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);
  const dispatch = useDispatch();
  const token = useSelector((state) => state?.userReducer);
  console.log('LoginScreen', token);
  useEffect(() => {
    persistStore(store, null, () => {
      const token = store.getState().userReducer.token;
      console.log('LoginScreen -> token', token);
    });
  }, []);
  const [userSignUp, setUserSignUp] = useState({
    phone: '',
    image: 'http://footcer.tk:4000/static/user/avatar.png',
    password: '',
    confirmPassword: '',
    displayName: '',
    role: 1,
  });
  const [userSignIn, setUserSignIn] = useState({
    phone: '',
    password: '',
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
    return API.post('/users/sign-up-phone', {
      phone: userSignUp.phone,
      password: userSignUp.password,
      avatar: userSignUp.avatar,
      displayName: userSignUp.displayName,
      role: 1,
    })
      .then(({data}) => {
        console.log('signUp -> data', data);
        if (data.code === 200) {
          setIsHandleSentCode(true);
          ToastAndroid.showWithGravity(
            'Sign up successfully',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
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
  useEffect(() => {
    setUserSignUp({...userSignUp, phone: phone});
  }, [phone]);
  return (
    <SafeAreaView>
      {!isSignIn ? (
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
      ) : (
        <View>
          <Text>Sign In</Text>
          <TextInput
            keyboardType={'phone-pad'}
            maxLength={10}
            placeholder="Number phone"
            onChangeText={(text) => setUserSignIn({...userSignIn, phone: text})}
          />
          <TextInput
            secureTextEntry={true}
            maxLength={6}
            keyboardType={'number-pad'}
            placeholder="Password"
            onChangeText={(text) =>
              setUserSignIn({...userSignIn, password: text})
            }
          />
          <TouchableOpacity
            onPress={() => {
              dispatch(SignIn(userSignIn.phone, userSignIn.password));
            }}>
            <Text>Login</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
