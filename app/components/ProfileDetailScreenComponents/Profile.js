import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Colors from '../../theme/Colors';
import {useNavigation} from '@react-navigation/native';

export default function Profile(props) {
  const navigation = useNavigation();
  return (
    <View>
      <Text style={styles.title}>Mật khẩu</Text>
      <View style={styles.subTitle}>
        <Text style={{fontSize: 25, paddingVertical: 5}}>● ● ● ● ● ●</Text>
        <TouchableOpacity
          style={styles.btnChangePassword}
          onPress={() => {
            navigation.navigate('ChangePassword');
          }}>
          <Text style={{color: '#fff', fontSize: 14}}>Đổi mật khẩu</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Số điện thoại</Text>
      <View style={styles.subTitle}>
        <Text style={styles.txt}>{props.phone}</Text>
      </View>
      <Text style={styles.title}>Địa chỉ</Text>
      <View style={styles.subTitle}>
        <Text style={styles.txt}>{props.street}</Text>
      </View>
      <Text style={styles.title}>Tỉnh/Thành phố</Text>
      <View style={styles.subTitle}>
        <Text style={styles.txt}>{props.province}</Text>
      </View>
      <Text style={styles.title}>Huyện/Quận</Text>
      <View style={styles.subTitle}>
        <Text style={styles.txt}>{props.district}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    color: Colors.colorGrayText,
  },
  btnChangePassword: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF5E0B',
    marginTop: 5,
    justifyContent: 'center',
    width: 120,
    height: 30,
    borderRadius: 5,
  },
  subTitle: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.colorGrayText,
  },
  txt: {
    paddingVertical: 10,
    fontSize: 15,
  },
});
