import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import Setting from '../components/PriceScreenComponents/Setting';
import HeaderPrice from '../components/Header';
import Price from '../components/PriceScreenComponents/Price';
import Colors from '../theme/Colors';
import Header from '../components/Header';
import fonts from '../theme/ConfigStyle';
import API from '../server/api';

export default function PriceScreen({ route, navigation }) {
  // useEffect(() => {
  //   API.
  // })
  return (
    <View>
      <Header
        center={
          <Text
            style={{
              fontSize: fonts.font18,
              fontWeight: fonts.bold,
              color: Colors.whiteColor,
            }}>
            Cập nhật thông tin sân
          </Text>
        }
      />
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.colorGrayBackground,
  },
  txtSetting: {
    color: Colors.colorDarkBlue,
    fontSize: 16,
    marginVertical: 10,
    marginLeft: 15,
  },
});
