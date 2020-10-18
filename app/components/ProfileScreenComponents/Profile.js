import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch} from 'react-redux';
import {REDUX} from '../../redux/store/types';
import {colorDarkBlue, colorOrange} from '../../theme/Color';

export default function Profile({navigation}) {
  const dispatch = useDispatch();
  return (
    <View style={styles.profileContainer}>
      <Text style={styles.txtTitle}>TÀI KHOẢN</Text>
      <TouchableOpacity
        style={styles.row}
        onPress={() => {
          navigation.navigate('ProfileDetail');
        }}>
        <Image source={require('../../assets/Icon/edit.png')} />
        <Text style={styles.txt}>Chỉnh sửa tài khoản</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.row}
        onPress={() => {
          dispatch({type: REDUX.CLEAR_USER_DATA});
          navigation.navigate('Login');
        }}>
        <Image source={require('../../assets/Icon/signup.png')} />
        <Text style={styles.txt}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    marginLeft: 15,
    marginTop: 20,
  },
  row: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtTitle: {
    fontSize: 20,
    color: colorOrange,
  },
  txt: {
    fontSize: 16,
    marginLeft: 10,
  },
});
