import React from 'react';
import {StyleSheet, Text, View, SafeAreaView, TextInput} from 'react-native';
import {colorWhite, colorGrayText} from '../theme/Color';
import Header from '../components/HeaderBack';

export default function ChangePasswordScreen(props) {
  return (
    <SafeAreaView style={styles.container}>
      <Header titleHeader="Đổi mật khẩu" />
      <View style={styles.bodyContainer}>
        <Text style={styles.title}>Mật khẩu cũ:</Text>
        <View style={styles.subTitle}>
          <TextInput
            placeholder="Nhập mật khẩu cũ"
            secureTextEntry={true}
            style={styles.txt}>
            {props.phone}
          </TextInput>
        </View>
        <Text style={styles.title}>Mật khẩu mới:</Text>
        <View style={styles.subTitle}>
          <TextInput
            placeholder="Nhập mật khẩu mới"
            secureTextEntry={true}
            style={styles.txt}>
            {props.phone}
          </TextInput>
        </View>
        <Text style={styles.title}>Nhập lại mật khẩu mới:</Text>
        <View style={styles.subTitle}>
          <TextInput
            placeholder="Nhập lại mật khẩu mới"
            secureTextEntry={true}
            style={styles.txt}>
            {props.phone}
          </TextInput>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorWhite,
  },
  bodyContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 16,
    color: colorGrayText,
  },
  subTitle: {
    borderBottomWidth: 0.5,
    borderBottomColor: colorGrayText,
  },
  txt: {
    fontSize: 15,
  },
});
