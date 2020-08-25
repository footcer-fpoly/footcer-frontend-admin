import React from 'react';
import {StyleSheet, Text, View, SafeAreaView, ScrollView} from 'react-native';
import Setting from '../components/PriceScreenComponents/Setting';
import HeaderPrice from '../components/Header';
import Price from '../components/PriceScreenComponents/Price';
import {colorGrayBackground, colorDarkBlue} from '../theme/Color';

export default function PriceScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderPrice nameStadium="Sân bóng FPoly HCM" />
      <ScrollView>
        <View style={styles.bodyContainer}>
          <Setting
            timeSlot="Sân bóng FPoly"
            date="26-9-2020"
            typeStadium="Sân cỏ nhân tạo"
            price="150000"
          />
          <Text style={styles.txtSetting}>Thiết lập của bạn</Text>
          <Price />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorGrayBackground,
  },
  txtSetting: {
    color: colorDarkBlue,
    fontSize: 16,
    marginVertical: 10,
    marginLeft: 15,
  },
});
