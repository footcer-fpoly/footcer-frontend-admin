import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Header from '../components/HeaderBack';
import Colors from '../theme/Colors';
import HeadAvatar from '../components/ProfileDetailScreenComponents/HeadAvatar';
import Profile from '../components/ProfileDetailScreenComponents/Profile';
export default function ProfileDetailScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header titleHeader="Chỉnh sửa tài khoản" />
      <HeadAvatar
        nameUser="Dương Hải Đăng"
        urlImgAvatar="https://scontent-xsp1-2.xx.fbcdn.net/v/t1.0-1/p320x320/99138497_2590351154572109_7512864550597689344_o.jpg?_nc_cat=102&_nc_sid=7206a8&_nc_ohc=tXqqt3-GvVMAX-x2QDS&_nc_ht=scontent-xsp1-2.xx&_nc_tp=6&oh=1d7cf4338fce429960a8ba4cf0178587&oe=5F50676C"
      />
      <View style={{height: 10, backgroundColor: colorGrayBackground}} />
      <ScrollView>
        <View style={styles.bodyContainer}>
          <Profile
            phone="0789301100"
            street="113 Công an"
            district="Hình sự"
            province="Sài gòn"
          />
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
  bodyContainer: {
    marginTop: 10,
    backgroundColor: Colors.colorWhite,
    paddingHorizontal: 10,
    marginBottom: -1,
  },
});
