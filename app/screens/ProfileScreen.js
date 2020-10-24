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
import Colors from '../theme/Colors';
import Head from '../components/ProfileScreenComponents/Head';
import Profile from '../components/ProfileScreenComponents/Profile';
import About from '../components/ProfileScreenComponents/About';
import {useSelector} from 'react-redux';
export default function ProfileScreen({navigation}) {
  const userData = useSelector((state) => state.userReducer.userData);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <HeaderProfile nameStadium="Sân bóng FPoly HCM" />
        <View style={styles.bodyContainer}>
          <Head name={userData.displayName} urlAvatar={userData.avatar} />
          <Profile navigation={navigation} />
          <About />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.colorWhite,
  },
});
