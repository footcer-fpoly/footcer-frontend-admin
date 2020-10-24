import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {SignIn} from '../redux/actions/userAction';

export default function LoginScreen({navigation}) {
  const [phone, setPhone] = useState();
  const dispatch = useDispatch();
  const [userSignIn, setUserSignIn] = useState({
    phone: '',
    password: '',
  });
  return (
    <SafeAreaView>
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
            dispatch(
              SignIn(userSignIn.phone, userSignIn.password, () => {
                navigation.replace('Dashboard');
              }),
            );
          }}>
          <Text>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SignUp');
          }}>
          <Text>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
          <Text>HomeScreen</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
