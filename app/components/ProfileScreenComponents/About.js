import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import Colors from '../../theme/Colors';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function Profile() {
  return (
    <View style={styles.profileContainer}>
      <Text style={styles.txtTitle}>THÔNG TIN</Text>
      <TouchableOpacity style={styles.row}>
        <Icon name="info-circle" size={30} color={Colors.colorDarkBlue} />
        <Text style={styles.txt}>Chỉnh sửa tài khoản</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.row}>
        <Icon name="shield-alt" size={30} color={Colors.colorDarkBlue} />
        <Text style={styles.txt}>Chính sách bảo mật</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.row}>
        <Icon name="rocketchat" size={30} color={Colors.colorDarkBlue} />
        <Text style={styles.txt}>Đánh giá ứng dụng</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.row}>
        <Icon name="question-circle" size={30} color={Colors.colorDarkBlue} />
        <Text style={styles.txt}>Hổ trợ & góp ý</Text>
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
    color: Colors.colorOrange,
  },
  txt: {
    fontSize: 16,
    marginLeft: 10,
  },
});
