import React, {Component} from 'react';
import {
  Text,
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import HeaderProfile from '../components/Header';
import {colorGrayBackground, colorWhite} from '../theme/Color';
import Head from '../components/ProfileScreenComponents/Head';
import Profile from '../components/ProfileScreenComponents/Profile';
import About from '../components/ProfileScreenComponents/About';
export default function ProfileScreen(props) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <HeaderProfile nameStadium="Sân bóng FPoly HCM" />
        <View style={styles.bodyContainer}>
          <Head
            name="Trần Phương Ly"
            urlAvatar="https://img.namvietmedia.vn/voh/thumbnail/2018/12/20/VOHPhuongLy1_20181220165049.jpg"
          />
          <Profile />
          <About />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorWhite,
  },
});
